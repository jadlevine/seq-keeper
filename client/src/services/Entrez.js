import axios from 'axios'

var XMLParser = require('react-xml-parser')

// ESearch - Provides a list of UIDs matching a text query
// ESummary - Returns document summaries (DocSums) for a list of input UIDs
// EFetch - Returns formatted data records for a list of input UIDs

const entrezBaseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'

export const ESearch = async (db, query) => {
  try {
    // queries - special characters must be url-encoded  Spaces may be replaced by '+' signs.
    let formattedQuery = query.replaceAll(' ', '+')
    const eSearchUrl = `${entrezBaseUrl}esearch.fcgi?db=${db}&term=${formattedQuery}&retmode=json`
    const response = await axios.get(eSearchUrl)
    const idList = response.data.esearchresult.idlist

    //convert idList to str
    let uidStr = ''
    idList.map((uid, index) => {
      if (index !== 0) {
        uidStr += `,${uid}`
      } else {
        uidStr += uid
      }
    })

    // make esummary request
    const eSumms = ESummary(db, uidStr)
    return eSumms
  } catch (error) {
    console.log(`error ${error}`)
  }
}

export const ESummary = async (db, uid) => {
  try {
    // make esummary request
    const eSummUrl = `${entrezBaseUrl}esummary.fcgi?db=${db}&id=${uid}&retmode=json`
    const res = await axios.get(eSummUrl)
    // clean up response to be an array of docSum objects
    let docSumsArr = []
    for (const key in res.data.result) {
      if (key !== 'uids') {
        docSumsArr.push(res.data.result[key])
      }
    }
    // return DocSumsArr
    return docSumsArr
  } catch (error) {
    throw error
  }
}

export const EFetch = async (db, uid) => {
  try {
    let eFetchUrl = ''
    if (db === 'nuccore') {
      eFetchUrl = `${entrezBaseUrl}efetch.fcgi?db=${db}&id=${uid}&rettype=fasta`
      const fasta = await axios.get(eFetchUrl)
      return fasta.data
    } else if (db === 'gene') {
      eFetchUrl = `${entrezBaseUrl}efetch.fcgi?db=${db}&id=${uid}&retmode=xml`
      const response = await axios.get(eFetchUrl) // => returns xml

      // this line takes a while with big XML files... try to get back smaller XML
      let jsonRes = new XMLParser().parseFromString(response.data) // response.data MUST be XML

      return jsonRes
    } else if (db === 'homologene') {
      console.log(`db: ${db}`)
      eFetchUrl = `${entrezBaseUrl}efetch.fcgi?db=${db}&id=${uid}&retmode=xml` // => returns xml
      const response = await axios.get(eFetchUrl)
      // this line takes a while with big XML files... try to get back smaller XML
      let jsonRes = new XMLParser().parseFromString(response.data)
      return jsonRes
    }

    // return response
  } catch (error) {
    throw error
  }
}
