import { useState, useEffect } from 'react'
import { GetAllGenesByUser } from '../services/GeneServices'
import GeneListItem from '../components/GeneListItem'

const UserHome = ({ user }) => {
  const [genes, setGenes] = useState([])

  const getSKGenes = async () => {
    const response = await GetAllGenesByUser(user.id)
    setGenes(response)
    // setUserHasGene(true)
  }

  const handleChange = (e) => {
    // setSearchQuery(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // getSearchResults()
  }

  useEffect(() => {
    // on page load?
    getSKGenes()
    // getGeneCollections()
    // set state for those things
  }, [])

  return (
    <div>
      <h1>User Home Page</h1>
      <div className="genelist">
        {genes ? (
          <div className="search-results">
            <h2>Gene List ({genes.length})</h2>
            <div className="search-table-header-row">
              <div className="table-header">Gene Name</div>
              <div className="table-header">Description</div>
              <div className="table-header">Species</div>
              <div className="table-header">Chromosome</div>
              <div className="table-header">Map Location</div>
            </div>
            <div className="search-results-list">
              {genes.map((geneSumm) => (
                <GeneListItem key={geneSumm.uid} geneSumm={geneSumm} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="red">Fetching your gene lsit</h2>
          </div>
        )}

        {/* <button onClick={getSKGenes}>Get genes</button> */}
        {/* map gene list here */}
      </div>
    </div>
  )
}

export default UserHome
