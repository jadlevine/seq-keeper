import { useState, useEffect } from 'react'
import { GetAllGenesByUser } from '../services/GeneServices'
import { GetAllSeqsByUser } from '../services/SequenceServices'
import GeneListItem from '../components/GeneListItem'
import SequenceListItem from '../components/SequenceListItem'

const UserHome = (props) => {
  let {
    user,
    setCurrentGeneSumm,
    setNeedGeneSumm,
    setCurrentSeqSumm,
    setNeedSeqSumm
  } = props

  const [userGenes, setUserGenes] = useState([])
  const [userSeqs, setUserSeqs] = useState([])

  const getSKGenes = async () => {
    const response = await GetAllGenesByUser(user.id)
    setUserGenes(response)
    // setUserHasGene(true)
  }

  const getSKSeqs = async () => {
    const response = await GetAllSeqsByUser(user.id)
    setUserSeqs(response)
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
    getSKSeqs()
    setNeedSeqSumm(true)

    // getSKSequences()?
    // getGeneCollections()
    // set state for those things
  }, [])

  return (
    <div>
      <h1>{user.name}'s Home Page</h1>
      <div className="genelist">
        {userGenes ? (
          <div className="search-results">
            <h2>Gene List ({userGenes.length})</h2>
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
            <h2 className="red">Fetching your Gene List</h2>
          </div>
        )}
      </div>
      <div className="seqlist">
        {userGenes ? (
          <div className="search-results">
            <h2>Sequence List ({userGenes.length})</h2>
            <div className="search-results-list">
              {userSeqs.map((seqSumm) => (
                <SequenceListItem
                  key={seqSumm.uid}
                  seqSumm={seqSumm}
                  userId={user.id}
                  // geneId={skGeneId}
                  setNeedSeqSumm={setNeedSeqSumm}
                  setCurrentSeqSumm={setCurrentSeqSumm}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="red">Fetching your Sequence List</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserHome
