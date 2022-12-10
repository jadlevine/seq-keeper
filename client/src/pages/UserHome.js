import { useState, useEffect } from 'react'
import axios from 'axios'
import { ESearch } from '../services/Entrez'
import GeneSearch from '../components/GeneSearch'
import GeneListItem from '../components/GeneListItem'

/** notes
 *
 * db lists: https://www.ncbi.nlm.nih.gov/guide/all/
 *
 * */

const UserHome = () => {
  const [genes, setGenes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const getSearchResults = async () => {
    let db = 'Gene'
    let formattedQuery = searchQuery.replace(' ', '+')
    let searchResponse = await ESearch(db, formattedQuery)

    console.log(searchResponse)
    // might make sense just to filter out the last result and set the entire DocSum object (convert to array?) to searchResults... then parse out the details later?
    // let parsedResultsArr = []
    // for (const key in searchResponse) {
    //   // if (Object.hasOwnProperty.call(object, key)) {
    //   //   const element = object[key];
    //   // }
    //   if (key !== 'uids') {
    //     const resultObj = {
    //       uid: searchResponse[key].uid,
    //       name: searchResponse[key].name,
    //       description: searchResponse[key].description,
    //       chromosome: searchResponse[key].chromosome,
    //       maplocation: searchResponse[key].maplocation,
    //       organism: {
    //         scientificname: searchResponse[key].organism.scientificname,
    //         commonname: searchResponse[key].organism.commonname,
    //         taxid: searchResponse[key].organism.taxid
    //       },
    //       summary: searchResponse[key].summary
    //     }
    //     parsedResultsArr.push(resultObj)
    //   }
    // }
    // console.log(parsedResultsArr)
    // console.log(searchResponse)

    // then set search results to parsed results
    setSearchResults(searchResponse)
    // and update state
    setSearched(true)
    setSearchQuery('')
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    getSearchResults()
  }

  useEffect(() => {
    // on page load?
    // getGenes()
    // getGeneCollections()
    // set state for those things
  }, [])

  // NEXT STEPS
  // // render the data from docsums above, each with button to go to gene details page
  // // gene details page will make api call to get gene details
  // // user will have option to save gene to seq-keeper db

  return (
    <div>
      <h1>User Home Page</h1>
      <GeneSearch
        handleChange={handleChange}
        onSubmit={onSubmit}
        searchQuery={searchQuery}
      />
      {searched ? (
        <div className="search-results">
          <h2>Search Results ({searchResults.length})</h2>
          <div className="search-table-header-row">
            <div className="table-header">Gene Name</div>
            <div className="table-header">Description</div>
            <div className="table-header">Species</div>
            <div className="table-header">Chromosome</div>
            <div className="table-header">Map Location</div>
          </div>
          <div className="search-results-list">
            {searchResults.map((geneSumm) => (
              <GeneListItem key={geneSumm.uid} geneSumm={geneSumm} />
            ))}
          </div>
        </div>
      ) : (
        <div className="genelist">
          <h2>Gene List</h2>
          {/* map gene list here */}
        </div>
      )}
    </div>
  )
}

export default UserHome
