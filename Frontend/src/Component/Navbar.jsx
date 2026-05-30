import React, { useState, useContext, useRef, useEffect } from 'react'

import {
  FaAirbnb,
  FaGlobe,
  FaUserCircle,
  FaFireAlt,
  FaSearch,
  FaRegHeart,
  FaRegCommentDots
} from "react-icons/fa";

import { HiMenu } from "react-icons/hi";

import {
  MdVilla,
  MdOutlinePool,
  MdOutlineBedroomParent
} from "react-icons/md";

import {
  GiFamilyHouse,
  GiWoodCabin
} from "react-icons/gi";

import {
  SiHomeassistantcommunitystore
} from "react-icons/si";

import {
  IoBedOutline
} from "react-icons/io5";

import {
  BiBuildingHouse
} from "react-icons/bi";

import axios from 'axios'

import { useNavigate, useLocation } from 'react-router-dom'

import { authDataContext } from '../Context/Auth.context'

function Navbar() {

  const navigate = useNavigate()
  const location = useLocation()

  const { serverUrl, user, setUser } = useContext(authDataContext)

  const [showPopup, setShowPopup] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)

  const itemRefs = useRef([])
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const updateLine = () => {
      const targetIndex = hoveredCategory !== null ? hoveredCategory : activeCategory;
      const targetEl = itemRefs.current[targetIndex];
      if (targetEl) {
        setLineStyle({
          left: targetEl.offsetLeft,
          width: targetEl.offsetWidth,
          opacity: 1
        });
      } else {
        setLineStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // Delay calculation slightly to ensure nodes are fully rendered
    const timeoutId = setTimeout(updateLine, 50);

    window.addEventListener('resize', updateLine);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateLine);
    };
  }, [activeCategory, hoveredCategory]);

  const handleLogout = async () => {
    try {
      await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      )
      
      // Clear client state
      setUser(null)
      localStorage.removeItem("user")
      setShowPopup(false)
      
      alert("Logout successful")
      navigate("/login")
    } catch (error) {
      console.error("Logout error:", error)
      // Fallback: clear state anyway if network fails
      setUser(null)
      localStorage.removeItem("user")
      setShowPopup(false)
      navigate("/login")
    }
  }

  const categories = [
    {
      icon: <FaFireAlt />,
      title: "Trending"
    },
    {
      icon: <MdVilla />,
      title: "Villa"
    },
    {
      icon: <GiFamilyHouse />,
      title: "Farm House"
    },
    {
      icon: <MdOutlinePool />,
      title: "Pool House"
    },
    {
      icon: <MdOutlineBedroomParent />,
      title: "Rooms"
    },
    {
      icon: <BiBuildingHouse />,
      title: "Flat"
    },
    {
      icon: <GiWoodCabin />,
      title: "Cabins"
    },
    {
      icon: <SiHomeassistantcommunitystore />,
      title: "Shops"
    },
    {
      icon: <IoBedOutline />,
      title: "PG"
    }
  ]

  return (
    <>
      {/* Scrollbar hide styling */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* TOP NAVBAR */}
      <nav className='w-full bg-white border-b border-gray-150 sticky top-0 z-50 shadow-sm md:shadow-none'>
        <div className='max-w-[1400px] mx-auto h-[72px] md:h-[80px] px-4 md:px-6 flex items-center justify-between gap-4 relative'>

          {/* LOGO - Hidden on extreme mobile to give search bar space, shown on sm+ */}
          <div
            className='hidden sm:flex items-center gap-1.5 cursor-pointer flex-shrink-0'
            onClick={() => navigate("/")}
          >
            <FaAirbnb className='text-[34px] text-[#FF385C]' />
            <h1 className='hidden md:block text-[22px] font-bold text-[#FF385C] tracking-tight'>
              airbnb
            </h1>
          </div>

          {/* DESKTOP SEARCH BAR - Centered absolutely on desktop */}
          <div 
            className='hidden md:flex absolute left-1/2 -translate-x-1/2 items-center border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-150 py-1.5 pl-5 pr-1.5 bg-white cursor-pointer w-[340px] lg:w-[380px] z-10'
            onClick={() => navigate("/")}
          >
            <span className='text-[13px] lg:text-[14px] font-semibold text-gray-800 pr-3.5 border-r border-gray-180 whitespace-nowrap hover:text-black transition-colors'>
              Anywhere
            </span>
            <span className='text-[13px] lg:text-[14px] font-semibold text-gray-800 px-3.5 border-r border-gray-180 whitespace-nowrap hidden lg:inline-block hover:text-black transition-colors'>
              Any week
            </span>
            <div className='pl-3.5 pr-1 flex items-center justify-between flex-1 gap-2 min-w-0'>
              <span className='text-[13px] lg:text-[14px] font-semibold text-gray-800 pr-3.5 border-r border-gray-180 whitespace-nowrap hover:text-black transition-colors'>
                Add guests
              </span>
              <div className='w-[32px] h-[32px] rounded-full bg-[#FF385C] flex items-center justify-center text-white transition-all hover:bg-[#E61E4D] flex-shrink-0'>
                <FaSearch className='text-[11px]' />
              </div>
            </div>
          </div>

          {/* MOBILE SEARCH BAR - Shown on mobile (< md) */}
          <div 
            className='flex md:hidden items-center justify-between border border-gray-200 rounded-full shadow-sm bg-white p-2.5 w-full cursor-pointer hover:shadow-md transition-all'
            onClick={() => navigate("/")}
          >
            <div className='flex items-center gap-3 pl-2'>
              <FaSearch className='text-gray-800 text-[16px]' />
              <div className='text-left'>
                <div className='text-[13px] font-bold text-gray-900'>Where to?</div>
                <div className='text-[11px] text-gray-500 font-medium'>Anywhere • Any week • Add guests</div>
              </div>
            </div>
            <div className='border border-gray-200 rounded-full p-2 text-gray-700 hover:bg-gray-50 mr-1'>
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', height: '14px', width: '14px', fill: 'currentColor'}} aria-hidden="true" focusable="false"><path d="M5 8c1.3 0 2.4.8 2.8 2H14v2H7.8c-.4 1.2-1.5 2-2.8 2-1.7 0-3-1.3-3-3s1.3-3 3-3zm0 2c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm6-8c1.3 0 2.4.8 2.8 2H14v2h-1.2c-.4 1.2-1.5 2-2.8 2-1.7 0-3-1.3-3-3s1.3-3 3-3zm0 2c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"></path></svg>
            </div>
          </div>

          {/* DESKTOP RIGHT SIDE - Hidden on mobile (< md) */}
          <div className='hidden md:flex items-center gap-2 flex-shrink-0 relative'>
            <button 
              className='text-[14px] font-semibold text-gray-800 hover:bg-gray-50 px-4 py-2.5 rounded-full transition duration-200 cursor-pointer'
              onClick={() => navigate(user ? "/" : "/login")}
            >
              Airbnb your home
            </button>

            <div className='w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-700 cursor-pointer transition duration-200 mr-1'>
              <FaGlobe className='text-[16px]' />
            </div>

            {/* HAMBURGER TRIGGER */}
            <div
              className='flex items-center gap-3 border border-gray-200 rounded-full px-3.5 py-1.5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 bg-white'
              onClick={() => setShowPopup(!showPopup)}
            >
              <HiMenu className='text-[18px] text-gray-700' />
              {user ? (
                <div className='w-[30px] h-[30px] rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-xs capitalize'>
                  {user.userName ? user.userName.charAt(0) : 'U'}
                </div>
              ) : (
                <FaUserCircle className='text-[30px] text-gray-400' />
              )}
            </div>

            {/* POPUP MENU */}
            {showPopup && (
              <div className='absolute top-[52px] right-0 w-[240px] bg-white border border-gray-150 rounded-xl shadow-xl overflow-hidden z-50 py-2'>
                <ul className='flex flex-col text-[14px] text-gray-800'>
                  {user ? (
                    <>
                      <li className='px-4 py-3 font-semibold border-b border-gray-100 bg-gray-50/50 text-gray-900'>
                        Hello, {user.userName}!
                      </li>
                      <li className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-medium' onClick={() => setShowPopup(false)}>
                        My Listings
                      </li>
                      <li className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-medium border-b border-gray-100' onClick={() => setShowPopup(false)}>
                        Check Bookings
                      </li>
                      <li className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-medium' onClick={() => { setShowPopup(false); navigate("/"); }}>
                        List your Home
                      </li>
                      <li className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-medium text-red-500 hover:text-red-600' onClick={handleLogout}>
                        Logout
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-semibold'
                        onClick={() => { setShowPopup(false); navigate("/login"); }}
                      >
                        Login
                      </li>
                      <li
                        className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-medium border-b border-gray-100'
                        onClick={() => { setShowPopup(false); navigate("/signup"); }}
                      >
                        Signup
                      </li>
                      <li
                        className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-medium'
                        onClick={() => { setShowPopup(false); navigate("/login"); }}
                      >
                        List your Home
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CATEGORIES / SCROLLABLE BAR */}
      <div className='w-full bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide sticky top-[72px] md:top-[80px] z-40 shadow-sm md:shadow-none'>
        <div className='relative max-w-[1400px] mx-auto flex items-center justify-start md:justify-center gap-6 md:gap-8 px-4 md:px-6 py-3 w-full'>
          {categories.map((item, index) => {
            const isActive = activeCategory === index;
            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer min-w-fit transition-all duration-200 pb-2 pt-1 ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-gray-500 hover:text-black"
                }`}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setActiveCategory(index)}
              >
                <div className={`text-[20px] md:text-[22px] ${isActive ? "text-black" : "text-gray-500 group-hover:text-black"}`}>
                  {item.icon}
                </div>
                <p className='text-[11px] md:text-[12px] tracking-tight whitespace-nowrap'>
                  {item.title}
                </p>
              </div>
            );
          })}
          {/* THE SINGLE SLIDING UNDERLINE BAR */}
          <div
            className='absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-out z-10'
            style={{
              left: `${lineStyle.left}px`,
              width: `${lineStyle.width}px`,
              opacity: lineStyle.opacity,
            }}
          />
        </div>
      </div>

      {/* STICKY BOTTOM NAVIGATION BAR FOR MOBILE */}
      <div className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 py-1.5 pb-2 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center'>
        <button
          className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer ${
            location.pathname === "/" ? "text-[#FF385C]" : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => navigate("/")}
        >
          <FaSearch className='text-[18px]' />
          <span className='text-[10px] font-medium'>Explore</span>
        </button>

        <button
          className='flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:text-gray-600 bg-transparent border-none outline-none cursor-pointer'
          onClick={() => alert("Wishlists coming soon!")}
        >
          <FaRegHeart className='text-[18px]' />
          <span className='text-[10px] font-medium'>Wishlists</span>
        </button>

        <button
          className='flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:text-gray-600 bg-transparent border-none outline-none cursor-pointer'
          onClick={() => navigate("/")}
        >
          <FaAirbnb className='text-[20px]' />
          <span className='text-[10px] font-medium'>Trips</span>
        </button>

        <button
          className='flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:text-gray-600 bg-transparent border-none outline-none cursor-pointer'
          onClick={() => alert("Inbox coming soon!")}
        >
          <FaRegCommentDots className='text-[18px]' />
          <span className='text-[10px] font-medium'>Inbox</span>
        </button>

        {user ? (
          <button
            className='flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:text-gray-600 bg-transparent border-none outline-none cursor-pointer'
            onClick={() => {
              if (window.confirm(`Logged in as ${user.userName}. Would you like to logout?`)) {
                handleLogout();
              }
            }}
          >
            <div className='w-[20px] h-[20px] rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-[9px] capitalize'>
              {user.userName ? user.userName.charAt(0) : 'U'}
            </div>
            <span className='text-[10px] font-medium truncate max-w-[60px]'>Profile</span>
          </button>
        ) : (
          <button
            className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer ${
              location.pathname === "/login" || location.pathname === "/signup"
                ? "text-[#FF385C]"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => navigate("/login")}
          >
            <FaUserCircle className='text-[20px]' />
            <span className='text-[10px] font-medium'>Log in</span>
          </button>
        )}
      </div>
    </>
  )
}

export default Navbar