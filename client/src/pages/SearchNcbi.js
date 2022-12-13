import { useState, useEffect } from 'react'
import { ESearch } from '../services/Entrez'
import GeneSearch from '../components/GeneSearch'
import GeneListItem from '../components/GeneListItem'

const SearchNcbi = () => {
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
    // ??
  }, [])

  return (
    <div>
      <h1>NCBI Search</h1>
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

export default SearchNcbi
