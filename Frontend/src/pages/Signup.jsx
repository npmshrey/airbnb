import axios from 'axios';
import React, { useState, useContext } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { authDataContext } from '../Context/Auth.context'

function Signup() {

  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const {userData,setUserData} = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSingup = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/auth/signup", {
        name,
        email,
        password
      }, { withCredentials: true })
      setUserData(result.data)
      localStorage.setItem("userData", JSON.stringify(result.data))
      navigate("/"+result.data.role)
      console.log(result.data)
      alert("Account successfully created")
      
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Signup failed")
    }
  }


  return (

    <div className='w-full min-h-screen flex items-center justify-center bg-gray-100'>

      {/* Back Arrow */}
      <div
        className='w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[20px] left-[20px] flex items-center justify-center rounded-full text-white text-[22px]'
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong />
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSingup();
        }}
        className='max-w-[900px] w-[90%] bg-white shadow-lg rounded-xl flex items-center justify-center text-black flex-col gap-4 md:items-start p-8'
      >

        {/* Heading */}
        <h1 className='text-[40px] font-semibold text-black'>
          Welcome to Airbnb
        </h1>

        {/* Username */}
        <div className='w-[90%] flex items-start flex-col gap-[10px] mt-[30px]'>

          <label htmlFor="username" className='text-[20px]'>
            UserName
          </label>

          <input
            type="text"
            id="username"
            placeholder='Enter your username'
            autoComplete='username'
            className='w-full h-[45px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] outline-none'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        {/* Email */}
        <div className='w-[90%] flex items-start flex-col gap-[10px]'>

          <label htmlFor="email" className='text-[20px]'>
            Email
          </label>

          <input
            type="email"
            id="email"
            placeholder='Enter your email'
            autoComplete='email'
            className='w-full h-[45px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] outline-none'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}
        <div className='w-[90%] flex items-start flex-col gap-[10px] relative'>

          <label htmlFor="password" className='text-[20px]'>
            Password
          </label>

          <input
            type={show ? "text" : "password"}
            id="password"
            placeholder='Enter your password'
            autoComplete='current-password'
            className='w-full h-[45px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] outline-none'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!show ? (

            <FaEye
              className='w-[22px] h-[22px] absolute right-[15px] bottom-[12px] cursor-pointer text-gray-600'
              onClick={() => setShow(true)}
            />

          ) : (

            <FaEyeSlash
              className='w-[22px] h-[22px] absolute right-[15px] bottom-[12px] cursor-pointer text-gray-600'
              onClick={() => setShow(false)}
            />

          )}

        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className='px-[50px] py-[10px] bg-red-500 hover:bg-red-600 transition-all duration-300 text-white text-[18px] md:px-[100px] rounded-lg mt-[10px]'
        >
          Signup
        </button>

        {/* Login Link */}
        <p className='text-[17px]'>

          Already have an account?{" "}

          <Link
            to="/login"
            className='text-red-500 underline underline-offset-2 cursor-pointer'
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Signup