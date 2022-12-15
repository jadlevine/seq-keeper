import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ESearch, ESummary, EFetch } from '../services/Entrez'

const SequenceListItem = ( props ) => {
  let { seqSumm,
    userId,
    geneId,
    setCurrentSeqSumm,
    setNeedSeqSumm
  } = props
  let { gene_uid } = useParams()
  let navigate = useNavigate()


  const showThisSeq = () => {
      // e.preventDefault()
      setCurrentSeqSumm(seqSumm)
      navigate(`/gene/${gene_uid}/sequence/${seqSumm.uid}`)

    //navigate to sequence details (which will need geneid/geneSumm? and user info?)
  
  }


  return (
    <div className={seqSumm.id? "in-sk seq-list-item container": "not-in-sk seq-list-item container"}>
      <div className="seq-list-item-row">
        {seqSumm.id? (
          <div>
            <h4>SK-seqId</h4>
            <div>{seqSumm.id}</div>
          </div>
        ):(
          <div>
            <h4>No SK-seqId<br/><span className="link" onClick={showThisSeq}>Click to see more
        </span></h4>
            
          </div>
        )}
        <div>
          <h4>Accession Number</h4>
          <div>{seqSumm.accessionversion}</div>     
        </div>
        <div>
          <h4>Molecule</h4>
          <div>{seqSumm.biomol}</div>
        </div>
        <div>
          <h4>Sequence Length (bp)</h4>
          <div className=" bold larger">{seqSumm.slen}</div>
        </div>
        <div>
          <h4>Organism</h4>
          <div>{seqSumm.organism}</div>
        </div>
        <div>
          <h4>Update Date</h4>
          <div>{seqSumm.updatedate}</div>
        </div>
      </div>
      <div className="text-block seq-list-item-description">
        <div>{seqSumm.title}</div>
      </div>
    </div>
  )
}

export default SequenceListItem