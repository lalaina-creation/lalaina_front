import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '@/context/context';
import productsAPI from '@/API/products.api';

import { AiOutlineClose } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { HiTrash } from "react-icons/hi2";
import ProductForm from './forms/ProductForm';

const ProductInfos = ({product, handleClose}) => {

    const colorsDialog = useRef(null);
    const { isAuth } = useContext(Context)

    const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'TU'];
    const [ishovered, setIshovered] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [onEdit, setOnEdit] = useState(false);

    const [showingImage, setShowingImage] = useState(0);

     //click oustide colorsDialog to close
     useEffect(() => {
        const handleClickOutside = (e) => {
            if (colorsDialog.current && !colorsDialog.current.contains(e.target)) {
                setShowColors(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [colorsDialog]);

    const slideImageLeft = () => {
        if(showingImage === 0) {
            setShowingImage(product.images.length-1);
        } else {
            setShowingImage(showingImage-1);
        }
    }

    const slideImageRight = () => {
        if(showingImage === product.images.length-1) {
            setShowingImage(0);
        } else {
            setShowingImage(showingImage+1);
        }
    }

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        productsAPI.deleteProduct(token, product.id)
        .then(res => {
            if(res.status === 200) window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    const editProduct = () => {
        setOnEdit(true);
    }

    return (
        <div className='w-full h-full flex items-end pb-8 justify-center'>
            <div className="bg-gray-200 p-5 rounded-md w-5/6 xl:w-4/6 2xl:w-3/6 h-5/6 relative shadow-2xl items-center border-primary border-2 overflow-y-auto flex flex-col sm:flex md:flex-row lg-flex-row xl:flex-row justify-evenly">
            <AiOutlineClose size={30} className='absolute top-5 right-5 cursor-pointer' onClick={handleClose} />

            <div className='bg-gray-200 h-full w-full flex flex-col justify-center items-center'>
                <div className='relative h-[80%] flex w-full justify-center items-center flex-col'>
                    <div className='relative w-full h-full mx-auto' style={{ userSelect: 'none' }}>
                        <img 
                            src={product?.images[showingImage]? `${process.env.API_URL}/${product.images[showingImage]}` : ''}
                            alt='product' 
                            className='w-full object-contain h-full mx-auto mt-4'
                        />
                        {product?.images.length > 1 && (
                        <div className='absolute flex justify-between w-full top-[40%]'>
                            <FaChevronLeft size={30} className='hover:text-primary transition-colors cursor-pointer' 
                            onMouseEnter={()=>setIshovered(false)} 
                            onMouseLeave={()=> setIshovered(true)}
                            onClick={slideImageLeft} />

                            <FaChevronRight size={30} className='hover:text-primary transition-colors cursor-pointer'
                            onMouseEnter={()=>setIshovered(false)} 
                            onMouseLeave={()=> setIshovered(true)}
                            onClick={slideImageRight} />
                        </div>
                        )}
                    </div>
                    
                    <div className='relative w-full flex flex-col mt-4 cursor-pointer'>
                        <div className='text-center text-orange-500 flex justify-center mt-3' onClick={()=> setShowColors(true)}>
                            {/* <img src='https://cdn.iconscout.com/icon/free/png-256/free-color-palette-1594598-1348703.png' alt='color' className='w-8 h-8' /> */}
                            <div className={`rounded-full w-8 h-8 flex justify-center items-center border`} style={{backgroundColor: product.color}}>
                            </div>
                        </div>
                        {/* {showColors && <div className='absolute flex justify-center w-full h-[100px] z-50' ref={colorsDialog}>
                            <div className='bg-white border border-black w-full h-full mx-4'>
                            <div className='p-3 flex flex-wrap justify-around items-center w-full h-full'>
                                <div className={`rounded-full w-6 h-6 flex justify-center items-center border`} style={{backgroundColor: product.color}}>
                                </div>
                            </div>
                            </div>
                        </div>} */}
                    </div>
                </div>
            </div>

            <div className='w-fullh-full flex flex-col gap-4 items-center justify-center'>
                    <div className='flex flex-col gap-8 w-full items-center'>
                        <span className='font-bold text-center ml-2 first-letter:uppercase text-2xl'>{product.title} - {product.matter} </span>
                        <span className='text-center text-2xl font-bold text-primary'>{product.price} € </span>
                        {/* INFOS  */}
                        <div className='text-center'>
                            <span className='font-semibold text-center'>Description</span>
                            <div className='border bg-white border-black w-3/4 mx-auto text-center p-2 rounded-md'>
                                <div className='flex flex-col gap-1 text-center justify-center'>
                                    <span className='font-bold'>Infos: Col {product.col} - {product.threads} </span>
                                    <div>
                                        <p> {product.description} </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TAILLES  */}
                        <div className='mt-4 flex justify-center w-full h-[100px] mx-auto'>
                            <div className='bg-white w-full mx-4 border border-black justify-center text-center relative rounded-md'>
                                <div className='flex gap-3 justify-center items-center px-3 h-full w-full'>
                                    {sizeList.map((size, index) => (
                                        <div key={index} className={`${size == product.size? 'text-primary font-bold': 'text-gray-500 opacity-60'}`}>
                                            {size}
                                        </div>
                                    ))}
                                </div>
                                <div className='absolute bottom-2 text-sm text-primary font-semibold text-center w-full flex justify-center'>Disponibles</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center gap-6 mt-6 items-center'>
                        {product.hand_wash ? ( <img src="/assets/icons/hand_wash.png" alt="ironer" className="w-12 h-12" />): null}
                        {product.ironing ? ( <img src="/assets/icons/ironer.png" alt="hand_wash" className="w-12 h-12" />): null}
                    </div>

                    <div className='mt-6 flex items-center'>
                        Ajouter aux favoris
                        <FaStar size={30} className='ml-2' />
                    </div>

                    {isAuth && 
                    <button className='mt-6 flex items-center border border-black px-2 py-1 rounded-md hover:border-primary hover:text-primary' onClick={editProduct}>
                        Modifier
                    </button>}
            </div>
                {isAuth && <div className='absolute bottom-4 right-4'>
                    <HiTrash size={30} className='cursor-pointer text-red-600' onClick={() => setDeleteDialog(true)} />
                </div>}
                {isAuth && deleteDialog && <div className='absolute top-0 left-0 h-full w-full items-center flex justify-center backdrop-blur-[2px]'>
                    <div className='w-1/2 shadow-md shadow-black rounded-md bg-white p-4'>
                        <span className='text-lg font-semibold'>Êtes Vous sûr de vouloir supprimer cet article ?</span>
                        <div className='w-full flex justify-between mt-4'>
                            <span className='cursor-pointer font-semibold text-green-600' onClick={handleDelete} >Confirmer</span>
                            <span className='cursor-pointer font-semibold text-red-600' onClick={() => setDeleteDialog(false)} >Annuler</span>
                        </div>
                    </div>
                </div>}
                {onEdit &&
                <div className='absolute top-0 left-0 w-full h-full'>
                    <ProductForm productOnEdit={product} setOnEdit={setOnEdit} />
                </div>}
            </div>
        </div>
                
    );
}

export default ProductInfos;
