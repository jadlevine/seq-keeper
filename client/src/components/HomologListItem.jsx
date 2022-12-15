import { useNavigate, Link } from 'react-router-dom'

const HomologListItem = ({homologSumm, setCurrentGeneSumm, setNeedGeneSumm, currentGeneSummUid}) => {
  
  let navigate = useNavigate()
  
  const showGene = async () => {
    await setNeedGeneSumm(true)
    await setCurrentGeneSumm(null)
    navigate(`/gene/${homologSumm.geneid}`)
  }

  if(homologSumm.geneid === currentGeneSummUid){
    return
  } else {
    return (
      <div className="homolog-list-item container">
        <div className="gene-data">
          <h4>Gene Name</h4>
          <div className="gene-data link" onClick={showGene}>{homologSumm.symbol}</div>
        </div>
        <div className="gene-data">
          <h4>Organism</h4>
          <div className="gene-data">{homologSumm.taxname}</div>
        </div>
      </div>
    )
  }

}

export default HomologListItem