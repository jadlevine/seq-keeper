

const NtListItem = ( { ntSumm } ) => {


  return (
    <div className="nt-search-table-item-row">
      {/* <div className="gene-data link" onClick={showGene}>
        {geneSumm.name}
      </div> */}
      <div className="nt-data">{ntSumm.uid}</div>
      <div className="nt-data">{ntSumm.caption}</div>
      <div className="nt-data">{ntSumm.moltype}</div>
      <div className="nt-data">{ntSumm.slen}</div>
      <div className="nt-data">{ntSumm.organism}</div>
      <div className="nt-data">{ntSumm.updatedate}</div>
      <div className="nt-data">{ntSumm.title}</div>
    </div>
  )
}

export default NtListItem