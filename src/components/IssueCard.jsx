import { useSortable } from '@dnd-kit/sortable'
import { useState } from 'react'
import Client from '../services/api';

export const IssueCard = (props) => {
  const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
  const OPENAI_API_KEY = '';

  
  const { issue, resolve, car } = props
  const [expanded, setExpanded] = useState(false)

  const onClick = () => {
    expanded ? setExpanded(false) : setExpanded(true)
  }

  const closedStyle = {
    border: '1px solid black',
    borderRadius: '12px',
    margin: '2vmin 1vmin 2vmin 1vmin',
  }

  const openStyle = {
    textAlign: 'center',
    border: '1px solid black',
    margin: '2vmin 1vmin 2vmin 1vmin',
    height: '20vmin'
  }

const resolveIssue = async(e) => {
  e.preventDefault()
  await Client.put(`/cars/${car._id}/issues/${issue._id}`)
  window.location.reload(false)
}

  return (
    <div className='issueCard' onClick={onClick} style={!expanded ? closedStyle : openStyle}>
      {!expanded ? (
        <div>
          <h3>{issue.title}</h3>
          <h4>
            {issue.resolved ? 'resolved' : 'open'}
          </h4>
        </div>
      ):(
        <div className='issueBody'>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          {issue.resolved ? 
          <button onClick={resolveIssue} className='navButton bodyButton'>Reopen</button> 
          : 
          <button onClick={resolveIssue} className='navButton bodyButton'>Resolve</button>
          }
          
        </div>
      )}
    </div>
  )
}

export default IssueCard