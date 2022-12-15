import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ESearch, ESummary, EFetch } from '../services/Entrez'
import {
  AddGeneToUser,
  DeleteGene,
  GetAllGenesByUser,
  GetGeneById,
  CheckSKGeneStatus
} from '../services/GeneServices'
import { GetSeqsByGene } from '../services/SequenceServices'

import GeneSummary from '../components/GeneSummary'
import SequenceListItem from '../components/SequenceListItem'
import HomologFinder from '../components/HomologSearch.jsx'
import OrganismSummary from '../components/OrganismSummary'
import GeneListItem from '../components/GeneListItem'
import HomologListItem from '../components/HomologListItem'

const GeneDetails = (props) => {
  let {
    user,
    currentGeneSumm,
    setCurrentGeneSumm,
    setNeedGeneSumm,
    needGeneSumm,
    setCurrentSeqSumm,
    setNeedSeqSumm
  } = props
  let { gene_uid } = useParams()
  let navigate = useNavigate()

  // //

  // const [geneSumm, setGeneSumm] = useState(null)
  const [seqSearchResults, setSeqSearchResults] = useState(null)
  const [homologSearchResults, setHomologSearchResults] = useState(null)
  const [skGeneId, setSKGeneId] = useState(false) // need this b/c geneSumm could have just been created from NCBI data!!

  // const inSeqKeeper = false

  const getGeneFromNCBI = async () => {
    const db = 'gene'
    const response = await ESummary(db, gene_uid)
    let skGeneSumm = {
      ...response[0],
      ncbiLink: `https://www.ncbi.nlm.nih.gov/gene/${response[0].uid}`,
      homologList: [],
      organismscientificname: response[0].organism.scientificname,
      organismcommonname: response[0].organism.commonname,
      organismtaxid: response[0].organism.taxid
    }
    console.log('fetching and converting to SK format')
    setCurrentGeneSumm(skGeneSumm)
  }

  const getSKGeneSumm = async () => {
    let skGeneSumm = null
    // console.log(`user.id: ${user.id}. Type: ${typeof user.id}`)
    // console.log(`gene_uid: ${gene_uid}. Type: ${typeof gene_uid}`)
    skGeneSumm = await CheckSKGeneStatus(user.id, gene_uid)
    // console.log(`GENE: skGeneSumm response from backend: ${skGeneSumm}`)
    console.log(skGeneSumm)
    if (skGeneSumm) {
      setCurrentGeneSumm(skGeneSumm)
      setSKGeneId(skGeneSumm.id)
      return
    }
    getGeneFromNCBI()
  }

  // useful?
  const getGeneFromSK = async (geneId) => {
    const gene = await GetGeneById(geneId)
    setCurrentGeneSumm(gene)
  }

  const tagSKSeqs = async (res) => {
    const seqsByGene = await GetSeqsByGene(skGeneId)

    for (const key in res) {
      for (const sk in seqsByGene) {
        if (res[key].uid == seqsByGene[sk].uid) {
          res[key]['id'] = seqsByGene[sk].id
          // break
        }
      }
    }
    return res
  }

  const NCBISequenceSearch = async () => {
    const db = 'nuccore'
    let organism = currentGeneSumm.organismscientificname
    let organismFormatted = organism.replaceAll(' ', '%20')
    let gene = currentGeneSumm.name
    let geneFormatted = gene.replaceAll(' ', '%20')
    let searchQuery = `(${organismFormatted}%5BOrganism%5D)%20AND%20${geneFormatted}%5BGene%20Name%5D`
    let response = await ESearch(db, searchQuery)

    let taggedSeqResults = await tagSKSeqs(response)
    setSeqSearchResults(taggedSeqResults)
    // then update relevant state?
  }

  const getHomologSearch = async () => {
    let db = 'homologene'
    let geneName = currentGeneSumm.name
    let sciNameArr = currentGeneSumm.organismscientificname.split(' ')
    let organism = `${sciNameArr[0]}+${sciNameArr[1]}`
    let searchQuery = `${geneName}[gene+name]+${organism}[orgn]`

    /**
     * PROB need to strip numbers off end (strain id?)...
     * Pyricularia oryzae 70-15
     * BREAKS this function
     * */

    // let searchQuery = `${geneSumm.name}[gene+name]+${geneSumm.organism.taxid}[txid]`
    console.log(searchQuery)
    // tpo[gene name] AND human[orgn]
    let response = await ESearch(db, searchQuery)
    if (response[0]) {
      setHomologSearchResults(response[0].homologenedatalist)
    } else {
      setHomologSearchResults('nonefound')
    }
    // delete this when done!
    // console.log(response)
    // console.log(response[0].homologenedatalist)
  }

  const addThisGene = async (e) => {
    e.preventDefault()
    const added = await AddGeneToUser(user.id, currentGeneSumm)
    setCurrentGeneSumm(added)
    setSKGeneId(added.id) // check this line
    // setUserHasGene(true)
    // console.log(added)
  }

  const deleteThisGene = async (e) => {
    e.preventDefault()
    const deleted = await DeleteGene(currentGeneSumm.id)
    setCurrentGeneSumm(null)
    setNeedGeneSumm(true)
    // setSKGeneId(false)
    // navigate(`/userhome`)
  }

  // on page load
  useEffect(() => {
    // useEffect here to check if user has gene, and then get geneSumm from proper location (SK or NCBI)... set skGeneId to id/null, which will trigger conditional rendering of all sorts of stuff (add or delete this gene button, etc...)
    if (needGeneSumm) {
      setSKGeneId(false)
      getSKGeneSumm()
      setNeedGeneSumm(false)
      setSeqSearchResults(null)
      setHomologSearchResults(null)
    }
    // if gene is in seq keeper, get associated sequences

    // getGeneData()
    // }, [])
  }, [currentGeneSumm])

  // might not use these functions
  const getGeneDets = async () => {
    let db = 'gene'
    let fetchResponse = await EFetch(db, gene_uid)
    console.log(fetchResponse)
    // let jsonRes = xmlToJson(fetchResponse)
    // console.log(jsonRes)
    // fetchresponse is xml... convert to json?
  }
  const getGeneSeq = async () => {
    let db = 'nuccore'
    let nucUid = 1676319757
    let fetchResponse = await EFetch(db, nucUid)
    // let fetchResponse = await EFetch(db, gene_uid)
    console.log(fetchResponse)
  }
  const getHomologeneDetails = async () => {
    let db = 'homologene'
    let fetchResponse = await EFetch(db, gene_uid)
    console.log(fetchResponse)
  }

  return (
    <div>
      {currentGeneSumm ? (
        <div>
          <div className="gene-page-header">
            <div className="text-block gene-header-data">
              <h1>{currentGeneSumm.name}</h1>
              <div className="geneSKStatus">
                {skGeneId ? (
                  <div>
                    <h4>SK - geneId: {skGeneId}</h4>
                    <button onClick={deleteThisGene}>
                      Delete from account
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4>This gene is not associated with your account</h4>
                    <button onClick={addThisGene}>Add this Gene</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="gene-page-body">
            <div>
              <OrganismSummary currentGeneSumm={currentGeneSumm} />
              <GeneSummary currentGeneSumm={currentGeneSumm} />
            </div>
            <div className="gene-data-finder-container container">
              {skGeneId ? (
                <div>
                  <div className="seq-finder">
                    {seqSearchResults ? (
                      <div className="search-results">
                        <button onClick={() => setSeqSearchResults(null)}>
                          Hide Sequence Search Results
                        </button>
                        <h2>Search Results ({seqSearchResults.length})</h2>
                        <div className="search-results-list">
                          {seqSearchResults.map((seqSumm) => (
                            <SequenceListItem
                              key={seqSumm.uid}
                              seqSumm={seqSumm}
                              userId={user.id}
                              geneId={skGeneId}
                              setNeedSeqSumm={setNeedSeqSumm}
                              setCurrentSeqSumm={setCurrentSeqSumm}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        className="larger-text"
                        onClick={NCBISequenceSearch}
                      >
                        Find {currentGeneSumm.name} Sequences
                      </button>
                    )}
                  </div>
                  <div className="homolog-finder">
                    {homologSearchResults ? (
                      homologSearchResults === 'nonefound' ? (
                        <div>No Homologs Found</div>
                      ) : (
                        <div className="search-results">
                          <button onClick={() => setHomologSearchResults(null)}>
                            Hide Homolog Search Results
                          </button>
                          <h2>Homologs of {currentGeneSumm.name}</h2>
                          <div className="search-results-list">
                            {homologSearchResults.map((homologSumm) => (
                              <HomologListItem
                                key={homologSumm.geneid}
                                currentGeneSummUid={currentGeneSumm.uid}
                                homologSumm={homologSumm}
                                setCurrentGeneSumm={setCurrentGeneSumm}
                                setNeedGeneSumm={setNeedGeneSumm}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    ) : (
                      <button
                        onClick={getHomologSearch}
                        className="larger-text"
                      >
                        Find Homologous genes
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h3>
                    Add this gene to your SK account to search for sequences and
                    homologs
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Getting Gene Summary</h1>
        </div>
      )}
    </div>
  )
}

export default GeneDetails
