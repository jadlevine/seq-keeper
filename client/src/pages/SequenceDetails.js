import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ESearch, ESummary, EFetch } from '../services/Entrez'
import {
  CheckSKSeqStatus,
  AddSeqToUser,
  DeleteSeqFromUser
} from '../services/SequenceServices'

import SequenceSummary from '../components/SequenceSummary'
import SequenceSourceSummary from '../components/SequenceSourceSummary'

const SequenceDetails = (props) => {
  let {
    user,
    currentGeneSumm,
    currentSeqSumm,
    setCurrentSeqSumm,
    needSeqSumm,
    setNeedSeqSumm,
    setNeedGeneSumm
  } = props

  let { gene_uid, seq_uid } = useParams()
  let navigate = useNavigate()

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
  }

  const deleteThisSequence = async (e) => {
    e.preventDefault()
    console.log(user.id)
    console.log(currentSeqSumm.id)
    const deleted = await DeleteSeqFromUser(user.id, currentSeqSumm.id)
    setSKSeqId(false)
    setFasta(null)
    setCurrentSeqSumm(null)
    navigate(-1)
  }

  const getSeqFromNCBI = async () => {
    const db = 'nuccore'
    const response = await ESummary(db, seq_uid)
    let skSeqSumm = {
      ...response[0],
      ncbiLink: `https://www.ncbi.nlm.nih.gov/nuccore/${response[0].uid}`,
      fasta: '',
      userId: user.id,
      geneId: currentGeneSumm.id,
      geneUid: currentGeneSumm.uid
    }
    setCurrentSeqSumm(skSeqSumm)
  }

  const getSeqSumm = async () => {
    //check if skSeqId exists (controlls conditional rendering on this page)
    const skSeqSumm = await CheckSKSeqStatus(user.id, seq_uid)
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
    navigate(`/gene/${currentGeneSumm.uid}`)
  }

  useEffect(() => {
    if (needSeqSumm) {
      getSeqSumm()
      setNeedSeqSumm(false)
    }
  }, [currentSeqSumm])

  return (
    <div>
      {currentSeqSumm ? (
        <div>
          <div className="seq-page-header">
            <div className="text-block seq-header-data">
              <h2>{currentSeqSumm.title}</h2>
              <div className="seqSKStatus">
                {skSeqId ? (
                  <div>
                    <h4>SK - seqId: {skSeqId}</h4>
                    <button onClick={deleteThisSequence}>
                      Delete from account
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4>This sequence is not associated with your account</h4>
                    {fasta ? (
                      <button onClick={addThisSequence}>
                        Add this Sequence
                      </button>
                    ) : (
                      <p>View FASTA to add this sequence to your account.</p>
                    )}
                  </div>
                )}
              </div>
              <h3>
                Gene:{' '}
                <span className="link" onClick={backToGeneDetails}>
                  {currentGeneSumm?.name}
                </span>
              </h3>
            </div>
          </div>
          <div className="seq-page-body">
            <div>
              <SequenceSourceSummary currentSeqSumm={currentSeqSumm} />
              <SequenceSummary currentSeqSumm={currentSeqSumm} />
            </div>
            <div className="fasta-block container">
              {fasta ? (
                <div>
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
