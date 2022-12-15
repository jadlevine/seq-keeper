const OrganismSummary = ({currentGeneSumm}) => {

  let commonNameDiv
  if(currentGeneSumm.organismcommonname){
    let commonName = currentGeneSumm.organismcommonname
    let query=commonName.replaceAll(' ', '%20')
    commonNameDiv = (<a className="summary-row-data" href={`https://googlethatforyou.com?q=${query}`} target="_blank">{currentGeneSumm.organismcommonname}</a>)
  } else {
    commonNameDiv = (<div>none</div>)
  }

  return (
    <div className="organism-summary-container container">
      <div className="summary-header">Organism Information</div>
      <div className="organism-summary-row">
        <div className="summary-row-title">Scientific Name</div>
        <div className="summary-row-data">{currentGeneSumm.organismscientificname}</div>
      </div>
      <div className="organism-summary-row">
        <div className="summary-row-title">Common Name</div>
        {commonNameDiv}
      </div>
      <div className="organism-summary-row">
        <div className="summary-row-title">Taxonomic ID</div>
        <div className="summary-row-data">{currentGeneSumm.organismtaxid}</div>
      </div>
    </div>
  )
}

export default OrganismSummary