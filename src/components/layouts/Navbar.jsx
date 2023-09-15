'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { FaBars, FaCross, FaFacebook, FaInstagram, FaSearch, FaWindowClose } from 'react-icons/fa';
import Logo from '../../assets/images/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-evenly items-center bg-gray-200 w-full p-5">
      <div className="flex gap-4">
        <Image src={Logo} alt="Logo" width={120} height={120} />
        <div className="hidden rounded-md px-2 py-1 sm:flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            className="rounded-md px-2 py-1 border border-primary"
            type="text"
            placeholder="Rechercher"
          />
        </div>
      </div>
      <div className="hidden lg:flex gap-5 text-lg font-semibold">
        <span className="hover:border-b-primary border cursor-pointer">
          Femmes
        </span>
        <span className="hover:border-b-primary border cursor-pointer">
          Hommes
        </span>
        <span className="hover:border-b-primary border cursor-pointer">
          Enfants
        </span>
        <div className="ml-10 flex gap-4">
          <FaInstagram className="text-2xl text-primary" />
          <FaFacebook className="text-2xl text-primary" />
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 flex flex-col justify-center items-center bg-gray-200 p-4 ">
            <span className='text-3xl font-semibold text-primary absolute top-20 right-20 cursor-pointer' onClick={toggleMenu} > X </span>
          <div className='text-center w-full flex flex-col justify-center'>
            <span className="text-lg font-semibold mb-2 flex justify-center">
              <Image src={Logo} alt="Logo" width={100} height={100} />
            </span>
            <div className='border border-black border-b-0 w-3/4 mx-auto my-6'/>

                <div className='flex flex-col gap-8'>
                    <span className="block text-2xl hover:text-primary cursor-pointer">
                    Nouveautés
                    </span>
                    <span className="block text-2xl hover:text-primary cursor-pointer">
                    Femmes
                    </span>
                    <span className="block text-2xl hover:text-primary cursor-pointer">
                    Hommes
                    </span>
                    <span className="block text-2xl hover:text-primary cursor-pointer">
                    Enfants
                    </span>
                </div>

            <div className='border border-black border-b-0 w-3/4 mx-auto my-6'/>

            <div className="flex gap-4 mt-4 justify-center">
              <FaInstagram className="text-2xl text-primary" />
              <FaFacebook className="text-2xl text-primary" />
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

