import { useState, useEffect } from 'react'
import { ESearch, ESummary, EFetch } from '../services/Entrez'

const NtListItem = ( { ntSumm } ) => {

  const [fasta, setFasta] = useState(null)

  const getSeq = async (e) => {
    e.preventDefault()
    let fastaResponse = await EFetch('nuccore', ntSumm.uid)
    
    console.log(fastaResponse)
    setFasta(fastaResponse)

  }


  return (
    <div className="nt-search-table-item-row">
      {/* <div className="gene-data link" onClick={showGene}>
        {geneSumm.name}
      </div> */}
      <div className="nt-data">{ntSumm.uid}</div>
      <div className="nt-data">{ntSumm.caption}</div>
      <div className="nt-data">{ntSumm.moltype}</div>
      <div className="nt-data">{ntSumm.slen}</div>
      <div className="nt-data">{ntSumm.organism}</div>
      <div className="nt-data">{ntSumm.updatedate}</div>
      <div className="nt-data">{ntSumm.title}</div>
      <a href={`https://www.ncbi.nlm.nih.gov/nuccore/${ntSumm.uid}`} target="_blank">NCBI Link</a>
      
      {fasta?(
        <div className="fasta">
          <button onClick={()=>setFasta(null)}>Hide Sequence</button>
          <div>{fasta}</div>
        </div>
      ):(
        <button onClick={getSeq}>Get this sequence</button>
      )}
    </div>
  )
}

export default NtListItem