

const GeneSummary = ({geneSumm}) => {

  return (
    <div className="gene-summ-container container">
      <div className="bold underline">Gene Information</div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Name</div>
        <div className="gene-summ-data">{geneSumm.name}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">uid</div>
        <div className="gene-summ-data">{geneSumm.uid}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Full Name</div>
        <div className="gene-summ-data">{geneSumm.nomenclaturename}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Name Status</div>
        <div className="gene-summ-data">{geneSumm.nomenclaturestatus}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Description</div>
        <div className="gene-summ-data">{geneSumm.description}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Chomosome</div>
        <div className="gene-summ-data">{geneSumm.chromosome}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Map Location</div>
        <div className="gene-summ-data">{geneSumm.maplocation}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">Summary</div>
        <div className="gene-summ-data">{geneSumm.summary}</div>
      </div>
      <div className="gene-summ-line">
        <div className="gene-summ-title bold">NCBI Link</div>
        {/* go back and add this linkSTRING to geneSumm.ncbiLink, then, render it here as such, so you can include it in the post request to back end */}
        {/* <a className="gene-summ-data" href={`https://www.ncbi.nlm.nih.gov/gene/${geneSumm.uid}`} target="_blank">{geneSumm.name}</a> */}
        <a className="gene-summ-data" href={`${geneSumm.ncbiLink}`} target="_blank">{geneSumm.name}</a>
      </div>

    </div>
  )
}

export default GeneSummary