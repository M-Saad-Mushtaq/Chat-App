import React from 'react'
import useConversation from '../../zustand/useConverstaion.js'
import { useSocketContext } from '../../context/SocketContext.js'

function Converstaion({conversation, lastIdx}) {

    const {selectedConversation, setSelectedConversation} = useConversation()

    const isSelected = selectedConversation?._id === conversation._id

    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers?.includes(conversation._id)

    console.log(isOnline);
    

  return (
    <>
        <div className={`flex p-2 py-1 cursor-pointer gap-2 items-center rounded hover:text-lg hover:text-white hover:bg-green-500 ${isSelected ? "bg-green-500" : ""}`}
            onClick={() => setSelectedConversation(conversation)}
            >
            
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-14 rounded-full">
                    <img src={conversation.profilePic} alt='Profile' />
                </div>
            </div>

            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold'>
                        {conversation.fullname}
                    </p>
                </div>
            </div>
        </div>

        {!lastIdx && <div className=' divider bg-white rounded my-0 py-0 h-0.5 mt-1 mb-2' />}
    </>
  )
}

export default Converstaion
