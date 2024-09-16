import React from 'react'
import GenderCheckbox from './GenderCheckbox.jsx'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup.js'

function Signup() {
  const [inputs ,setInputs] = React.useState({
    fullname:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:''
  })

  const {loading, signup} = useSignup();

  function handleGender(gender) {
    setInputs({...inputs, gender})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(inputs);
    
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto bg-neutral text-neutral-content'>
      <div className='w-full p-6 rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>Signup</h1>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base '>
                Full Name
              </span>
            </label>
            <input type="text" placeholder="Enter Full Name" 
                  className="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs"
                  value={inputs.fullname} onChange={(e) => setInputs({...inputs, fullname:e.target.value})}
            />
          
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base '>
                Username
              </span>
            </label>
            <input type="text" placeholder="Enter Username" 
                    className="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs"
                    value={inputs.username} onChange={(e) => setInputs({...inputs, username:e.target.value})}
            />
          
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base '>
                Password
              </span>
            </label>
            <input  type="password" placeholder="Enter Password" 
                    className="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs"
                    value={inputs.password} onChange={(e) => setInputs({...inputs, password:e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base '>
                Confirm Password
              </span>
            </label>
            <input type="password" placeholder="Confirm Password" 
                    className="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs" 
                    value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword:e.target.value})}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleGender} selectedGender={inputs.gender} />

          <Link to="/login" className='text-sm hover:underline hover:text-blue-500 inline-block mt-4'>
            Already have an account?
          </Link>

          <div>
          <button className="btn btn-outline w-full mt-5 text-neutral-content" disabled={loading}>
            {loading ? <span className='loading loading-spinner' /> : "Signup" }
          </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup


//STARTER CODE FOR THIS FILE

// import React from 'react'
// import GenderCheckbox from './GenderCheckbox.jsx'

// function Signup() {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto bg-neutral text-neutral-content'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter'>
//         <h1 className='text-3xl font-semibold text-center'>Signup</h1>
        
//         <form>
//           <div>
//             <label className='label p-2'>
//               <span className='text-base '>
//                 Full Name
//               </span>
//             </label>
//             <input type="text" placeholder="Enter Full Name" className="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs" />
          
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base '>
//                 Username
//               </span>
//             </label>
//             <input type="text" placeholder="Enter Username" className="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs" />
          
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base '>
//                 Password
//               </span>
//             </label>
//             <input type="password" placeholder="Enter Password" class="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs" />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base '>
//                 Confirm Password
//               </span>
//             </label>
//             <input type="password" placeholder="Confirm Password" class="input input-bordered h-10 text-black border-transparent border-4 focus:border-green-500 w-full max-w-xs" />
//           </div>

//           <GenderCheckbox />

//           <a href="#" className='text-sm hover:underline hover:text-blue-500 inline-block mt-4'>
//             Already have an account?
//           </a>

//           <div>
//           <button class="btn btn-outline w-full mt-5 text-neutral-content">Signup</button>
//           </div>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup
