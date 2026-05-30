import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { authDataContext } from '../Context/Auth.context';
import axios from 'axios';

function Login() {

  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { serverUrl, setUser } = useContext(authDataContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")  

  const handleLogin = async () => {
      try {
        let result = await axios.post(serverUrl + "/api/auth/login", {
          email,
          password
        }, { withCredentials: true })
        console.log(result.data)
        
        // Update auth context state and localStorage
        setUser(result.data)
        localStorage.setItem("user", JSON.stringify(result.data))
        
        alert("Login successfully")
        navigate("/")
      } catch (error) {
        console.error(error)
        alert(error.response?.data?.message || "Login failed")
      }
    }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>

      {/* Back Arrow */}
      <div
        className='w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[20px] left-[20px] flex items-center justify-center rounded-full text-white text-[22px]'
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong />
      </div>

      <form
        className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center text-black flex-col gap-4 md:items-start p-8 bg-white rounded-xl shadow-lg'
        onSubmit={(e)=>{
          e.preventDefault()
          handleLogin()
        }}
      >

        <h1 className='text-[40px] text-black'>
          Welcome to Airbnb
        </h1>

        {/* Email */}
        <div className='w-[90%] flex items-start flex-col gap-[10px] mt-[30px]'>

          <label htmlFor="email" className='text-[20px]'>
            Email
          </label>

          <input
            type="email"
            id="email"
            className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required 
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
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
            className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]'
            required 
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
          />

          {!show && (
            <FaEye
              className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(prev => !prev)}
            />
          )}

          {show && (
            <FaEyeSlash
              className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(prev => !prev)}
            />
          )}

        </div>

        <button className='px-[50px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-lg'>
          Login
        </button>

        <p className='text-[17px]'>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className='text-red-500 underline underline-offset-2 cursor-pointer'
          >
            Signup
          </Link>

        </p>

      </form>
    </div>
  )
}

export default Login