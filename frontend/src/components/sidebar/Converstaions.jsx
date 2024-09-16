import React from 'react'
import Conversation from "./Converstaion.jsx"

import useGetConversations from '../../hooks/useGetConversations.js'

function Converstaions() {
  const {loading, conversations} = useGetConversations();
  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {conversations.map((conversation, idx) => (
        <Conversation 
          key={conversation._id} 
          conversation={conversation} 
          lastIdx = {idx === useGetConversations.length -1} />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto' /> : null }
    </div>
  )
}

export default Converstaions
