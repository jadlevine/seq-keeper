import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ESearch, ESummary, EFetch } from '../services/Entrez'
import {
  // AddGeneToUser,
  // DeleteGene,
  // GetAllGenesByUser,
  // GetGeneById,
  CheckSKGeneStatus
} from '../services/GeneServices'
import { CheckSKSeqStatus } from '../services/SequenceServices'
// import functions from sequenceservices here

import OrganismSummary from '../components/OrganismSummary'
import SequenceSummary from '../components/SequenceSummary'
// import SequenceListItem from '../components/SequenceListItem'
// import HomologFinder from '../components/HomologSearch.jsx'
// import GeneListItem from '../components/GeneListItem'
// import HomologListItem from '../components/HomologListItem'

const SequenceDetails = ({ user, geneSumm }) => {
  let { gene_uid, seq_uid } = useParams()
  let navigate = useNavigate()

  // const [geneSumm, setGeneSumm] = useState(null) // SHOULD be from SK only - this lives up in App.js now (THANK YOU AARON SANCHEZ!!!)
  const [seqSumm, setSeqSumm] = useState(null) // could be from ncbi or sk
  const [skSeqId, setSKSeqId] = useState(false) // says if seq is in db, and so seqSumm above came from db
  const [fasta, setFasta] = useState(null)

  const viewFasta = async (e) => {
    e.preventDefault()
    if (skSeqId) {
      setFasta(seqSumm.fasta)
    } else {
      let fastaResponse = await EFetch('nuccore', seqSumm.gi)
      // console.log(fastaResponse)
      setFasta(fastaResponse)
      setSeqSumm({ ...seqSumm, fasta: fastaResponse })
    }
  }

  const addThisSequence = async (e) => {
    e.preventDefault()

    // eventually, render this component(page?) like the geneDetails page... with conditional rendering depending on if the seq is in SeqKeeper yet

    // const added = await AddSeqToUser(user.id, geneSumm)

    // setSKSeqId(added.id)

    console.log('you got it, dude!')
  }

  // const addThisGene = async (e) => {
  //   e.preventDefault()
  //   const added = await AddGeneToUser(user.id, geneSumm)
  //   setSKGeneId(added.id) // check this line
  //   // setUserHasGene(true)
  //   // console.log(added)
  // }

  const deleteThisSequence = async (e) => {
    e.preventDefault()
    // console.log(geneSumm.id)
    // const deleted = await DeleteGene(geneSumm.id)
    // setSKGeneId(false)
    // navigate(`/userhome`)
  }

  const getSeqFromNCBI = async () => {
    console.log(geneSumm)
    const db = 'nuccore'
    const response = await ESummary(db, seq_uid)
    console.log(response)
    let skSeqSumm = {
      ...response[0],
      ncbiLink: `https://www.ncbi.nlm.nih.gov/nuccore/${response[0].uid}`,
      fasta: '',
      userId: user.id,
      geneId: geneSumm.id
    }
    setSeqSumm(skSeqSumm)
  }

  // const pageSetUp = async () => {
  // const getGeneSumm = async () => {
  //   //getSKGeneSumm (you already have uid...via params)
  //   let skGeneSumm = null
  //   console.log(`user.id: ${user.id}. Type: ${typeof user.id}`)
  //   console.log(`gene_uid: ${gene_uid}. Type: ${typeof gene_uid}`)
  //   skGeneSumm = await CheckSKGeneStatus(user.id, gene_uid)
  //   // this line should NOT fail, but if it did, some sort of error message should appear?
  //   console.log(`GENE: skGeneSumm response from backend: ${skGeneSumm}`)
  //   console.log(skGeneSumm)
  //   // let skGeneSumm = { ...response[0] }
  //   // setGeneSumm(response[0])

  //   //// WWWHHHHYYYYYYYYY ////////// THIS LINE IS FAILING ???????
  //   setGeneSumm(skGeneSumm)

  //   console.log(geneSumm)
  //   return
  // }

  const getSeqSumm = async () => {
    //check if skSeqId exists (controlls conditional rendering of lots on this page)
    const skSeqSumm = await CheckSKSeqStatus(user.id, seq_uid)
    console.log(`SEQUENCE: skSeqSumm response from backend: ${skSeqSumm}`)
    if (skSeqSumm) {
      setSeqSumm(skSeqSumm)
      setSKSeqId(skSeqSumm.id)
      return
    }
    getSeqFromNCBI()
  }

  // on page load
  useEffect(() => {
    // getGeneSumm()
    getSeqSumm()
  }, [])

  // NOTE - GI/UID/accessionVersion numbers are unique identifiers of a record
  //      - accession number applies to the whole db record, entrez seq db searches with accession number will retreive the MOST RECENT version of a sequence record

  ///details to display:
  /**
   * line 1
   * accessionversion: "NM_153647.4" - first arg of FASTA header
   * biomol: "mRNA" - 3rd arg of FASTA header
   * slen: integer (render as "sequence length")
   * updatedate: "2022/04/17"
   * organism: "human"
   * line/block 2
   * title: "a description" - 2ns arg of FASTA header
   * block 3
   * fasta --> conditional - fasta (make it look good, not text-align: center!)
   * 
   * Details to keep (in addition) for db use, and/or seqDetails page?
   * or gi - number? same as uid (which is a string here?)
   * taxid: integer - for checking against organism
   * strain: "important for microbes"
  * subtype - "chromosome|map"
   * subname: "14|14q32.12" 
  
  * ADD seq - only avail when fasta is showing
   * notes field?
   * (include geneId and userId as well!)
   */

  // const getGeneSeq = async () => {
  //   let db = 'nuccore'
  //   let nucUid = 1676319757
  //   let fetchResponse = await EFetch(db, nucUid)
  //   // let fetchResponse = await EFetch(db, gene_uid)
  //   console.log(fetchResponse)
  // }

  return (
    <div>
      {seqSumm ? (
        <div>
          <div className="seq-page-header">
            <h1>Gene: {geneSumm?.name}</h1>
            <h1>Sequence: {seqSumm.title}</h1>
            <div className="seqSKStatus container">
              {skSeqId ? (
                <div>
                  <h4>Seq Keeper Seq ID: {skSeqId}</h4>
                  <button onClick={deleteThisSequence}>Delete</button>
                </div>
              ) : (
                <div>
                  <h4>This sequence is not yet associated with your account</h4>
                  {fasta ? (
                    <button onClick={addThisSequence}>Add this Sequence</button>
                  ) : (
                    <p>View FASTA to add this sequence to your account.</p>
                  )}
                </div>
              )}
            </div>
            {/* <OrganismSummary geneSumm={geneSumm} /> */}
          </div>
          <div className="seq-page-body">
            <SequenceSummary seqSumm={seqSumm} />
            <div className="fasta-block">
              {fasta ? (
                <div className="fasta">
                  <div className="button-row">
                    <button onClick={() => setFasta(null)}>Hide FASTA</button>
                  </div>
                  <div className="text-block fasta">{fasta}</div>
                </div>
              ) : (
                <button onClick={viewFasta}>View FASTA Sequence</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Getting Sequence Summary</h1>
        </div>
      )}
    </div>
  )
}

export default SequenceDetails
