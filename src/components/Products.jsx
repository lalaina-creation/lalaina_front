import React from 'react';
import Logo from '../assets/images/logo.png';
import Image from 'next/image';
import Navbar from './layouts/Navbar';
import Banner from './Banner';
import Novelty from './Novelty';
import Footer from './layouts/Footer';

const Products = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <Novelty />
            <Footer />
        </div>
    );
}

export default Products;
