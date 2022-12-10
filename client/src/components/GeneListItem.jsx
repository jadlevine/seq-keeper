import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

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

const GeneListItem = ({ gene }) => {
  let navigate = useNavigate()

  const showGene = () => {
    navigate(`/gene/${gene.uid}`)
  }

  return (
    <div className="search-table-item-row">
      <div className="gene-data link" onClick={showGene}>
        {gene.name}
      </div>
      <div className="gene-data">{gene.description}</div>
      <div className="gene-data">{gene.organism.scientificname}</div>
      <div className="gene-data">{gene.chromosome}</div>
      <div className="gene-data">{gene.maplocation}</div>
    </div>
  )
}

export default GeneListItem
