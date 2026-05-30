import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Signup() {
  let [show,setShow] = useState('false')
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <form
        action=""
        className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center text-black flex-col gap-4 md:items-start p-8'
      >
        <h1 className='text-[40px] text-black'>Welcome to Airbnb</h1>

        <div className='w-[90%] flex items-start justify-normal flex-col gap-[10px] mt-[30px]'>
          <label htmlFor="username" className='text-[20px]'>
            UserName
          </label>

          <input
            type="text"
            id="username"
            className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]'
          />
        </div>

        <div className='w-[90%] flex items-start justify-normal flex-col gap-[10px]'>
          <label htmlFor="email" className='text-[20px]'>
            Email
          </label>

          <input
            type="email"
            id="email"
            className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]'
          />
        </div>

        <div className='w-[90%] flex items-start justify-normal flex-col gap-[10px] relative'>
          <label htmlFor="password" className='text-[20px]'>
            Password
          </label>

          <input
            type="password"
            id="password"
            className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]'
          />
          <FaEye className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px]'/>
          <FaEyeSlash className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] '/>
        </div>

        <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg'>
          Signup
        </button>
      </form>
    </div>
  )
}

export default Signup