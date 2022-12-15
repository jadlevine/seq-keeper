
const SequenceSummary = ( { currentSeqSumm } ) => {
  return (
    <div className="seq-summary-container container">
      <div className="summary-header">Sequence Information</div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Accession Version</div>
        <div className="summary-row-data">{currentSeqSumm.accessionversion}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">UID/GI Number</div>
        <div className="summary-row-data">{currentSeqSumm.uid}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Molecule</div>
        <div className="summary-row-data">{currentSeqSumm.biomol}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title red">skGeneId - need to fetch this!! put up top?</div>
        <div className="summary-row-data">{currentSeqSumm.geneId}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title red">skId - put this up top?</div>
        <div className="summary-row-data">{currentSeqSumm.id}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Organism</div>
        <div className="summary-row-data">{currentSeqSumm.organism}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Organism TaxId</div>
        <div className="summary-row-data">{currentSeqSumm.taxid}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Strain</div>
        <div className="summary-row-data">{currentSeqSumm.strain}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Sequence Length</div>
        <div className="summary-row-data">{currentSeqSumm.slen}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Title</div>
        <div className="summary-row-data">{currentSeqSumm.title}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Subtype header</div>
        <div className="summary-row-data">{currentSeqSumm.subtype}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Subtype</div>
        <div className="summary-row-data">{currentSeqSumm.subtypename}</div>
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">NCBI Link</div>
        {/* <a className="summary-row-data" href={`${currentSeqSumm.ncbiLink}`} target="_blank">{currentSeqSumm.name}</a> */}
      </div>
      <div className="seq-summary-row">
        <div className="summary-row-title">Notes</div>
        <div className="summary-row-data">{currentSeqSumm.notes}</div>
      </div>

      <div className="seq-summary-row">
        <div className="summary-row-title">FASTA Sequence</div>
        <div className="summary-row-data">{currentSeqSumm.fasta}</div>
      </div>

    </div>
  )
}

export default SequenceSummary