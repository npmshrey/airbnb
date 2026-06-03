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

import {
  HiMenu,
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineSun,
  HiOutlineMoon
} from "react-icons/hi";

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
  const popupRef = useRef(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0, opacity: 0 })

  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || 
           localStorage.getItem('theme') === 'dark';
  })

  // Synchronize theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

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
      
      // Clear client state
      setUser(null)
      localStorage.removeItem("user")
      setShowPopup(false)
      
      alert("Logout successful")
      navigate("/login")
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

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

      {/* FLOATING TOP NAVBAR */}
      <div className="w-full flex justify-center sticky top-0 z-50 px-4 md:px-0">
        <nav className={`w-full max-w-[1200px] mt-4 rounded-full border transition-all duration-300 backdrop-blur-md px-6 py-2.5 flex items-center justify-between gap-4 ${
          darkMode 
            ? "border-zinc-800/80 bg-zinc-950/80 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
            : "border-zinc-200/80 bg-white/80 text-zinc-900 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
        }`}>
          
          {/* LOGO */}
          <div
            className='flex items-center gap-2 cursor-pointer flex-shrink-0'
            onClick={() => navigate("/")}
          >
            <FaAirbnb className='text-2xl md:text-3xl text-[#FF385C]' />
            <h1 className='text-[18px] md:text-20px font-extrabold tracking-tight transition-colors duration-200'>
              airbnb
            </h1>
          </div>

          {/* MIDDLE NAV LINKS - exact same structure as the screenshot */}
          <div className='hidden md:flex items-center gap-8'>
            <button
              onClick={() => navigate("/")}
              className={`flex items-center gap-2 text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                location.pathname === "/"
                  ? (darkMode ? "text-white" : "text-zinc-950")
                  : (darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900")
              }`}
            >
              <HiOutlineHome className='text-lg' />
              Home
            </button>
            <button
              onClick={() => navigate("/")}
              className={`flex items-center gap-2 text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <HiOutlineViewGrid className='text-lg' />
              Plus Dashboard
            </button>
            <button
              onClick={() => navigate("/")}
              className={`flex items-center gap-2 text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <HiOutlineCreditCard className='text-lg' />
              Pricing
            </button>
          </div>

          {/* RIGHT SIDE SECTION */}
          <div className='flex items-center gap-3.5 flex-shrink-0 relative'>
            <button 
              className={`hidden lg:block text-[13px] font-semibold transition duration-200 cursor-pointer mr-1 ${
                darkMode ? "text-zinc-300 hover:text-white" : "text-zinc-600 hover:text-zinc-900"
              }`}
              onClick={() => navigate(user ? "/" : "/login")}
            >
              Airbnb your home
            </button>

            {/* THEME TOGGLE */}
            <button 
              onClick={toggleDarkMode}
              className={`w-9 h-9 border rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                darkMode 
                  ? "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900/50" 
                  : "border-zinc-200 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/50"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <HiOutlineSun className='text-lg' />
              ) : (
                <HiOutlineMoon className='text-lg' />
              )}
            </button>

            {/* HAMBURGER & PROFILE PILL BUTTON */}
            <div className="relative" ref={popupRef}>
              <div
                className={`flex items-center gap-3 border rounded-full px-3.5 py-1.5 shadow-sm cursor-pointer transition-all duration-200 ${
                  darkMode
                    ? "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                    : "border-zinc-200 bg-zinc-50/50 text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
                }`}
                onClick={() => setShowPopup(!showPopup)}
              >
                <HiMenu className='text-[18px]' />
                {user ? (
                  <div className='w-[24px] h-[24px] rounded-full bg-[#FF385C] text-white flex items-center justify-center font-bold text-xs capitalize shadow-sm'>
                    {user.userName ? user.userName.charAt(0) : 'U'}
                  </div>
                ) : (
                  <FaUserCircle className='text-[24px]' />
                )}
              </div>

              {/* POPUP DROPDOWN MENU */}
              {showPopup && (
                <div className={`absolute top-[48px] right-0 w-[240px] border backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden z-50 py-2 transition-all duration-200 ${
                  darkMode
                    ? "bg-zinc-950/95 border-zinc-800/80 text-zinc-300"
                    : "bg-white/95 border-zinc-200/80 text-zinc-700"
                }`}>
                  <ul className='flex flex-col text-[14px]'>
                    {user ? (
                      <>
                        <li className={`px-4 py-3 font-semibold border-b ${
                          darkMode ? "border-zinc-900 bg-zinc-900/10 text-white" : "border-gray-100 bg-gray-50/50 text-zinc-900"
                        }`}>
                          Hello, {user.userName}!
                        </li>
                        <li className={`px-4 py-2.5 cursor-pointer font-medium ${
                          darkMode ? "hover:bg-zinc-900 hover:text-white" : "hover:bg-gray-50 hover:text-zinc-900"
                        }`} onClick={() => setShowPopup(false)}>
                          My Listings
                        </li>
                        <li className={`px-4 py-2.5 cursor-pointer font-medium border-b ${
                          darkMode ? "border-zinc-900 hover:bg-zinc-900 hover:text-white" : "border-gray-100 hover:bg-gray-50 hover:text-zinc-900"
                        }`} onClick={() => setShowPopup(false)}>
                          Check Bookings
                        </li>
                        <li className={`px-4 py-2.5 cursor-pointer font-medium ${
                          darkMode ? "hover:bg-zinc-900 hover:text-white" : "hover:bg-gray-50 hover:text-zinc-900"
                        }`} onClick={() => { setShowPopup(false); navigate("/"); }}>
                          List your Home
                        </li>
                        <li className={`px-4 py-2.5 cursor-pointer font-medium text-red-500 transition-colors ${
                          darkMode ? "hover:bg-zinc-900 hover:text-red-400" : "hover:bg-gray-50 hover:text-red-600"
                        }`} onClick={handleLogout}>
                          Logout
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          className={`px-4 py-2.5 cursor-pointer font-semibold border-b ${
                            darkMode ? "border-zinc-900/50 hover:bg-zinc-900 hover:text-white" : "border-gray-100 hover:bg-gray-50 hover:text-zinc-900"
                          }`}
                          onClick={() => { setShowPopup(false); navigate("/login"); }}
                        >
                          Login
                        </li>
                        <li
                          className={`px-4 py-2.5 cursor-pointer font-medium border-b ${
                            darkMode ? "border-zinc-900/50 hover:bg-zinc-900 hover:text-white" : "border-gray-100 hover:bg-gray-50 hover:text-zinc-900"
                          }`}
                          onClick={() => { setShowPopup(false); navigate("/signup"); }}
                        >
                          Signup
                        </li>
                        <li
                          className={`px-4 py-2.5 cursor-pointer font-medium ${
                            darkMode ? "hover:bg-zinc-900 hover:text-white" : "hover:bg-gray-50 hover:text-zinc-900"
                          }`}
                          onClick={() => { setShowPopup(false); navigate("/login"); }}
                        >
                          List your Home
                        </li>
                      </>
                    )}
                    {/* MOBILE LINKS IN HAMBURGER */}
                    <div className={`md:hidden border-t mt-1 pt-1 ${darkMode ? "border-zinc-900/80" : "border-gray-100"}`}>
                      <li className={`px-4 py-2.5 cursor-pointer font-medium flex items-center gap-2.5 ${
                        darkMode ? "hover:bg-zinc-900 hover:text-white" : "hover:bg-gray-50 hover:text-zinc-900"
                      }`} onClick={() => { setShowPopup(false); navigate("/"); }}>
                        <HiOutlineHome className="text-lg" />
                        Home
                      </li>
                      <li className={`px-4 py-2.5 cursor-pointer font-medium flex items-center gap-2.5 ${
                        darkMode ? "hover:bg-zinc-900 hover:text-white" : "hover:bg-gray-50 hover:text-zinc-900"
                      }`} onClick={() => { setShowPopup(false); navigate("/"); }}>
                        <HiOutlineViewGrid className="text-lg" />
                        Plus Dashboard
                      </li>
                      <li className={`px-4 py-2.5 cursor-pointer font-medium flex items-center gap-2.5 ${
                        darkMode ? "hover:bg-zinc-900 hover:text-white" : "hover:bg-gray-50 hover:text-zinc-900"
                      }`} onClick={() => { setShowPopup(false); navigate("/"); }}>
                        <HiOutlineCreditCard className="text-lg" />
                        Pricing
                      </li>
                    </div>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* CATEGORIES / SCROLLABLE BAR */}
      <div className={`w-full overflow-x-auto scrollbar-hide sticky top-24 z-40 transition-all duration-300 py-3 ${
        darkMode
          ? "bg-zinc-950/80 border-b border-zinc-900/60 backdrop-blur-md"
          : "bg-white/80 border-b border-gray-100/80 backdrop-blur-md"
      }`}>
        <div className='relative max-w-[1400px] mx-auto flex items-center justify-start md:justify-center gap-6 md:gap-8 px-4 md:px-6 w-full'>
          {categories.map((item, index) => {
            const isActive = activeCategory === index;
            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer min-w-fit transition-all duration-200 pb-2 pt-1 ${
                  isActive
                    ? (darkMode ? "text-white font-semibold" : "text-black font-semibold")
                    : (darkMode ? "text-zinc-500 hover:text-white" : "text-gray-500 hover:text-black")
                }`}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setActiveCategory(index)}
              >
                <div className={`text-[20px] md:text-[22px] transition-colors duration-200 ${
                  isActive 
                    ? (darkMode ? "text-white" : "text-black") 
                    : (darkMode ? "text-zinc-500 hover:text-zinc-300" : "text-gray-400 hover:text-black")
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
            className={`absolute bottom-0 h-[2px] transition-all duration-300 ease-out z-10 ${
              darkMode ? "bg-white" : "bg-black"
            }`}
            style={{
              left: `${lineStyle.left}px`,
              width: `${lineStyle.width}px`,
              opacity: lineStyle.opacity,
            }}
          />
        </div>
      </div>

      {/* STICKY BOTTOM NAVIGATION BAR FOR MOBILE */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 py-1.5 pb-2 md:hidden flex justify-around items-center transition-all duration-300 ${
        darkMode
          ? "bg-zinc-950/95 border-t border-zinc-900 text-zinc-400 shadow-[0_-4px_16px_rgba(0,0,0,0.6)]"
          : "bg-white border-t border-gray-100 text-gray-400 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
      }`}>
        <button
          className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors ${
            location.pathname === "/" ? "text-[#FF385C]" : (darkMode ? "text-zinc-400 hover:text-zinc-200" : "text-gray-400 hover:text-gray-600")
          }`}
          onClick={() => navigate("/")}
        >
          <FaSearch className='text-[18px]' />
          <span className='text-[10px] font-medium'>Explore</span>
        </button>

        <button
          className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors ${
            darkMode ? "text-zinc-400 hover:text-zinc-200" : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => alert("Wishlists coming soon!")}
        >
          <FaRegHeart className='text-[18px]' />
          <span className='text-[10px] font-medium'>Wishlists</span>
        </button>

        <button
          className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors ${
            darkMode ? "text-zinc-400 hover:text-zinc-200" : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => navigate("/")}
        >
          <FaAirbnb className='text-[20px]' />
          <span className='text-[10px] font-medium'>Trips</span>
        </button>

        <button
          className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors ${
            darkMode ? "text-zinc-400 hover:text-zinc-200" : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => alert("Inbox coming soon!")}
        >
          <FaRegCommentDots className='text-[18px]' />
          <span className='text-[10px] font-medium'>Inbox</span>
        </button>

        {user ? (
          <button
            className={`flex flex-col items-center justify-center gap-0.5 bg-transparent border-none outline-none cursor-pointer transition-colors ${
              darkMode ? "text-zinc-400 hover:text-zinc-200" : "text-gray-400 hover:text-gray-600"
            }`}
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
                : (darkMode ? "text-zinc-400 hover:text-zinc-200" : "text-gray-400 hover:text-gray-600")
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