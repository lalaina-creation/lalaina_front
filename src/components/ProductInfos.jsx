import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight, FaHandsWash, FaStar, FaWater } from 'react-icons/fa';

const ProductInfos = ({product, handleClose}) => {

    const colorsDialog = useRef(null);

    const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'TU'];
    const listColors = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'gray', 'purple', 'purple', 'pink', 'orange', 'brown', 'beige', 'cyan', 'magenta', 'red'];
    const [ishovered, setIshovered] = useState(false);
    const [showColors, setShowColors] = useState(false);

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

    return (
        <div className='w-full h-full flex items-end pb-8 justify-center'>
        <div className='bg-gray-200 p-5 rounded-md w-5/6 xl:w-4/6 2xl:w-3/6 h-5/6 relative shadow-2xl items-center border-primary border-2 overflow-y-auto flex flex-col sm:flex md:flex-row lg-flex-row xl:flex-row justify-evenly'>
           <AiOutlineClose size={30} className='absolute top-5 right-5 cursor-pointer' onClick={handleClose} />

           <div className='bg-gray-200 h-full w-full flex flex-col items-center'>
            <div className='relative h-[80%] flex w-full justify-center items-center flex-col'>
                <div className='relative w-full h-full mx-auto' style={{ userSelect: 'none' }}>
                    <img 
                        src={product?.images[showingImage]? `${process.env.API_URL}/${product.images[showingImage]}` : 'https://www.mahogany-cachemire.fr/img/articles/zoom/Cachemire-pull-homme-col-v-hippolyte-4f-vert-anglais-m--3612270080940.jpg'}
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
                    <div className='text-center text-orange-500 flex justify-center' onClick={()=> setShowColors(true)}>
                        <img src='https://cdn.iconscout.com/icon/free/png-256/free-color-palette-1594598-1348703.png' alt='color' className='w-8 h-8' />
                    </div>
                    {showColors && <div className='absolute flex justify-center w-full h-[100px] z-50' ref={colorsDialog}>
                        <div className='bg-white border border-black w-full h-full mx-4'>
                        <div className='p-3 flex flex-wrap justify-around items-center w-full h-full'>
                            <div className={`rounded-full w-6 h-6 flex justify-center items-center border`} style={{backgroundColor: product.color}}>
                            </div>
                        </div>
                        </div>
                    </div>}
                </div>
            </div>
           </div>

           <div className='w-1/2 h-full flex flex-col gap-4 items-center justify-center'>
                <div className='flex flex-col gap-8 w-full items-center'>
                    <span className='font-bold text-center ml-2 first-letter:uppercase text-2xl'>{product.title} - {product.matter} </span>
                    <span className='text-center text-2xl font-bold text-primary'>{product.price} € </span>
                    {/* INFOS  */}
                    <div className='text-center'>
                        <span className='font-semibold text-center'>Description</span>
                        <div className='border bg-white border-black w-3/4 mx-auto text-center'>
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
                        <div className='bg-white w-full mx-4 border border-black justify-center text-center relative'>
                            <div className='flex gap-3 justify-center items-center px-3 h-full w-full'>
                                {sizeList.map((size, index) => (
                                    <div key={index} className={`${index <=4? 'text-primary font-bold': 'text-gray-500 opacity-60'}`}>
                                        {size}
                                    </div>
                                ))}
                            </div>
                            <div className='absolute bottom-2 text-sm text-primary font-semibold text-center w-full flex justify-center'>Disponibles</div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center gap-6 mt-6'>
                    <FaWater size={40} />
                    <FaHandsWash size={40} />                   
                </div>

                <div className='mt-6 flex items-center'>
                    Ajouter aux favoris
                    <FaStar size={30} className='ml-2' />
                </div>
 
      
           </div>
        </div>
        </div>
                
    );
}

export default ProductInfos;
