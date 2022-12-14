import { Link, useNavigate } from "react-router-dom"

const OrganismSummary = ({currentGeneSumm}) => {
  // let navigate=useNavigate()

  let commonNameDiv
  if(currentGeneSumm.organismcommonname){
    let commonName = currentGeneSumm.organismcommonname
    let query=commonName.replaceAll(' ', '%20')
    commonNameDiv = (<a className="organism-summ-data" href={`https://googlethatforyou.com?q=${query}`} target="_blank">{currentGeneSumm.organismcommonname}</a>)
  } else {
    commonNameDiv = (<div>none</div>)
  }
  // const linkout = () => {
  //   navigate(`https://google.gprivate.com/search.php?search?q=${query}`)
  // }
  // let commonNameQuery = currentGeneSumm.organismcommonname.replaceAll(' ', '+')

  return (
    <div className="container">
      <div className="bold underline">Organism Information</div>
      <div className="organism-summ-line">
        <div className="organism-summ-title bold">Scientific Name</div>
        <div className="organism-summ-data">{currentGeneSumm.organismscientificname}</div>
        {/* <div className="organism-summ-data">{geneSumm.organism.scientificname}</div> */}
      </div>
      <div className="organism-summ-line">
        <div className="organism-summ-title bold">Common Name</div>
        {commonNameDiv}
        {/* <a className="organism-summ-data" href={`https://googlethatforyou.com?q=${query}`} target="_blank">{currentGeneSumm.organismcommonname}</a> */}
        {/* <Link to={`https://google.gprivate.com/search.php?search?q=${query}`}>{currentGeneSumm.organismcommonname}</Link> */}
        {/* <div className="organism-summ-data">{currentGeneSumm.organismcommonname}</div> */}
        {/* <div className="organism-summ-data">{geneSumm.organism.commonname}</div> */}
      </div>
      <div className="organism-summ-line">
        <div className="organism-summ-title bold">Taxonomic ID</div>
        <div className="organism-summ-data">{currentGeneSumm.organismtaxid}</div>
      </div>
    </div>
  )
}

export default OrganismSummary