import React from 'react'
import axios from 'axios'
import { ESearch } from '../services/Entrez'

const UserHome = () => {
  // db lists: https://www.ncbi.nlm.nih.gov/guide/all/
  let db = 'Gene'
  let query = 'brca1'
  let searchResponse = ESearch(db, query)
  console.log(searchResponse)
  // YEEEESSSSSS////
  // docSums.data.result = {key:value,...} where key is uid(plus one key at the end that is uids: [array of uids]), value is object containing summary data, including(amongst others): chromosome, description, maplocation, name, nomenclaturestatus, organism: {scientificname: 'value', commonname: 'value', tacid: 'value'}, summary, uid

  // NEXT STEPS
  // // render the data from docsums above, each with button to go to gene details page
  // // gene details page will make api call to get gene details
  // // user will have option to save gene to seq-keeper db

  return (
    <div>
      <h1>User Home Page</h1>
    </div>
  )
}

export default UserHome
