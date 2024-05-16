'use client'
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import Logo from '../../assets/images/logo.png';
import { Context } from '../../context/context';
import { useRouter } from 'next/navigation';

import { FaBars, FaFacebook, FaInstagram, FaSearch, FaWindowClose } from 'react-icons/fa';
import { MdAccountCircle, MdOutlineLogout } from "react-icons/md";
import { FaShirt } from "react-icons/fa6";

const Navbar = () => {

  const { search, setSearch, isAuth, setIsAuth} = useContext(Context);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const login = () => {
    router.push('/sign-in')
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  }

  return (
    <nav className="fixed top-0 left-0 z-50 flex justify-evenly items-center bg-gray-200 w-full p-5">
      <div className="flex gap-4">
        <Image src={Logo} alt="Logo" width={120} height={120} />
        <div className="hidden rounded-md px-2 py-1 sm:flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md px-2 py-1 border border-primary w-72"
            type="text"
            placeholder="Rechercher"
          />
        </div>
      </div>
      <div className="hidden lg:flex gap-5 text-lg font-semibold -ml-32">
        <a href="#Femmes">
        <span className="hover:border-b-primary border cursor-pointer">
          Femmes
        </span>
        </a>
        <a href="#Hommes">
        <span className="hover:border-b-primary border cursor-pointer">
          Hommes
        </span>
        </a>
        <a href="#Enfants">
        <span className="hover:border-b-primary border cursor-pointer">
          Enfants
        </span>
        </a>
        <a href="#Accessoires">
        <span className="hover:border-b-primary border cursor-pointer">
          Accessoires
        </span>
        </a>
        <div className="ml-14 flex gap-2 items-center">

          <MdAccountCircle onClick={login} size={32} className="text-primary cursor-pointer" />
          {isAuth && <MdOutlineLogout size={30} className='text-primary cursor-pointer' onClick={logout} />}
          {isAuth && <FaShirt size={30} className='text-primary cursor-pointer ml-6' onClick={() => router.push('products/new')} />}
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 flex flex-col justify-center items-center bg-gray-200 p-4 z-50">
            <span className='text-3xl font-semibold text-primary absolute top-20 right-20 cursor-pointer' onClick={toggleMenu} > X </span>
          <div className='text-center w-full flex flex-col justify-center'>
            <div className="text-lg font-semibold mb-2 flex flex-col justify-center items-center">
              <Image src={Logo} alt="Logo" width={100} height={100} />
              <div className='flex items-center justify-center gap-3 ml-3 mt-2'>
                <MdAccountCircle onClick={login} size={34} className="text-primary cursor-pointer" />
                {isAuth && <MdOutlineLogout size={30} className='text-primary cursor-pointer' onClick={logout} />}
                {isAuth && <FaShirt size={30} className='text-primary cursor-pointer' onClick={() => router.push('products/new')} />}
              </div>
              
            </div>
            <div className='border border-black border-b-0 w-3/4 mx-auto my-6'/>

                <div className='flex flex-col gap-8'>
                    <a href="#" onClick={() => setMenuOpen(false)}>
                      <span className="block text-2xl hover:text-primary cursor-pointer">
                      Nouveautés
                      </span>
                    </a>
                    <a href="#Femmes" onClick={() => setMenuOpen(false)}>
                      <span className="block text-2xl hover:text-primary cursor-pointer">
                      Femmes
                      </span>
                    </a>
                    <a href="#Hommes" onClick={() => setMenuOpen(false)}>
                      <span className="block text-2xl hover:text-primary cursor-pointer">
                      Hommes
                      </span>
                    </a>
                    <a href="#Enfants" onClick={() => setMenuOpen(false)}>
                      <span className="block text-2xl hover:text-primary cursor-pointer">
                      Enfants
                      </span>
                    </a>
                    <a href="#Accessoires" onClick={() => setMenuOpen(false)}>
                      <span className="block text-2xl hover:text-primary cursor-pointer">
                      Accessoires
                      </span>
                    </a>
                </div>

            <div className='border border-black border-b-0 w-3/4 mx-auto my-6'/>

            <div className="flex gap-4 mt-4 justify-center items-center">
              <FaInstagram className="text-2xl text-primary cursor-pointer" />
              <FaFacebook className="text-2xl text-primary cursor-pointer" />
            </div>
            
          </div>
        </div>
      )}
      <div className="lg:hidden">
        <button
          className="text-2xl text-primary"
          onClick={toggleMenu}
        >
         {!menuOpen? <FaBars />: <FaWindowClose /> } 
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

