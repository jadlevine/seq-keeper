import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// come back and update the useNavigate below (to get to GeneDetails) with link or a-tag, whichever works best

const GeneListItem = ({ geneSumm, setCurrentGeneSumm }) => {
  let navigate = useNavigate()

  const showGene = () => {
    // e.preventDefault()
    setCurrentGeneSumm(geneSumm)
    navigate(`/gene/${geneSumm.uid}`)
  }

  return (
    <div className="gene-list-item container search-table-item-row">
      <div className="gene-data">
        <h4>Gene Name</h4>
        <div className="gene-data link" onClick={showGene}>{geneSumm.name}</div>
      </div>
      <div className="gene-data">
        <h4>Description</h4>
        <div className="gene-data">{geneSumm.description}</div>
      </div>
      <div className="gene-data">
        <h4>Organism</h4>
        {geneSumm.organismscientificname? <div className="gene-data">{geneSumm.organismscientificname}</div> : <div className="gene-data">{geneSumm.organism.scientificname}</div>}
      </div>
      <div className="gene-data">
        <h4>Chromosome</h4>
        <div className="gene-data">{geneSumm.chromosome}</div>
      </div>
      <div className="gene-data">
        <h4>Map Location</h4>
        <div className="gene-data">{geneSumm.maplocation}</div>
      </div>
    </div>
  )
}

export default GeneListItem
