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
    // console.log('fetching and converting to SK format')
    setCurrentGeneSumm(skGeneSumm)
  }

  const getSKGeneSumm = async () => {
    let skGeneSumm = null
    skGeneSumm = await CheckSKGeneStatus(user.id, gene_uid)
    if (skGeneSumm) {
      setCurrentGeneSumm(skGeneSumm)
      setSKGeneId(skGeneSumm.id)
      return
    }
    getGeneFromNCBI()
  }

  const tagSKSeqs = async (res) => {
    const seqsByGene = await GetSeqsByGene(skGeneId)
    for (const key in res) {
      for (const sk in seqsByGene) {
        if (res[key].uid == seqsByGene[sk].uid) {
          res[key]['id'] = seqsByGene[sk].id
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
  }

  const getHomologSearch = async () => {
    let db = 'homologene'
    let geneName = currentGeneSumm.name
    let sciNameArr = currentGeneSumm.organismscientificname.split(' ')
    let organism = `${sciNameArr[0]}+${sciNameArr[1]}`
    let searchQuery = `${geneName}[gene+name]+${organism}[orgn]`
    let response = await ESearch(db, searchQuery)
    if (response[0]) {
      setHomologSearchResults(response[0].homologenedatalist)
    } else {
      setHomologSearchResults('nonefound')
    }
  }

  const addThisGene = async (e) => {
    e.preventDefault()
    const added = await AddGeneToUser(user.id, currentGeneSumm)
    setCurrentGeneSumm(added)
    setSKGeneId(added.id)
  }

  const deleteThisGene = async (e) => {
    e.preventDefault()
    const deleted = await DeleteGene(currentGeneSumm.id)
    setCurrentGeneSumm(null)
    setNeedGeneSumm(true)
  }

  useEffect(() => {
    if (needGeneSumm) {
      setSKGeneId(false)
      getSKGeneSumm()
      setNeedGeneSumm(false)
      setSeqSearchResults(null)
      setHomologSearchResults(null)
    }
  }, [currentGeneSumm])

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
            <div className="sequence-list homolog-list container">
              {skGeneId ? (
                <div>
                  <div>
                    {seqSearchResults ? (
                      <div className="search-results">
                        <button onClick={() => setSeqSearchResults(null)}>
                          Hide Sequence Search Results
                        </button>
                        <h2>Search Results ({seqSearchResults.length})</h2>
                        <div className="sequence-list">
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
                        Find Homologous Genes
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
