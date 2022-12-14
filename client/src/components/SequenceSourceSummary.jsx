const SequenceSourceSummary = ({currentSeqSumm}) => {

  return (
    <div className="sequence-source-summary-container container">
      <div className="summary-header">Sequence Source Information</div>
      <div className="sequence-source-summary-row">
        <div className="summary-row-title">Organism</div>
        <div className="summary-row-data">{currentSeqSumm.organism}</div>
      </div>
      <div className="sequence-source-summary-row">
        <div className="summary-row-title">Strain</div>
        <div className="summary-row-data">{currentSeqSumm.strain}</div>
      </div>
      <div className="sequence-source-summary-row">
        <div className="summary-row-title">Taxonomic ID</div>
        <div className="summary-row-data">{currentSeqSumm.taxid}</div>
      </div>
      <div className="sequence-source-summary-row">
        <div className="summary-row-title">SK - gid</div>
        <div className="summary-row-data">{currentSeqSumm.geneId}</div>
      </div>
      <div className="sequence-source-summary-row">
        <div className="summary-row-title">gene uid</div>
        <div className="summary-row-data">{currentSeqSumm.geneUid}</div>
      </div>
    </div>
  )
}

export default SequenceSourceSummary