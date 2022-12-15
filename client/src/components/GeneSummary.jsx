

const GeneSummary = ({currentGeneSumm}) => {

  return (
    <div className="gene-summary-container container">
      <div className="summary-header">Gene Information</div>
      <div className="gene-summary-row">
        <div className="summary-row-title">Gene Name</div>
        <div className="summary-row-data">{currentGeneSumm.name}</div>
      </div>
      <div className="gene-summary-row">
        <div className="summary-row-title">SK - gId</div>
        {currentGeneSumm.id? (
          <div className="summary-row-data">{currentGeneSumm.id}</div>
        ):(
          <div className="summary-row-data">n/a</div>
        )
        }
      </div>

      <div className="gene-summary-row">
        <div className="summary-row-title">Full Name</div>
        <div className="summary-row-data">{currentGeneSumm.nomenclaturename}</div>
      </div>
      <div className="gene-summary-row">
        <div className="summary-row-title">Name Status</div>
        <div className="summary-row-data">{currentGeneSumm.nomenclaturestatus}</div>
      </div>
      <div className="gene-summary-row">
        <div className="summary-row-title">Description</div>
        <div className="summary-row-data">{currentGeneSumm.description}</div>
      </div>
      <div className="gene-summary-row">
        <div className="summary-row-title">Chomosome</div>
        <div className="summary-row-data">{currentGeneSumm.chromosome}</div>
      </div>
      <div className="gene-summary-row">
        <div className="summary-row-title">Map Location</div>
        <div className="summary-row-data">{currentGeneSumm.maplocation}</div>
      </div>
      <div className="gene-summary-row">
        <div className="summary-row-title">Summary</div>
        <div className="summary-row-data">{currentGeneSumm.summary}</div>
      </div>
      <div className="gene-summary-row">
        <div className="summary-row-title">NCBI uid</div>
        <div className="summary-row-data">{currentGeneSumm.uid}</div>
      </div>
      <div className="gene-summary-row">
        <div className="summary-row-title">NCBI Link</div>
        <a className="summary-row-data" href={`${currentGeneSumm.ncbiLink}`} target="_blank">{currentGeneSumm.name}</a>
      </div>

    </div>
  )
}

export default GeneSummary