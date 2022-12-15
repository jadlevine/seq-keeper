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
import {
  CheckSKSeqStatus,
  AddSeqToUser,
  DeleteSeqFromUser
} from '../services/SequenceServices'
// import functions from sequenceservices here

// import OrganismSummary from '../components/OrganismSummary'
import SequenceSummary from '../components/SequenceSummary'
import SequenceSourceSummary from '../components/SequenceSourceSummary'
// import SequenceListItem from '../components/SequenceListItem'
// import HomologFinder from '../components/HomologSearch.jsx'
// import GeneListItem from '../components/GeneListItem'
// import HomologListItem from '../components/HomologListItem'

const SequenceDetails = (props) => {
  let {
    user,
    currentGeneSumm,
    setCurrentGeneSumm,
    currentSeqSumm,
    setCurrentSeqSumm,
    needSeqSumm,
    setNeedSeqSumm,
    setNeedGeneSumm
  } = props

  let { gene_uid, seq_uid } = useParams()
  let navigate = useNavigate()

  // const [geneSumm, setGeneSumm] = useState(null) // SHOULD be from SK only - this lives up in App.js now (THANK YOU AARON SANCHEZ!!!)
  // const [seqSumm, setCurrentSeqSumm] = useState(null) // could be from ncbi or sk
  const [skSeqId, setSKSeqId] = useState(false) // says if seq is in db, and so seqSumm above came from db
  const [fasta, setFasta] = useState(null)

  const viewFasta = async (e) => {
    e.preventDefault()
    if (skSeqId) {
      setFasta(currentSeqSumm.fasta)
    } else {
      let fastaResponse = await EFetch('nuccore', currentSeqSumm.uid)
      setFasta(fastaResponse)
      setCurrentSeqSumm({ ...currentSeqSumm, fasta: fastaResponse })
    }
  }

  const addThisSequence = async (e) => {
    e.preventDefault()
    // not including user.id in line below, because it's already been wrapped up into the seqSumm object/state
    const added = await AddSeqToUser(currentSeqSumm)
    setCurrentSeqSumm(added)
    setSKSeqId(added.id)
    // YOU ARE HERE!!!

    // eventually, render this component(page?) like the geneDetails page... with conditional rendering depending on if the seq is in SeqKeeper yet

    // const added = await AddSeqToUser(user.id, geneSumm)

    // setSKSeqId(added.id)
  }

  const deleteThisSequence = async (e) => {
    e.preventDefault()
    // console.log(geneSumm.id)
    console.log(user.id)
    console.log(currentSeqSumm.id)
    const deleted = await DeleteSeqFromUser(user.id, currentSeqSumm.id)
    setSKSeqId(false)
    setFasta(null)
    setCurrentSeqSumm(null)
    navigate(-1)
  }

  const getSeqFromNCBI = async () => {
    // console.log(geneSumm)
    const db = 'nuccore'
    const response = await ESummary(db, seq_uid)
    // console.log(response)
    let skSeqSumm = {
      ...response[0],
      ncbiLink: `https://www.ncbi.nlm.nih.gov/nuccore/${response[0].uid}`,
      fasta: '',
      userId: user.id,
      geneId: currentGeneSumm.id
    }
    setCurrentSeqSumm(skSeqSumm)
  }

  const getSeqSumm = async () => {
    //check if skSeqId exists (controlls conditional rendering of lots on this page)
    const skSeqSumm = await CheckSKSeqStatus(user.id, seq_uid)
    // console.log(`SEQUENCE: skSeqSumm response from backend: ${skSeqSumm}`)
    if (skSeqSumm) {
      setCurrentSeqSumm(skSeqSumm)
      setSKSeqId(skSeqSumm.id)
      return
    }
    getSeqFromNCBI()
  }

  const backToGeneDetails = () => {
    setNeedGeneSumm(true)
    setCurrentSeqSumm(null)
    setNeedSeqSumm(true)
    // setCurrentGeneSumm(null)
    navigate(`/gene/${currentGeneSumm.uid}`)
    // navigate(-1)
  }

  // on page load
  useEffect(() => {
    if (needSeqSumm) {
      getSeqSumm()
      setNeedSeqSumm(false)
    }
  }, [currentSeqSumm])

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
      {currentSeqSumm ? (
        <div>
          <div className="seq-page-header">
            <button onClick={backToGeneDetails}>
              {currentGeneSumm?.name} Details
            </button>
            <h1>Gene: {currentGeneSumm?.name}</h1>
            <h1>Sequence: {currentSeqSumm.title}</h1>
            <div className="seqSKStatus container">
              {skSeqId ? (
                <div>
                  <h4 className="red">Seq Keeper Seq ID: {skSeqId}</h4>
                  <button onClick={deleteThisSequence}>
                    Delete from account
                  </button>
                </div>
              ) : (
                <div>
                  <h4>This sequence is not associated with your account</h4>
                  {fasta ? (
                    <button onClick={addThisSequence}>Add this Sequence</button>
                  ) : (
                    <p>View FASTA to add this sequence to your account.</p>
                  )}
                </div>
              )}
            </div>
            {/* ?? Seq source summary (organism and gene?) /> */}
            {/* <OrganismSummary geneSumm={geneSumm} /> */}
          </div>
          <div className="seq-page-body">
            <div>
              <SequenceSourceSummary currentSeqSumm={currentSeqSumm} />
              <SequenceSummary currentSeqSumm={currentSeqSumm} />
            </div>
            <div className="fasta-block">
              {fasta ? (
                <div className="fasta">
                  <div className="button-row">
                    <button onClick={() => setFasta(null)}>Hide FASTA</button>
                  </div>
                  <div className="fasta">{fasta}</div>
                </div>
              ) : (
                <button onClick={viewFasta}>
                  View FASTA Sequence ({currentSeqSumm.slen}bp)
                </button>
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
