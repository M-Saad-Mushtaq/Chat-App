import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import useLogout from '../../hooks/useLogout.js'

function Logout() {
  const {loading, logout} = useLogout();

  return (
    <div className='mt-auto'>
        {!loading ? (<BiLogOut className='w-7 h-7 cursor-pointer hover:border-2 rounded' onClick={logout} />) : 
          <span className='loading loading-spinner' />
        }
    </div>
  )
}

export default Logout
