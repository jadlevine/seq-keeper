import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { EFetch } from '../services/Entrez'
import { xmlToJson } from '../services/XmlToJson'

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
    let db = 'Gene'
    let fetchResponse = await EFetch(db, gene_uid)
    console.log(fetchResponse)
    // let jsonRes = xmlToJson(fetchResponse)
    // console.log(jsonRes)
    // fetchresponse is xml... convert to json?
  }
  const getGeneSeq = async () => {
    let db = 'nuccore'
    let fetchResponse = await EFetch(db, gene_uid)
    console.log(fetchResponse)
  }

  return (
    <div>
      <h1>GeneDetails</h1>
      <h3> uid: {gene_uid}</h3>
      <button onClick={getGeneDets}>Get Gene Details</button>
      <button onClick={getGeneSeq}>Get Gene Seq</button>
    </div>
  )
}

export default GeneDetails
