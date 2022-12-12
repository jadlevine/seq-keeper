

const Species = ({geneSumm}) => {
  return (
    <div className="container">
      <div className="bold underline">Species Information</div>
      <div className="species-summ-line">
        <div className="species-summ-title bold">Scientific Name</div>
        <div className="species-summ-data">{geneSumm.scientificname}</div>
        {/* <div className="species-summ-data">{geneSumm.organism.scientificname}</div> */}
      </div>
      <div className="species-summ-line">
        <div className="species-summ-title bold">Common Name</div>
        <div className="species-summ-data">{geneSumm.commonname}</div>
        {/* <div className="species-summ-data">{geneSumm.organism.commonname}</div> */}
      </div>
      <div className="species-summ-line">
        <div className="species-summ-title bold">Taxonomic ID</div>
        <div className="species-summ-data">{geneSumm.taxid}</div>
      </div>
    </div>
  )
}

export default Species