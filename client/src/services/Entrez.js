import axios from 'axios'

var XMLParser = require('react-xml-parser')
// Entrez Utilities
// https://www.ncbi.nlm.nih.gov/books/NBK25499/#_chapter4
// ESearch - Provides a list of UIDs matching a text query
// ESummary - Returns document summaries (DocSums) for a list of input UIDs
// EFetch - Returns formatted data records for a list of input UIDs

// EInfo - Provides a list of the names of all valid Entrez databases
// EPost - deals with Entrez History server and Web environment
// ELink - Lots of link options for UID(s)
// EGQuery - Provides the number of records retrieved in all Entrez databases by a single text query.
// ESpell - Provides spelling suggestions for terms within a single text query in a given database.
// ECitMatch - Retrieves PubMed IDs (PMIDs) that correspond to a set of input citation strings.
// others have to do with using Entrez History Server (which I think can be used as a storage for search stuff... essentially, what I'm trying to do)

/**
 * wait, why? Maybe ok for now, since we're only using gene db
 * Special note for sequence databases.
 * NCBI is no longer assigning GI numbers to a growing number of new sequence records. As such, these records are not indexed in Entrez, and so cannot be retrieved using ESearch or ESummary, and have no Entrez links accessible by ELink. EFetch can retrieve these records by including their accession.version identifier in the id parameter.
 */

const entrezBaseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'

export const ESearch = async (db, query) => {
  try {
    // queries - special characters must be url-encoded  Spaces may be replaced by '+' signs.
    const eSearchUrl = `${entrezBaseUrl}esearch.fcgi?db=${db}&term=${query}&retmode=json`
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
    const eSummUrl = `${entrezBaseUrl}esummary.fcgi?db=${db}&id=${uidStr}&retmode=json`
    const docSums = await axios.get(eSummUrl)

    // return DocSums
    return docSums.data.result
  } catch (error) {
    console.log(`error ${error}`)
  }
}

export const EFetch = async (db, uid) => {
  try {
    let eFetchUrl = ''
    if (db === 'nuccore') {
      console.log(`db: ${db}`)
      eFetchUrl = `${entrezBaseUrl}efetch.fcgi?db=nucleotide&id=${uid}&rettype=fasta`
      const fasta = await axios.get(eFetchUrl)
      return fasta.data
    } else if (db === 'gene') {
      console.log(`db: ${db}`)
      eFetchUrl = `${entrezBaseUrl}efetch.fcgi?db=${db}&id=${uid}&retmode=xml` // => returns xml
      const response = await axios.get(eFetchUrl)
      let jsonRes = new XMLParser().parseFromString(response.data) // response.data MUST be XML
      // above line takes a while with big XML files... try to get back smaller XML
      return jsonRes
    } else if (db === 'homologene') {
      console.log(`db: ${db}`)
      eFetchUrl = `${entrezBaseUrl}efetch.fcgi?db=${db}&id=${uid}&retmode=xml` // => returns xml
      const response = await axios.get(eFetchUrl)
      let jsonRes = new XMLParser().parseFromString(response.data) // response.data MUST be XML
      return jsonRes
    }
    // console.log(eFetchUrl)
    // const response = await axios.get(eFetchUrl)
    // console.log(response)
    // // const idList = response.data.esearchresult.idlist

    // return response
  } catch (error) {
    console.log(`error ${error}`)
  }
}
