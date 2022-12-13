import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ESearch, ESummary, EFetch } from '../services/Entrez'

const SequenceListItem = ( { seqSumm } ) => {
  let { gene_uid } = useParams()
  let navigate = useNavigate()


  const viewThisSequence = async (e) => {
      e.preventDefault()
      navigate(`/gene/${gene_uid}/sequence/${seqSumm.uid}`)

    //navigate to sequence details (which will need geneid/geneSumm? and user info?)
  
  }
  

  return (
    <div className="seq-list-item container">
      {/* <div className="nt-search-table-item-row"> */}
      <div className="text-block">
        <div className="nt-data">{seqSumm.title}</div>
        
      </div>
      <div className="seq-table-row">
        <div>
          <h4>Molecule</h4>
          <div className="nt-data">{seqSumm.biomol}</div>
        </div>
        <div>
          <h4>Sequence Length (bp)</h4>
          <div className="nt-data bold larger">{seqSumm.slen}</div>
        </div>
        <div>
          <h4>Organism</h4>
          <div className="nt-data">{seqSumm.organism}</div>
        </div>
        <div>
          <h4>Update Date</h4>
          <div className="nt-data">{seqSumm.updatedate}</div>
        </div>
        <div>
          <h4>NCBI Link</h4>
          <a href={`https://www.ncbi.nlm.nih.gov/nuccore/${seqSumm.uid}`} target="_blank">{seqSumm.accessionversion}</a>
        </div>
      </div>
      <button onClick={viewThisSequence}>View Sequence Details</button>
    </div>
  )
}

export default SequenceListItem