import React, { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus, AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 
import NewBlogModal from './NewBlogModal';
import { db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; 
import {auth} from "../firebase"


const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const Navbar = ({scrollToBlog, scrollToNewsletter}) => {
  const { user } = useUser(); 
  const [userData, setUserData] = useState(null);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAvatarMenuOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    
    const fetchUserData = async () => {
      if (user?.uid) { 
        const userDoc = doc(db, 'users', user.uid); 
        console.log(userDoc)
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          
          setUserData(userSnapshot.data());
        } else {
          console.log("No such user!");
        }
      }
    };
  
    fetchUserData();
    
  
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [user]);
  

  const handleNewBlogClick = () => {
    setBlogToEdit(blogToEdit);
    setModalOpen(true);
    setMobileNavOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate('/'); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <section className="relative bg-black overflow-visible">
      <nav className="relative flex px-16 py-8 lg:py-0 justify-between bg-transparent border-b">
        <div className="pr-14 flex items-center">
          <Link to="/" className="inline-block text-xl text-white font-medium font-heading">
            <h1 className='text-[#ccff00] text-3xl font-bold'>Dexter</h1>
          </Link>
        </div>

       
       
        <div className="hidden lg:block ml-auto mr-10 py-8">
          <ul className="flex items-center">

          <li className="mr-12"><Link to="/dashboard" className="text-gray-500 hover:text-gray-400">Home</Link></li>
            <li className="mr-12"><Link to="/aboutus" className="text-gray-500 hover:text-gray-400">About</Link></li>
            <li className="mr-12"><Link to="/allblogs" className="text-gray-500 hover:text-gray-400">Blogs</Link></li>
            <li className="mr-12">
              <Link onClick={scrollToBlog} className="text-gray-500 hover:text-gray-400">Latest</Link>
            </li>
            <li><Link onClick={scrollToNewsletter} className="text-gray-500 hover:text-gray-400">Newsletter</Link></li>
          </ul>
        </div>

        <div className="hidden lg:flex items-center">
          <button
            onClick={handleNewBlogClick}
            className="inline-flex items-center justify-center py-2 px-4 gap-2 rounded-3xl bg-[#ccff00] hover:bg-white transform hover:scale-105 duration-200 cursor-pointer mr-4"
          >
            <AiOutlinePlus className="text-black" />
            <h1 className='text-black'>New Blog</h1>
          </button>
        </div>
        


        <div className="hidden lg:block absolute top-6 right-5" ref={avatarRef}>
          <div
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <img 
              src={userData?.profileImage || defaultAvatar}
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#ccff00]"
            />
            {console.log(userData)}
          </div>

          
          {avatarMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900">{userData?.username|| "User"}</p>
                  <p className="text-sm text-gray-500">{userData?.email || ""}</p>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 text-sm bg-transparent text-gray-700 hover:bg-red-500 hover:text-white flex items-center"
                >
                  <AiOutlineLogout className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>


       
        <div className="lg:hidden">
          <button 
            onClick={() => setMobileNavOpen(!mobileNavOpen)} 
            className="self-center bg-transparent hover:bg-transparent hover:text-green-400"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="6" width="24" height="2" fill="white"></rect>
              <rect y="11" width="24" height="2" fill="white"></rect>
              <rect y="16" width="24" height="2" fill="white"></rect>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`${mobileNavOpen ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50`}>
        <div onClick={() => setMobileNavOpen(false)} className="fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="relative flex flex-col py-8 px-10 w-full h-full bg-[#3436353b] backdrop-blur-xl overflow-y-auto">
        
          <div className="flex items-center mb-8">
            <img
              src={userData?.profileImage || defaultAvatar}
              alt="User avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#ccff00]"
            />
            <div className="ml-4">
              <p className="text-white font-medium">{userData?.username || "User"}</p>
              <p className="text-gray-400 text-sm">{userData?.email || ""}</p>
            </div>
          </div>

          <Link to="/" className="inline-block text-xl text-white font-medium font-heading mb-16">
            <h1 className='text-[#ccff00] text-3xl font-bold'>Dexter</h1>
          </Link>

          <ul className="mb-8">

          <li className="mb-6">
              <Link to="/dashboard" className="text-white hover:text-gray-400">Home</Link>
            </li>
            <li className="mb-6">
              <Link to="/aboutus" className="text-white hover:text-gray-400">About</Link>
            </li>
            <li className="mb-6">
              <Link to="/allblogs" className="text-white hover:text-gray-400">Blogs</Link>
            </li>
            <li className="mb-6">
              <Link onClick={() => {
                scrollToBlog();
                setMobileNavOpen(false);
                
              }} className="text-white hover:text-gray-400">Latest</Link>
            </li>
            <li className="mb-6">
              <Link onClick={() => {
                scrollToNewsletter();
                setMobileNavOpen(false);
              }} className="text-white hover:text-gray-400">Newsletter</Link>
            </li>
          </ul>

          <button
            onClick={handleNewBlogClick}
            className="inline-flex items-center justify-center py-3 px-6 rounded-full bg-[#ccff00] hover:bg-white transform hover:scale-105 duration-200 cursor-pointer mb-4"
          >
            <div className="flex items-center gap-1 text-xl font-medium tracking-wider text-black hover:text-black">
              <AiOutlinePlus className="text-black" />
              New Blog
            </div>
          </button>

          <button
            onClick={handleLogoutClick}
            className="inline-flex items-center justify-center py-3 px-6 rounded-full bg-red-600 hover:bg-red-500 transform hover:scale-105 duration-200 cursor-pointer"
          >
            <span className="flex items-center gap-2 text-xl font-medium tracking-wider text-white hover:text-white">
              <AiOutlineLogout className="text-white" />
              Logout
            </span>
          </button>
        </nav>
      </div>

      <NewBlogModal isOpen={modalOpen} onClose={() => setModalOpen(false)} blogToEdit={blogToEdit} />
    </section>
  );
};

export default Navbar;