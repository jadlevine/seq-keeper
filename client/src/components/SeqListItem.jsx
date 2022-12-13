import { useState, useEffect } from 'react'
import { ESearch, ESummary, EFetch } from '../services/Entrez'

const SeqListItem = ( { ntSumm } ) => {

  const [fasta, setFasta] = useState(null)

  const getSeq = async (e) => {
    e.preventDefault()
    let fastaResponse = await EFetch('nuccore', ntSumm.gi)
    // console.log(fastaResponse)
    setFasta(fastaResponse)
  }
  const addThisSequence = async (e) => {
      e.preventDefault()

      // eventually, render this component(page?) like the geneDetails page... with conditional rendering depending on if the seq is in SeqKeeper yet
    
      // YOU ARE HERE //

      // ntSumm (see specific items below)
      // geneId (skGeneId) - (stretch - allow users to add seqs not associated with a gene... but at this point, how would they even get there?)
      // userId
      // ncbi link
      //fasta (whole file, don't try to parse it)

      // const added = await AddSeqToUser(user.id, geneSumm)
      
      // setSKSeqId(added.id)
  
      console.log('you got it, dude!')
  }


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
  

  return (
    <div className="seq-list-item container">
      {/* <div className="nt-search-table-item-row"> */}
      <div className="text-block">
        <div className="nt-data">{ntSumm.title}</div>
        
      </div>
      <div className="seq-table-row">
        <div>
          <h4>Molecule</h4>
          <div className="nt-data">{ntSumm.biomol}</div>
        </div>
        <div>
          <h4>Sequence Length (bp)</h4>
          <div className="nt-data bold larger">{ntSumm.slen}</div>
        </div>
        <div>
          <h4>Organism</h4>
          <div className="nt-data">{ntSumm.organism}</div>
        </div>
        <div>
          <h4>Update Date</h4>
          <div className="nt-data">{ntSumm.updatedate}</div>
        </div>
        <div>
          <h4>NCBI Link</h4>
          <a href={`https://www.ncbi.nlm.nih.gov/nuccore/${ntSumm.uid}`} target="_blank">{ntSumm.accessionversion}</a>
        </div>
      </div>
      <div className='fasta-block'>
      {fasta?(
        <div className="fasta">
          <div className='button-row'>
            <button onClick={()=>setFasta(null)}>Hide FASTA</button>
            <button onClick={addThisSequence}>Add This Sequence to Seq Keeper</button>
          </div>
          <div className='text-block fasta'>{fasta}</div>
        </div>
      ):(
        <button onClick={getSeq}>FASTA Sequence</button>
      )}
      </div>
    </div>
  )
}

export default SeqListItem