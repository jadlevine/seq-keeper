import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ESearch, ESummary, EFetch } from '../services/Entrez'
import {
  AddGeneToUser,
  DeleteGene,
  GetAllGenesByUser,
  GetGeneById
} from '../services/GeneServices'

import GeneSummary from '../components/GeneSummary'
import SequenceListItem from '../components/SequenceListItem'
import HomologFinder from '../components/HomologSearch.jsx'
import OrganismSummary from '../components/OrganismSummary'
import GeneListItem from '../components/GeneListItem'
import HomologListItem from '../components/HomologListItem'

const GeneDetails = ({ user }) => {
  let { gene_uid } = useParams()
  let navigate = useNavigate()

  const [geneSumm, setGeneSumm] = useState(null)
  const [ntSearchResults, setNtSearchResults] = useState(null)
  const [homologSearchResults, setHomologSearchResults] = useState(null)
  const [skGeneId, setSKGeneId] = useState(false)

  const inSeqKeeper = false

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
    setGeneSumm(skGeneSumm)
  }

  ////////////////////////////
  ////   YOU ARE HERE ////////
  ////////////////////////////
  // THIS IS UNNECESSARY ... just setGeneSumm from getGeneData IF a match is found!!!
  // still, this function will probably be userful elsewhere!!
  const getGeneFromSK = async (geneId) => {
    const gene = await GetGeneById(geneId)
    setGeneSumm(gene)
  }

  const getGeneData = async () => {
    let userSKGenes = await GetAllGenesByUser(user.id)
    for (const gene in userSKGenes) {
      if (userSKGenes[gene].uid === parseInt(gene_uid)) {
        setSKGeneId(userSKGenes[gene].id)
        getGeneFromSK(userSKGenes[gene].id)
        return
      }
    }
    getGeneFromNCBI()
  }

  const nucleotideSearch = async () => {
    const db = 'nuccore'
    let organism
    if (skGeneId) {
      organism = geneSumm.organismscientificname
    } else {
      organism = geneSumm.organism.scientificname
    }
    let searchQuery = `${geneSumm.name}+${organism}`
    console.log(searchQuery)
    let response = await ESearch(db, searchQuery)
    setNtSearchResults(response)
    // delete this when done!
    console.log(response)
  }

  const getHomologSearch = async () => {
    let db = 'homologene'
    let searchQuery = `${
      geneSumm.name
    }[gene+name]+${geneSumm.organism.scientificname.replaceAll(' ', '+')}[orgn]`

    /**
     * PROB need to strip numbers off end (strain id?)...
     * Pyricularia oryzae 70-15
     * BREAKS this function
     * */

    // let searchQuery = `${geneSumm.name}[gene+name]+${geneSumm.organism.taxid}[txid]`
    console.log(searchQuery)
    // tpo[gene name] AND human[orgn]
    let response = await ESearch(db, searchQuery)

    setHomologSearchResults(response[0].homologenedatalist)
    // delete this when done!
    console.log(response)
    console.log(response[0].homologenedatalist)
  }

  const addThisGene = async (e) => {
    e.preventDefault()
    const added = await AddGeneToUser(user.id, geneSumm)
    setSKGeneId(added.id) // check this line
    // setUserHasGene(true)
    // console.log(added)
  }

  const deleteThisGene = async (e) => {
    e.preventDefault()
    console.log(geneSumm.id)
    // const deleted = await DeleteGene(geneSumm.id)
    // setSKGeneId(false)
    // navigate(`/userhome`)
  }

  // on page load
  useEffect(() => {
    // useEffect here to check if user has gene, and then get geneSumm from proper location (SK or NCBI)... set skGeneId to id/null, which will trigger conditional rendering of all sorts of stuff (add or delete this gene button, etc...)
    getGeneData()
  }, [])

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
      {geneSumm ? (
        <div>
          <div className="gene-page-header">
            <h1>{geneSumm.name}</h1>
            <div className="geneSKStatus container">
              {skGeneId ? (
                <div>
                  <h4>Seq Keeper Gene ID: {skGeneId}</h4>
                  <button onClick={deleteThisGene}>Delete</button>
                </div>
              ) : (
                <div>
                  <h4>This gene is not yet associated with your account</h4>
                  <button onClick={addThisGene}>Add this Gene</button>
                </div>
              )}
            </div>
            <OrganismSummary geneSumm={geneSumm} />
          </div>
          <div className="gene-page-body">
            <GeneSummary geneSumm={geneSumm} />
            <div className="gene-data-finder-container container">
              <div className="seq-find container">
                {ntSearchResults ? (
                  <div className="search-results">
                    <button onClick={() => setNtSearchResults(null)}>
                      Hide Nucleotide Search Results
                    </button>
                    <h2>Search Results ({ntSearchResults.length})</h2>
                    {/* <div className="seq-table-header-row">
                      <div className="table-header">Accession</div>
                      <div className="table-header">Molecule</div>
                      <div className="table-header">Sequence Length</div>
                      <div className="table-header">Organism</div>
                      <div className="table-header">Update Date</div>
                    </div> */}
                    <div className="search-results-list">
                      {ntSearchResults.map((ntSumm) => (
                        <SequenceListItem key={ntSumm.uid} ntSumm={ntSumm} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <button onClick={nucleotideSearch}>
                    Search for {geneSumm.name} Nucleotide sequences
                  </button>
                )}
              </div>
              {/* <HomologFinder /> */}
              <div className="homolog-find container">
                {homologSearchResults ? (
                  <div className="search-results">
                    <button onClick={() => setHomologSearchResults(null)}>
                      Hide Homolog Search Results
                    </button>
                    <h2>Search Results ({homologSearchResults.length})</h2>
                    <div className="homolog-search-table-header-row">
                      <div className="table-header">uid</div>
                      <div className="table-header">caption</div>
                      <div className="table-header">moltype</div>
                      <div className="table-header">slen</div>
                      <div className="table-header">organism</div>
                      <div className="table-header">updatedate</div>
                      <div className="table-header">title</div>
                    </div>
                    <div className="search-results-list">
                      {homologSearchResults.map((homologSumm) => (
                        <HomologListItem
                          key={homologSumm.geneid}
                          homologSumm={homologSumm}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <button className="red" onClick={getHomologSearch}>
                    this homolog button is broken right now
                    {/* Search for Homologs of {geneSumm.organism.commonname}{' '}
                    {geneSumm.name} */}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Getting Gene Summary</h1>
        </div>
      )}

      {/* <button onClick={getGeneDets}>Get Gene Details</button>
      <button onClick={getGeneSeq}>Get Gene Seq</button>
      <button onClick={homologeneSearch}>Search Homologs</button>
      <button onClick={getHomologeneDetails}>getHomologeneDetails</button> */}
    </div>
  )
}

export default GeneDetails
