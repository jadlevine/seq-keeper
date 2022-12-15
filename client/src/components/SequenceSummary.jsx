
const SequenceSummary = ( { currentSeqSumm } ) => {
  return (
    <div className="sequence-summary-container container">
      <div className="summary-header">Sequence Information</div>
      <div className="sequence-summary-row">
        <div className="summary-row-title">Accession</div>
        <div className="summary-row-data">{currentSeqSumm.accessionversion}</div>
      </div>
      <div className="sequence-summary-row">
        <div className="summary-row-title">SK -seqId</div>
        <div className="summary-row-data">{currentSeqSumm.id}</div>
      </div>

      <div className="sequence-summary-row">
        <div className="summary-row-title">Molecule</div>
        <div className="summary-row-data">{currentSeqSumm.biomol}</div>
      </div>
      <div className="sequence-summary-row">
        <div className="summary-row-title">Length (bp)</div>
        <div className="summary-row-data">{currentSeqSumm.slen}</div>
      </div>
      <div className="sequence-summary-row">
        <div className="summary-row-title">Title</div>
        <div className="summary-row-data">{currentSeqSumm.title}</div>
      </div>
      <div className="sequence-summary-row">
        <div className="summary-row-title">Subtype header</div>
        <div className="summary-row-data">{currentSeqSumm.subtype}</div>
      </div>
      <div className="sequence-summary-row">
        <div className="summary-row-title">Subtype</div>
        <div className="summary-row-data">{currentSeqSumm.subname}</div>
      </div>
      <div className="sequence-summary-row">
        <div className="summary-row-title">NCBI uid/gi</div>
        <div className="summary-row-data">{currentSeqSumm.uid}</div>
      </div>
      <div className="sequence-summary-row">
        <div className="summary-row-title">NCBI Link</div>
        <a className="summary-row-data" href={`${currentSeqSumm.ncbiLink}`} alt ="https://www.ncbi.nlm.nih.gov/nuccore" target="_blank">{currentSeqSumm.accessionversion}</a>
      </div>
      {/* <div className="sequence-summary-row">
        <div className="summary-row-title">Notes</div>
        <div className="summary-row-data">{currentSeqSumm.notes}</div>
      </div> */}
    </div>
  )
}

export default SequenceSummary