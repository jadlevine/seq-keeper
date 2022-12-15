import { useState, useEffect } from 'react'
import { ESearch } from '../services/Entrez'
import { GetAllGenesByUser } from '../services/GeneServices'
import GeneSearchBar from '../components/GeneSearchBar'
import GeneListItem from '../components/GeneListItem'

const SearchNCBI = ({ setCurrentGeneSumm, setNeedGeneSumm, user }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const tagSKGenes = async (searchRes) => {
    const userGenes = await GetAllGenesByUser(user.id)
    for (const key in searchRes) {
      for (const sk in userGenes) {
        if (searchRes[key].uid == userGenes[sk].uid) {
          searchRes[key]['id'] = userGenes[sk].id
        }
      }
    }
    return searchRes
  }

  const getSearchResults = async () => {
    let db = 'Gene'
    let searchResults = await ESearch(db, searchQuery)

    // then set search results to parsed results
    let taggedGeneResults = await tagSKGenes(searchResults)

    setSearchResults(taggedGeneResults)

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
        <div></div>
      )}
    </div>
  )
}

export default SearchNCBI
