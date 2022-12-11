import { useNavigate } from 'react-router-dom'

const HomologListItem = ({homologSumm}) => {
  
  let navigate = useNavigate()
  
  const showGene = () => {
    navigate(`/gene/${homologSumm.geneid}`)
  }


  return (
    <div className="nt-search-table-item-row">
      {/* <div className="gene-data link" onClick={showGene}>
        {geneSumm.name}
      </div> */}
      <div className="nt-data">{homologSumm.geneid}</div>
      <div className="nt-data">{homologSumm.symbol}</div>
      <div className="nt-data">{homologSumm.title}</div>
      <div className="nt-data">{homologSumm.taxname}</div>
      <div className="nt-data">{homologSumm.taxid}</div>
      
      <a href={`/gene/${homologSumm.geneid}`} target="_blank">Seq Keeper Link</a>
      <a href={`https://www.ncbi.nlm.nih.gov/nuccore/${homologSumm.geneid}`} target="_blank">NCBI Link</a>
      
      {/* {fasta?(
        <div className="fasta">
          <button onClick={()=>setFasta(null)}>Hide Sequence</button>
          <div>{fasta}</div>
        </div>
      ):(
        <button onClick={getSeq}>Get this sequence</button>
      )} */}
    </div>
  )
}

export default HomologListItem