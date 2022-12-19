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
  }

  const getSKSeqs = async () => {
    const response = await GetAllSeqsByUser(user.id)
    setUserSeqs(response)
  }

  useEffect(() => {
    getSKGenes()
    setNeedGeneSumm(true)
    getSKSeqs()
    setNeedSeqSumm(true)
  }, [])

  return (
    <div>
      <h1>{user.name}'s Home Page</h1>
      <div className="user-home-body">
        <div className="gene-list container">
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
              <h2>Fetching your Gene List</h2>
            </div>
          )}
        </div>

        <div className="sequence-list container">
          {userSeqs ? (
            <div className="search-results">
              <h2>Sequence List ({userSeqs.length})</h2>
              <div className="search-results-list">
                {userSeqs.map((seqSumm) => (
                  <SequenceListItem
                    key={seqSumm.uid}
                    seqSumm={seqSumm}
                    userId={user.id}
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
    </div>
  )
}

export default UserHome
