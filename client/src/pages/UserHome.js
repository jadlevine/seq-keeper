import { useState, useEffect } from 'react'
import { GetAllGenesByUser } from '../services/GeneServices'
import GeneListItem from '../components/GeneListItem'

const UserHome = ({ user, setCurrentGeneSumm, setNeedGeneSumm }) => {
  const [userGenes, setUserGenes] = useState([])

  const getSKGenes = async () => {
    const response = await GetAllGenesByUser(user.id)
    setUserGenes(response)
    // setUserHasGene(true)
  }

  // unnecessary?
  const handleChange = (e) => {
    // setSearchQuery(e.target.value)
  }

  // unnecessary?
  const onSubmit = (e) => {
    e.preventDefault()
    // getSearchResults()
  }

  useEffect(() => {
    // on page load?
    getSKGenes()
    setNeedGeneSumm(true)

    // getSKSequences()?
    // getGeneCollections()
    // set state for those things
  }, [])

  return (
    <div>
      <h1>User Home Page</h1>
      <div className="genelist">
        {userGenes ? (
          <div className="search-results">
            <h2>Gene List ({userGenes.length})</h2>
            <div className="search-table-header-row">
              <div className="table-header">Gene Name</div>
              <div className="table-header">Description</div>
              <div className="table-header">Organism</div>
              <div className="table-header">Chromosome</div>
              <div className="table-header">Map Location</div>
            </div>
            <div className="search-results-list">
              {userGenes.map((geneSumm) => (
                <GeneListItem
                  key={geneSumm.uid}
                  geneSumm={geneSumm}
                  setCurrentGeneSumm={setCurrentGeneSumm}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="red">Fetching your gene list</h2>
          </div>
        )}

        {/* <button onClick={getSKGenes}>Get genes</button> */}
        {/* map gene list here */}
      </div>
    </div>
  )
}

export default UserHome
