import React from 'react';
import Logo from '../../assets/images/logo.png';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='mt-10 w-full bg-gray-200'>
            <div className='p-4 flex justify-evenly'>
                <Image src={Logo} alt="Logo" width={100} height={100} />

                <div className='flex flex-col text-center'>
                    <span>Contact</span>
                    <span>lalaina.creation@gmail.com</span>
                </div>
                <div className='flex items-center gap-2'>
                    <FaInstagram size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' />
                    <FaFacebook size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' />
                    <FaTwitter size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
