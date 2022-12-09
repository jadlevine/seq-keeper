import axios from 'axios'

// to make BLAST https requests via local host, must disable web security in new instance of chrome, use command line from client:
// open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials
// then npm start

// probably need to set up AWS to make this work

const blastPut = async () => {
  let fullUrl =
    'https://blast.ncbi.nlm.nih.gov/Blast.cgi?QUERY=u00001&DATABASE=nt&PROGRAM=blastn&CMD=Put'

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
