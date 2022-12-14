
const SequenceSummary = ( { currentSeqSumm } ) => {
  return (
    <div className="seq-summ-container container">
      <div className="bold underline">Sequence Information</div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Accession Version</div>
        <div className="seq-summ-data">{currentSeqSumm.accessionversion}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">UID/GI Number</div>
        <div className="seq-summ-data">{currentSeqSumm.uid}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Molecule</div>
        <div className="seq-summ-data">{currentSeqSumm.biomol}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold red">skGeneId - need to fetch this!! put up top?</div>
        <div className="seq-summ-data">{currentSeqSumm.geneId}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold red">skId - put this up top?</div>
        <div className="seq-summ-data">{currentSeqSumm.id}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Organism</div>
        <div className="seq-summ-data">{currentSeqSumm.organism}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Organism TaxId</div>
        <div className="seq-summ-data">{currentSeqSumm.taxid}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Strain</div>
        <div className="seq-summ-data">{currentSeqSumm.strain}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Sequence Length</div>
        <div className="seq-summ-data">{currentSeqSumm.slen}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Title</div>
        <div className="seq-summ-data">{currentSeqSumm.title}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Subtype header</div>
        <div className="seq-summ-data">{currentSeqSumm.subtype}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Subtype</div>
        <div className="seq-summ-data">{currentSeqSumm.subtypename}</div>
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">NCBI Link</div>
        {/* <a className="seq-summ-data" href={`${currentSeqSumm.ncbiLink}`} target="_blank">{currentSeqSumm.name}</a> */}
      </div>
      <div className="seq-summ-line">
        <div className="seq-summ-title bold">Notes</div>
        <div className="seq-summ-data">{currentSeqSumm.notes}</div>
      </div>

      <div className="seq-summ-line">
        <div className="seq-summ-title bold">FASTA Sequence</div>
        <div className="seq-summ-data">{currentSeqSumm.fasta}</div>
      </div>

    </div>
  )
}

export default SequenceSummary