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

    return (
        <div className='bg-gray-200 p-5 rounded-md w-5/6 h-5/6 relative shadow-2xl border-primary border-2 flex justify-between'>
           <AiOutlineClose size={30} className='absolute top-5 right-5 cursor-pointer' onClick={handleClose} />

           <div className='bg-gray-200 w-1/2 h-full flex flex-col'>
            <div className='relative h-[80%] flex justify-center items-center flex-col'>
                <div className='relative w-full h-full mx-auto'>
                    <img 
                        src={product?.images[0]? `${process.env.API_URL}/${product.images[0]}` : 'https://www.mahogany-cachemire.fr/img/articles/zoom/Cachemire-pull-homme-col-v-hippolyte-4f-vert-anglais-m--3612270080940.jpg'}
                        alt='product' 
                        className='w-full object-contain h-full mx-auto'
                    />
                    <div className='absolute flex justify-between w-full top-[40%] text-primary'>
                        <FaChevronLeft size={30} className='hover:text-primary transition-colors cursor-pointer' 
                        onMouseEnter={()=>setIshovered(false)} 
                        onMouseLeave={()=> setIshovered(true)} />

                        <FaChevronRight size={30} className='hover:text-primary transition-colors cursor-pointer'
                        onMouseEnter={()=>setIshovered(false)} 
                        onMouseLeave={()=> setIshovered(true)} />
                    </div>
                </div>
                
                <div className='relative w-full flex flex-col mt-4 cursor-pointer'>
                    <span className='text-center' onClick={()=> setShowColors(true)}>Couleurs</span>
                    {showColors && <div className='absolute flex justify-center w-full h-[100px] z-50' ref={colorsDialog}>
                        <div className='bg-white border border-black w-full h-full mx-4'>
                            <div className='p-3 flex flex-wrap justify-around w-full h-full'>
                                {listColors.map((color, index) => (
                                    <div key={index} className='w-5 h-5 rounded-full bg-black border m-1' style={{backgroundColor: color}}></div>
                                ))}
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
                    <span className='font-semibold text-center'>Description</span>

                    {/* INFOS  */}
                    <div className='border bg-white border-black w-3/4 mx-auto text-center'>
                        <div className='flex flex-col gap-1 text-center justify-center'>
                            <span className='font-bold'>Infos: Col {product.col} - {product.threads} </span>
                            <div>
                                <span className='underline'>Texte:</span>
                                <p> {product.description} </p>
                            </div>
                        </div>
                    </div>

                    {/* TAILLES  */}
                    <div className='mt-4 flex justify-center w-2/3 h-[100px] mx-auto'>
                        <div className='bg-white w-full mx-4 border border-black justify-center text-center relative'>
                            <div className='flex gap-3 justify-center items-center mx-3 h-full'>
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
                
    );
}

export default ProductInfos;
