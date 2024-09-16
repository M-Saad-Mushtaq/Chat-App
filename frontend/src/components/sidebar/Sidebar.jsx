import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from "./Converstaions.jsx"
import LogoutButton from './Logout.jsx'

const Sidebar = () => {
  return (
    <div className='border-r border-white-500 p-4 flex flex-col'>
      <SearchInput />
      <div className='divider px-3'></div>
       <Conversations />
      <LogoutButton />
    </div>
  )
}

export default Sidebar
