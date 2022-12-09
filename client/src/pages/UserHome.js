import { useState, useEffect } from 'react'
import axios from 'axios'
import { ESearch } from '../services/Entrez'
import GeneSearch from '../components/GeneSearch'

const UserHome = () => {
  const [genes, setGenes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const getSearchResults = async () => {
    let db = 'Gene'
    // let query = 'brca1'
    let searchResponse = await ESearch(db, searchQuery)
    const keys = Object.keys(searchResponse)
    //filter out the last line (uid)
    keys
    // then map the filtered keys and build the search results array
    // then set search results to
    keys.map((key) => {})
    console.log(typeof searchResponse)
    console.log(searchResponse[207])
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    getSearchResults()
  }

  // db lists: https://www.ncbi.nlm.nih.gov/guide/all/
  // YEEEESSSSSS////
  // docSums.data.result = {key:value,...} where key is uid(plus one key at the end that is uids: [array of uids]), value is object containing summary data, including(amongst others): chromosome, description, maplocation, name, nomenclaturestatus, organism: {scientificname: 'value', commonname: 'value', tacid: 'value'}, summary, uid

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
    </div>
  )
}

export default UserHome
