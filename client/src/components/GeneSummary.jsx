

const GeneSummary = ({currentGeneSumm}) => {

  return (
    <div className="gene-summ-container container">
      <div className="bold underline">Gene Information</div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Name</div>
        <div className="gene-summ-data">{currentGeneSumm.name}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">uid</div>
        <div className="gene-summ-data">{currentGeneSumm.uid}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Full Name</div>
        <div className="gene-summ-data">{currentGeneSumm.nomenclaturename}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Name Status</div>
        <div className="gene-summ-data">{currentGeneSumm.nomenclaturestatus}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Description</div>
        <div className="gene-summ-data">{currentGeneSumm.description}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Chomosome</div>
        <div className="gene-summ-data">{currentGeneSumm.chromosome}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Map Location</div>
        <div className="gene-summ-data">{currentGeneSumm.maplocation}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Summary</div>
        <div className="gene-summ-data">{currentGeneSumm.summary}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">NCBI Link</div>
        <a className="gene-summ-data" href={`${currentGeneSumm.ncbiLink}`} target="_blank">{currentGeneSumm.name}</a>
      </div>

    </div>
  )
}

export default GeneSummary