import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ESearch, ESummary, EFetch } from '../services/Entrez'
import { AddGeneToUser } from '../services/GeneServices'

import GeneSummary from '../components/GeneSummary'
import NtListItem from '../components/NtListItem'
import HomologFinder from '../components/HomologFinder'
import Species from '../components/Species'
import GeneListItem from '../components/GeneListItem'
import HomologListItem from '../components/HomologListItem'
import e from 'cors'

const GeneDetails = ({ user }) => {
  let { gene_uid } = useParams()

  const [geneSumm, setGeneSumm] = useState(null)
  const [ntSearchResults, setNtSearchResults] = useState(null)
  const [homologSearchResults, setHomologSearchResults] = useState(null)
  const [userHasGene, setUserHasGene] = useState(false)

  const inSeqKeeper = false

  const getGeneSumm = async () => {
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
  const getNtSearch = async () => {
    const db = 'nuccore'
    let searchQuery = `${geneSumm.name}+${geneSumm.organism.scientificname}`
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
    setUserHasGene(true)
    console.log(added)
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
            <button onClick={addThisGene}>Add this Gene</button>
            <Species geneSumm={geneSumm} />
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
                  <button onClick={getNtSearch}>
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
                  <button onClick={getHomologSearch}>
                    Search for Homologs of {geneSumm.organism.commonname}{' '}
                    {geneSumm.name}
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
