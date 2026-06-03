import React, { useState, useContext, useRef, useEffect } from 'react'

import {
  FaAirbnb,
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
import { userDataContext } from '../Context/UserContext'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const {userData, setUserData} = useContext(userDataContext)

  const { serverUrl, user, setUser } = useContext(authDataContext)

  const [showPopup, setShowPopup] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)

  const itemRefs = useRef([])
  const popupRef = useRef(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0, opacity: 0 })

  // Handle clicking outside popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
      setUserData(null)
      localStorage.removeItem("userData")
      setShowPopup(false)
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
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
      title: "Fool House"
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
      icon: <IoBedOutline />,
      title: "PG"
    },
    {
      icon: <GiWoodCabin />,
      title: "Cabins"
    },
    {
      icon: <SiHomeassistantcommunitystore />,
      title: "Shoos"
    }
  ]

  return (
    <>
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
      <div className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50">
        <nav className="max-w-[1400px] mx-auto px-4 md:px-10 h-[80px] flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <div
            className='flex items-center gap-1.5 cursor-pointer flex-shrink-0'
            onClick={() => navigate("/")}
          >
            <FaAirbnb className='text-[32px] text-[#FF385C]' />
            <h1 className='text-[22px] font-bold text-[#FF385C] tracking-tight'>
              airbnb
            </h1>
          </div>

          {/* MIDDLE SECTION - SEARCH BAR PILL */}
          <div 
            className='hidden md:flex items-center border border-zinc-200 rounded-full shadow-sm hover:shadow-md transition-all duration-150 py-1.5 pl-6 pr-2 bg-white cursor-pointer w-[380px] lg:w-[420px]'
            onClick={() => navigate("/")}
          >
            <span className='text-[14px] font-semibold text-zinc-800 pr-4 border-r border-zinc-200 hover:text-black transition-colors whitespace-nowrap'>
              Any Where
            </span>
            <span className='text-[14px] font-semibold text-zinc-800 px-4 border-r border-zinc-200 hover:text-black transition-colors whitespace-nowrap'>
              Any Location
            </span>
            <div className='pl-4 flex items-center justify-between flex-1 gap-2 min-w-0'>
              <span className='text-[14px] text-zinc-400 font-normal hover:text-zinc-600 transition-colors truncate'>
                Any City
              </span>
              <div className='w-[32px] h-[32px] rounded-full bg-[#FF385C] flex items-center justify-center text-white transition-all hover:bg-[#E61E4D] flex-shrink-0'>
                <FaSearch className='text-[11px]' />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE SECTION */}
          <div className='flex items-center gap-4 flex-shrink-0 relative'>
            <button 
              className='text-[14px] font-semibold text-zinc-800 hover:bg-zinc-50 px-4 py-2.5 rounded-full transition duration-205 cursor-pointer'
              onClick={() => navigate(user ? "/" : "/login")}
            >
              List your home
            </button>

            {/* HAMBURGER & PROFILE PILL BUTTON */}
            <div className="relative" ref={popupRef}>
              <div
                className='flex items-center gap-3 border border-zinc-200 rounded-full px-3.5 py-2 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 bg-white'
                onClick={() => setShowPopup(!showPopup)}
              >
                <HiMenu className='text-[18px] text-zinc-700' />
                {user ? (
                  <div className='w-[30px] h-[30px] rounded-full bg-[#FF385C] text-white flex items-center justify-center font-bold text-xs capitalize shadow-sm'>
                    {user.userName ? user.userName.charAt(0) : 'U'}
                  </div>
                ) : (
                  <FaUserCircle className='text-[28px] text-zinc-405' />
                )}
              </div>

              {/* POPUP DROPDOWN MENU */}
              {showPopup && (
                <div className='absolute top-[56px] right-0 w-[240px] bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden z-50 py-2'>
                  <ul className='flex flex-col text-[14px] text-zinc-800'>
                    {user ? (
                      <>
                        <li className='px-4 py-3 font-semibold border-b border-zinc-100 bg-zinc-50 text-zinc-900'>
                          Hello, {user.userName}!
                        </li>
                        <li className='px-4 py-2.5 hover:bg-zinc-50 cursor-pointer font-medium' onClick={() => setShowPopup(false)}>
                          My Listings
                        </li>
                        <li className='px-4 py-2.5 hover:bg-zinc-50 cursor-pointer font-medium border-b border-zinc-100' onClick={() => setShowPopup(false)}>
                          Check Bookings
                        </li>
                        <li className='px-4 py-2.5 hover:bg-zinc-50 cursor-pointer font-medium' onClick={() => { setShowPopup(false); navigate("/"); }}>
                          List your home
                        </li>
                        <li className='px-4 py-2.5 cursor-pointer font-medium text-red-500 hover:bg-zinc-50 transition-colors' onClick={handleLogout}>
                          Logout
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          className='px-4 py-2.5 hover:bg-zinc-50 cursor-pointer font-semibold'
                          onClick={() => { setShowPopup(false); navigate("/login"); }}
                        >
                          Login
                        </li>
                        <li
                          className='px-4 py-2.5 hover:bg-zinc-50 cursor-pointer font-medium border-b border-zinc-100'
                          onClick={() => { setShowPopup(false); navigate("/signup"); }}
                        >
                          Signup
                        </li>
                        <li
                          className='px-4 py-2.5 hover:bg-zinc-50 cursor-pointer font-medium'
                          onClick={() => { setShowPopup(false); navigate("/login"); }}
                        >
                          List your home
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* CATEGORIES / SCROLLABLE BAR */}
      <div className='w-full bg-white border-b border-zinc-200 overflow-x-auto scrollbar-hide sticky top-[80px] z-40 py-3'>
        <div className='relative max-w-[1400px] mx-auto flex items-center justify-start md:justify-center gap-6 md:gap-8 px-4 md:px-6 w-full'>
          {categories.map((item, index) => {
            const isActive = activeCategory === index;
            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer min-w-fit transition-all duration-200 pb-2 pt-1 ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-zinc-500 hover:text-black"
                }`}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setActiveCategory(index)}
              >
                <div className={`text-[20px] md:text-[22px] transition-colors duration-200 ${
                  isActive 
                    ? "text-black" 
                    : "text-zinc-400 hover:text-black"
                }`}>
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
      <div className='fixed bottom-0 left-0 right-0 z-50 py-1.5 pb-2 md:hidden flex justify-around items-center bg-white border-t border-zinc-200 text-zinc-400 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'>
        <button
          className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors ${
            location.pathname === "/" ? "text-[#FF385C]" : "text-zinc-400 hover:text-zinc-600"
          }`}
          onClick={() => navigate("/")}
        >
          <FaSearch className='text-[18px]' />
          <span className='text-[10px] font-medium'>Explore</span>
        </button>

        <button
          className='flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600'
          onClick={() => alert("Wishlists coming soon!")}
        >
          <FaRegHeart className='text-[18px]' />
          <span className='text-[10px] font-medium'>Wishlists</span>
        </button>

        <button
          className='flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600'
          onClick={() => navigate("/")}
        >
          <FaAirbnb className='text-[20px]' />
          <span className='text-[10px] font-medium'>Trips</span>
        </button>

        <button
          className='flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600'
          onClick={() => alert("Inbox coming soon!")}
        >
          <FaRegCommentDots className='text-[18px]' />
          <span className='text-[10px] font-medium'>Inbox</span>
        </button>

        {user ? (
          <button
            className='flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600'
            onClick={() => {
              if (window.confirm(`Logged in as ${user.userName}. Would you like to logout?`)) {
                handleLogout();
              }
            }}
          >
            <div className='w-[20px] h-[20px] rounded-full bg-[#FF385C] text-white flex items-center justify-center font-bold text-[9px] capitalize shadow-sm'>
              {user.userName ? user.userName.charAt(0) : 'U'}
            </div>
            <span className='text-[10px] font-medium truncate max-w-[60px]'>Profile</span>
          </button>
        ) : (
          <button
            className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors ${
              location.pathname === "/login" || location.pathname === "/signup"
                ? "text-[#FF385C]"
                : "text-zinc-400 hover:text-zinc-600"
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