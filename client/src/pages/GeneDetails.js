// this page is tricky because:
// //it could be accessed from search results (probably not added yet, but could be already?) AND from gene list (already saved)
// //if already added, data comes from backend
// // // else - data comes from several places
//VIP      // docsum - new api call OR, ideally, passed from SearchResults/GeneList item
//VIP      // sequence - DNA/(RNA?) - API call to nucleotide db (using uid?)
//Low      //          - protein - API calls to protein seq db + maybe structure db?
//Medium   // Homolog list - API call to homologene

/**  Pseudocode (new entry)
 * On page load
 * --> get gene docsum, set state
 * --> render docsum data
 
* --> button to find sequences
 * --> CLICK --> search nuccore by gene name and species (docsums?)
 *           --> set state (seqSearchResults, setSeqSearchResults) = useState(null) render results (some details to help user pick which to investigate)
 *           -->  each result clickable
 *            --> if clicked, fetch fasta
 *            --> set state (currentSeq) render fasta (conditionally, with button to go back to seqResults view
 
 * --> button to find homologs
 * --> CLICK --> search homologene (docsums are fine here, I think)
 *            --> set state (homologs - array of objects?), render results
 *            --> bonus, checkboxes to add to homolog list
 *      KEY POINT HERE --> homologs should be clickable, and send user to a page for that gene.
 *        back buttons will be important to allow user to back track and not loose search results, etc...
 * 
 * AND OF COURSE, we need some CRUD buttons (add this gene/seq/homolog list to seqKeeper)
 *        (update/delete buttons once it is in the database)
 * 
 * **/

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ESearch, ESummary, EFetch } from '../services/Entrez'
import GeneSummary from '../components/GeneSummary'
import NtListItem from '../components/NtListItem'
import HomologFinder from '../components/HomologFinder'
import Species from '../components/Species'

const GeneDetails = () => {
  let { gene_uid } = useParams()

  const [geneSumm, setGeneSumm] = useState(null)
  const [ntSearchResults, setNtSearchResults] = useState(null)

  const inSeqKeeper = false

  const getGeneSumm = async () => {
    const db = 'gene'
    const response = await ESummary(db, gene_uid)
    setGeneSumm(response[0])
  }
  const getNtSearch = async () => {
    const db = 'nuccore'
    let searchQuery = `${geneSumm.name}+${geneSumm.organism.scientificname}`
    let response = await ESearch(db, searchQuery)
    setNtSearchResults(response)
    // delete this when done!
    console.log(response)
  }

  // on page load
  useEffect(() => {
    if (inSeqKeeper) {
      console.log('Gene in Seq Keeper')
    } else {
      // get geneDocSum
      getGeneSumm()
    }
  }, [])

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

  const homologeneSearch = async () => {
    let db = 'homologene'
    let searchQuery = 'RAD51[gene+name]+human[orgn]'
    // tpo[gene name] AND human[orgn]
    let searchResponse = await ESearch(db, searchQuery)
    // let fetchResponse = await EFetch(db, gene_uid)
    console.log(searchResponse)
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
            <Species geneSumm={geneSumm} />
          </div>
          <div className="gene-page-body">
            <GeneSummary geneSumm={geneSumm} />
            <div className="gene-data-finder-container container">
              <div className="seq-find container">
                <button onClick={getNtSearch}>Search for Nucleotides</button>
                {ntSearchResults ? (
                  <div className="search-results">
                    <h2>Search Results ({ntSearchResults.length})</h2>
                    <div className="nt-search-table-header-row">
                      <div className="table-header">uid</div>
                      <div className="table-header">caption</div>
                      <div className="table-header">moltype</div>
                      <div className="table-header">slen</div>
                      <div className="table-header">organism</div>
                      <div className="table-header">updatedate</div>
                      <div className="table-header">title</div>
                    </div>
                    <div className="search-results-list">
                      {ntSearchResults.map((ntSumm) => (
                        <NtListItem key={ntSumm.uid} ntSumm={ntSumm} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    click above to search for nucleotide sequences for this gene
                  </div>
                )}
              </div>
              <HomologFinder />
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
