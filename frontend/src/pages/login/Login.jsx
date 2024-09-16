import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin.js'

function Login() {
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")

  const {loading, login} = useLogin();

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      
      await login({username, password})
  }

  return (
    <div className='flex flex-col items-center justify-content min-w-96 mx-auto bg-neutral text-neutral-content'>
      <div className='w-full p-6 rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base '>
                Username
              </span>
            </label>
            <input type="text" placeholder="Enter Username" 
            className="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs"
            value={username} onChange={(e) => {setUsername(e.target.value)}}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base '>
                Password
              </span>
            </label>
            <input type="password" placeholder="Enter Password" 
            className="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs"
            value={password} onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
          <Link to="/signup" className='text-sm hover:underline hover:text-blue-500 inline-block mt-4'>
            {"Don't"} have an account?
          </Link>

          <div>
          <button className="btn btn-outline w-full mt-5 text-neutral-content" disabled={loading}>
          {loading ? <span className='loading loading-spinner' /> : "Login" }
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login


//STARTER CODE FOR THIS FILE

// import React from 'react'

// function Login() {
//   return (
//     <div className='flex flex-col items-center justify-content min-w-96 mx-auto bg-neutral text-neutral-content'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter'>
//         <h1 className='text-3xl font-semibold text-center'>Login</h1>
//         <form action="">
//           <div>
//             <label className='label p-2'>
//               <span className='text-base '>
//                 Username
//               </span>
//             </label>
//             <input type="text" placeholder="Enter Username" class="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs" />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base '>
//                 Password
//               </span>
//             </label>
//             <input type="password" placeholder="Enter Password" class="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs" />
//           </div>
//           <a href="#" className='text-sm hover:underline hover:text-blue-500 inline-block mt-4'>
//             {"Don't"} have an account?
//           </a>

//           <div>
//           <button class="btn btn-outline w-full mt-5 text-neutral-content">Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
