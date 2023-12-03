'use client'
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { FcExpand } from 'react-icons/fc';
import productsAPI from '@/API/products.api';
import ProductInfos from './ProductInfos';
import {Christmasloader } from './utilities/Loaders';

const ProductsTest = [
    {
        id: 1,
        category: 'Hommes',
        title: 'Pull',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        price: 50,
        color: 'red',
        matter: 'coton',
        col: 'V',
        threads: '2 fils',
        images: 'https://www.mahogany-cachemire.fr/img/articles/zoom/Cachemire-pull-homme-col-v-hippolyte-4f-vert-anglais-m--3612270080940.jpg',
        size: 'M',
    },
    {
        id: 2,
        category: 'Femmes',
        title: 'Pull',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        price: 50,
        color: 'red',
        matter: 'coton',
        col: 'V',
        threads: '2 fils',
        images: 'https://www.mahogany-cachemire.fr/img/articles/zoom/Cachemire-pull-homme-col-v-hippolyte-4f-vert-anglais-m--3612270080940.jpg',
        size: 'M',
    },
    {
        id: 3,
        category: 'Hommes',
        title: 'Pull',
        price: 50,
        color: 'red',
        matter: 'coton',
        col: 'V',
        threads: '2 fils',
        images: 'https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg',
        size: 'M',
    },
    {
        id: 4,
        category: 'Hommes',
        title: 'Pull',
        price: 50,
        color: 'red',
        matter: 'coton',
        col: 'V',
        threads: '2 fils',
        images: 'https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg',
        size: 'M',
    },
    {
        id: 5,
        category: 'Hommes',
        title: 'Pull',
        price: 50,
        color: 'red',
        matter: 'coton',
        col: 'V',
        threads: '2 fils',
        images: 'https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg',
        size: 'M',
    },
];
const Novelty = () => {

    const modal = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState({});
    const [showModal, setShowModal] = useState(false);

    const listCategories = ['Femmes', 'Hommes', 'Enfants', 'Accessoires'];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
        fetchproducts();
        }, 2000);
        console.log(products)
    }, []);

    const fetchproducts = async () => {
        setLoading(true);
        try {
            const res = await productsAPI.getProducts();
            console.log('res', res)
            setProducts(res);
            // setProducts(ProductsTest);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const infosProduct = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        console.log(product)
    }

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('dialog')) {
            setShowModal(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className='w-[70%] mx-auto '>
            
            {loading? (<Christmasloader />) : (
                <div className='mt-10 flex flex-col gap-10'>
                    
            {/* FEMMES  */}
            {listCategories?.map((list, index) => (
                <ProductList key={index} products={products} infosProduct={infosProduct} list={list} />
            ))}


            {/* Modal */}
            {showModal && (
             <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center dialog' onClick={handleOutsideClick}  >
                <ProductInfos product={selectedProduct} setShowModal={setShowModal} handleClose={handleClose} />
            </div>
            )}
            
        </div>
        )} 
        </div>
    );
}

const ProductList = ({products, infosProduct, list}) => {
    const [number, setNumber] = useState(4);

    useEffect(() => {
        setNumber(4);
    }
    , [products])

    const handleExpand = () => {
        if(number == products.length) setNumber(4);
        else setNumber(products.length);
    }

    return (
        <>
            <div>
                <div className='flex justify-between items-end' id={list}>
                    <h1 className='text-2xl font-semibold'>{list}</h1>
                    <div className='flex gap-2'>
                        {number == products?.length ? 
                        (<span className='text-xl p-1 cursor-pointer hover:opacity-70' onClick={handleExpand}>Voir moins</span>) 
                        : 
                        (<span className='text-xl p-1 cursor-pointer hover:opacity-70' onClick={handleExpand}>Voir plus</span>)}
                    </div>

                </div>

                <div className='flex flex-wrap items-center gap-6 justify-center '>
                    {/* Card */}
                    {products?.filter(p => p.category == list).slice(0, number).map((product, index) => (
                            <ProductCard key={product.id} product={product} infosProduct={infosProduct}  />
                    ))}
                </div>
            </div>
            <div className='border-b border-primary' />
        </>
    );
}

export default Novelty;
