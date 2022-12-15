import { useNavigate } from 'react-router-dom'

const GeneListItem = ({ geneSumm, setCurrentGeneSumm }) => {
  let navigate = useNavigate()

  const showGene = () => {
    setCurrentGeneSumm(geneSumm)
    navigate(`/gene/${geneSumm.uid}`)
  }

  return (
    <div className={geneSumm.id?"in-sk gene-list-item container" : " not-in-sk gene-list-item container" }>
      {geneSumm.id? (
        <div>
          <h4>SK-geneId</h4>
          <div>{geneSumm.id}</div>
        </div>
      ):(
        <div>
          <h4>No SK-id<br/>Click on gene name to see details and add.</h4>
        </div>
      )}
      <div>
        <h4>Gene Name</h4>
        <div className="link" onClick={showGene}>{geneSumm.name}</div>
      </div>
      <div>
        <h4>Description</h4>
        <div>{geneSumm.description}</div>
      </div>
      <div>
        <h4>Organism</h4>
        {geneSumm.organismscientificname? <div>{geneSumm.organismscientificname}</div> : <div>{geneSumm.organism.scientificname}</div>}
      </div>
      <div>
        <h4>Chromosome</h4>
        <div>{geneSumm.chromosome}</div>
      </div>
      <div>
        <h4>Map Location</h4>
        <div>{geneSumm.maplocation}</div>
      </div>
    </div>
  )
}

export default GeneListItem
