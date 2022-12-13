

const OrganismSummary = ({geneSumm}) => {
  return (
    <div className="container">
      <div className="bold underline">Organism Information</div>
      <div className="organism-summ-line">
        <div className="organism-summ-title bold">Scientific Name</div>
        <div className="organism-summ-data">{geneSumm.organismscientificname}</div>
        {/* <div className="organism-summ-data">{geneSumm.organism.scientificname}</div> */}
      </div>
      <div className="organism-summ-line">
        <div className="organism-summ-title bold">Common Name</div>
        <div className="organism-summ-data">{geneSumm.organismcommonname}</div>
        {/* <div className="organism-summ-data">{geneSumm.organism.commonname}</div> */}
      </div>
      <div className="organism-summ-line">
        <div className="organism-summ-title bold">Taxonomic ID</div>
        <div className="organism-summ-data">{geneSumm.organismtaxid}</div>
      </div>
    </div>
  )
}

export default OrganismSummary