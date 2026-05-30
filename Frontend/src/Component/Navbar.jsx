import React from 'react'
import { FaAirbnb, FaGlobe, FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

function Navbar() {

  return (

    <nav className='w-full h-[90px] bg-white border-b border-gray-200 flex items-center justify-center px-6'>

      <div className='w-full max-w-[1400px] flex items-center justify-between'>

        {/* Logo */}
        <div className='flex items-center gap-2 cursor-pointer'>

          <FaAirbnb className='text-[35px] text-red-500' />

          <h1 className='text-[32px] font-semibold text-red-500'>
            airbnb
          </h1>

        </div>

        {/* Search Bar */}
        <div className='hidden md:flex items-center border border-gray-300 rounded-full shadow-md px-2 py-2 hover:shadow-lg transition-all duration-300'>

          <button className='px-4 text-[14px] font-medium'>
            Anywhere
          </button>

          <div className='h-[20px] w-[1px] bg-gray-300'></div>

          <button className='px-4 text-[14px] font-medium'>
            Any week
          </button>

          <div className='h-[20px] w-[1px] bg-gray-300'></div>

          <button className='pl-4 pr-2 flex items-center gap-3 text-gray-500 text-[14px]'>

            Add guests

            <div className='w-[32px] h-[32px] rounded-full bg-red-500 flex items-center justify-center text-white'>
              🔍
            </div>

          </button>

        </div>

        {/* Right Side */}
        <div className='flex items-center gap-4'>

          <button className='hidden md:block px-4 py-2 rounded-full hover:bg-gray-100 text-[14px] font-medium transition-all duration-300'>
            Airbnb your home
          </button>

          <div className='w-[40px] h-[40px] rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer'>
            <FaGlobe className='text-[18px]' />
          </div>

          <div className='flex items-center gap-3 border border-gray-300 rounded-full px-3 py-2 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300'>

            <HiMenu className='text-[22px]' />

            <FaUserCircle className='text-[32px] text-gray-500' />

          </div>

        </div>

      </div>

    </nav>
  )
}

export default Navbar