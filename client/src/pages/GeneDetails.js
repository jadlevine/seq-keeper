import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ESearch, EFetch } from '../services/Entrez'

const GeneDetails = () => {
  let { gene_uid } = useParams()

  const [geneDetails, setGeneDetails] = useState(null)

  // this page is tricky because:
  // //it could be accessed from search results (probably not added yet, but could be already?) AND from gene list (already saved)
  // //if already added, data comes from backend
  // // // else - data comes from several places
  //VIP      // docsum - new api call OR, ideally, passed from SearchResults/GeneList item
  //VIP      // sequence - DNA - API call to nucleotide db (using uid?)
  //Low      //          - protein - API calls to protein seq db + maybe structure db?
  //Medium   // Homolog list - API call to homologene

  // useEffect(() => {
  //   EFetch()
  // },[])
  // for now, just gonna put it on a button to control it

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

  const nucleotideSearch = async () => {
    let db = 'nuccore'
    let searchQuery = 'RAD51+human'
    let searchResponse = await ESearch(db, searchQuery)
    // let fetchResponse = await EFetch(db, gene_uid)
    console.log(searchResponse)
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
      <h1>GeneDetails</h1>
      <h3> uid: {gene_uid}</h3>
      <button onClick={getGeneDets}>Get Gene Details</button>
      <button onClick={getGeneSeq}>Get Gene Seq</button>
      <button onClick={nucleotideSearch}>Nucleotide Search</button>
      <button onClick={homologeneSearch}>Search Homologs</button>
      <button onClick={getHomologeneDetails}>getHomologeneDetails</button>
    </div>
  )
}

export default GeneDetails
