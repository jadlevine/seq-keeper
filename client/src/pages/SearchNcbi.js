import { useState, useEffect } from 'react'
import { ESearch } from '../services/Entrez'
import GeneSearchBar from '../components/GeneSearchBar'
import GeneListItem from '../components/GeneListItem'

const SearchNCBI = ({ setCurrentGeneSumm, setNeedGeneSumm }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const getSearchResults = async () => {
    let db = 'Gene'
    let searchResponse = await ESearch(db, searchQuery)

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
    setNeedGeneSumm(true)
  }, [])

  return (
    <div>
      <h1>NCBI Search</h1>
      <GeneSearchBar
        handleChange={handleChange}
        onSubmit={onSubmit}
        searchQuery={searchQuery}
      />
      {searched ? (
        <div className="search-results">
          <h2>Search Results ({searchResults.length})</h2>
          {/* <div className="search-table-header-row">
            <div className="table-header">Gene Name</div>
            <div className="table-header">Description</div>
            <div className="table-header">Organism</div>
            <div className="table-header">Chromosome</div>
            <div className="table-header">Map Location</div>
          </div> */}
          <div className="search-results-list">
            {searchResults.map((geneSumm) => (
              <GeneListItem
                key={geneSumm.uid}
                geneSumm={geneSumm}
                setCurrentGeneSumm={setCurrentGeneSumm}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="red">
            Instructions for using the search (if it gets more complicated
            (search nts, genes, etc...) could go here?
          </h2>
        </div>
      )}
    </div>
  )
}

export default SearchNCBI
