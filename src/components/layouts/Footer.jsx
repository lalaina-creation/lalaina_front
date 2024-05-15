import React from 'react';
import Logo from '../../assets/images/logo.png';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='mt-10 w-full bg-gray-200 h-32 flex items-center justify-center'>
            <div className='p-4 flex justify-evenly items-center w-full'>
                <Image src={Logo} alt="Logo" width={100} height={100} />

                <div className='flex flex-col text-center'>
                    <span className='font-semibold'>Contact</span>
                    <span>lalaina.creation@gmail.com</span>
                    <span>+33 6 27 49 77 00</span>
                </div>
                <div className='flex items-center gap-2'>
                    <a href="https://www.instagram.com/lalainacreation?igsh=MXhrc3E3N210dGFsZg=="><FaInstagram size={32} className='text-2xl text-primary border border-primary rounded-md p-1 cursor-pointer hover:opacity-70' /> </a>
                    <a href="https://www.facebook.com/share/x8vC63PuQyerBBUj/"><FaFacebook size={32} className='text-2xl text-primary border border-primary rounded-md p-1 cursor-pointer hover:opacity-70' /> </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
