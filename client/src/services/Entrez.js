import axios from 'axios'

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
