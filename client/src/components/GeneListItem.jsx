import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// come back and update the useNavigate below (to get to GeneDetails) with link or a-tag, whichever works best


// uid: searchResponse[key].uid,
// name: searchResponse[key].name,
// description: searchResponse[key].description,
// chromosome: searchResponse[key].chromosome,
// maplocation: searchResponse[key].maplocation,
// organism: {
//   scientificname: searchResponse[key].organism.scientificname,
//   commonname: searchResponse[key].organism.commonname,
//   taxid: searchResponse[key].organism.taxid
// },
// summary: searchResponse[key].summary

const GeneListItem = ({ geneSumm }) => {
  let navigate = useNavigate()

  const showGene = () => {
    navigate(`/gene/${geneSumm.uid}`)
  }

  return (
    <div className="search-table-item-row">
      <div className="gene-data link" onClick={showGene}>
        {geneSumm.name}
      </div>
      <div className="gene-data">{geneSumm.description}</div>
      <div className="gene-data">{geneSumm.organism.scientificname}</div>
      <div className="gene-data">{geneSumm.chromosome}</div>
      <div className="gene-data">{geneSumm.maplocation}</div>
    </div>
  )
}

export default GeneListItem
