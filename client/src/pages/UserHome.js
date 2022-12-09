import React from 'react'
import axios from 'axios'
// import convert from 'xml-js'
// const convert = require('xml-js')

// to make https requests via local host, must disable web security in new instance of chrome, use command line from client:
// open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials
// then npm start

const UserHome = () => {
  let fullUrl =
    'https://blast.ncbi.nlm.nih.gov/Blast.cgi?QUERY=u00001&DATABASE=nt&PROGRAM=blastn&CMD=Put'

  const blastPut = async () => {
    try {
      const response = await axios.put(fullUrl)
      const qbiArr = response.data
        .slice(
          response.data.indexOf('QBlastInfoBegin'),
          response.data.lastIndexOf('QBlastInfoEnd') + 13
        )
        .split('\n')
      const rid = qbiArr[1].slice(qbiArr[1].indexOf('RID') + 6)
      const rtoe = qbiArr[2].slice(qbiArr[2].indexOf('RTOE') + 7)
      // let data = response.data
      console.log(`rid:${rid}`) // T47GNTR6016
      console.log(`rtoe:${rtoe}`) // 81
      console.log(qbiArr)
      console.log(response.data)

      // console.log(`data: ${data}`)
      //       <!--QBlastInfoBegin
      //     RID = T42WG0RN013
      //     RTOE = 41
      // QBlastInfoEnd
      // -->
      // let stringRes = response.toString()
      // console.log(`stringRes: ${stringRes}`)
      // let stringData = data.toString()
      // console.log(`stringData: ${stringData}`)
    } catch (error) {
      console.log(`error ${error}`)
    }
  }

  // blastPut()

  const blastCheck = async () => {
    try {
      // const rid = 'T47GNTR6016' // later
      // const rid = 'T42WG0RN013' // earlier
      const rid = 'T417NUPJ013' // should be done?

      const checkUrl = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?FORMAT_OBJECT=SearchInfo&RID=${rid}&CMD=Get`
      const response = await axios.put(checkUrl)
      const qbiArr = response.data
        .slice(
          response.data.indexOf('QBlastInfoBegin'),
          response.data.lastIndexOf('QBlastInfoEnd') + 13
        )
        .split('\n')
      // will return WAITING, UNKNOWN, or READY
      console.log(qbiArr) // => ['QBlastInfoBegin', '\t                Status=UNKNOWN', '                QBlastInfoEnd']

      ////////// YEEESSSS ///////////
      //for should be done (T417NUPJ013) // => ['QBlastInfoBegin', '\t                Status=READY', '                QBlastInfoEnd', '                --></p> ', '                \x3C!--', 'QBlastInfoBegin', '\tThereAreHits=yes', 'QBlastInfoEnd']
      console.log(response.data)
    } catch (error) {
      console.log(`error ${error}`)
    }
  }

  // blastCheck()

  const getResults = async () => {
    try {
      const rid = 'T417NUPJ013' // should be done?

      // const getUrl = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Get&RID=${rid}`
      // const getUrl = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Get&RID=${rid}&FORMAT_TYPE=JSON2`
      const getUrl = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Get&RID=${rid}&FORMAT_TYPE=Text`
      const response = await axios.put(getUrl)
      console.log(response)
      // console.log(response.data)
      const qbiArr = response.data
        .slice(
          response.data.indexOf('QBlastInfoBegin'),
          response.data.lastIndexOf('QBlastInfoEnd') + 13
        )
        .split('\n')
      // will return WAITING, UNKNOWN, or READY
      console.log(qbiArr) // => ['QBlastInfoBegin', '\t                Status=UNKNOWN', '                QBlastInfoEnd']

      ////////// YEEESSSS ///////////
      //for should be done (T417NUPJ013) // => ['QBlastInfoBegin', '\t                Status=READY', '                QBlastInfoEnd', '                --></p> ', '                \x3C!--', 'QBlastInfoBegin', '\tThereAreHits=yes', 'QBlastInfoEnd']
      console.log(response.data)
    } catch (error) {
      console.log(`error ${error}`)
    }
  }

  // getResults()

  const entrezSearch = async () => {
    try {
      const entrezBaseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
      const basicSearch = 'esearch.fcgi?db=<database>&term=<query>'
      // db lists: https://www.ncbi.nlm.nih.gov/guide/all/
      // const ntDb = 'Nucleotide'
      const geneDb = 'Gene'
      // const popsetDb = 'PopSet'

      // queries - special characters must be url-encoded  Spaces may be replaced by '+' signs.
      const query = 'brca1' // obviously hardcoded for now

      const db = geneDb

      // const entrezUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=${db}&term=${query}`
      const entrezUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=${db}&term=${query}&retmode=json`
      const response = await axios.get(entrezUrl)

      // const jsonRes = convert.xml2json(response, { compact: false, spaces: 4 })

      const idList = response.data.esearchresult.idlist

      // YOU ARE HERE //
      // Next, either figure out how to get the axios call to return some basic info (that my user could view) (e.g. gene name, species, description) that they could then click on (which could reasonably be another api call) for gene details... and then, they could add the gene to their collection...
      // almost CERTAINLY need to avoid making individual API calls for each uid (3/second max would break everytime)
      // next api call - full gene record
      // https://www.ncbi.nlm.nih.gov/books/NBK25499/#:~:text=Fetch%20full%20XML,2%26retmode%3Dxml

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
      const eSummUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=${db}&id=${uidStr}&retmode=json`
      const docSums = await axios.get(eSummUrl)
      // YEEEESSSSSS////
      // docSums.data.result = {key:value,...} where key is uid(plus one key at the end that is uids: [array of uids]), value is object containing summary data, including(amongst others): chromosome, description, maplocation, name, nomenclaturestatus, organism: {scientificname: 'value', commonname: 'value', tacid: 'value'}, summary, uid
      console.log(docSums)
      console.log(docSums.data)

      // console.log(response)
      // console.log(idList)
      // console.log(jsonRes)
    } catch (error) {
      console.log(`error ${error}`)
    }
  }

  entrezSearch()

  console.log('end')

  return (
    <div>
      <h1>User Home Page</h1>
    </div>
  )
}

export default UserHome
