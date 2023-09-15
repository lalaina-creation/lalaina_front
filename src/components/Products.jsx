import React from 'react';
import Logo from '../assets/images/logo.png';
import Image from 'next/image';
import Navbar from './layouts/Navbar';
import Banner from './Banner';
import Novelty from './Novelty';

const Products = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <Novelty />
            
        </div>
    );
}

export default Products;
