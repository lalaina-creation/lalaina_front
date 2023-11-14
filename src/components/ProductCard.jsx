import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Tags } from './utilities/Elements';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';




const ProductCard = ({product, infosProduct}) => {

    const colorsDialog = useRef(null);

    const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'TU'];
    const listColors = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'gray', 'purple', 'purple', 'pink', 'orange', 'brown', 'beige', 'cyan', 'magenta', 'red'];
    const [ishovered, setIshovered] = useState(false);
    const [showColors, setShowColors] = useState(false);

    // const router = useRouter();
    
    useEffect(() => {
        console.log(product);
    }, [product]);

    const seeProduct = () => {
        infosProduct(product);
        // router.push(`/products/${product.id}`);
    }

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
        <div className='flex flex-col h-[500px] rounded-md transition-all cursor-pointer border border-black bg-gray-200 items-center' >
            <div className='items-center relative w-[300px]' 
            onMouseEnter={()=>setIshovered(true)} 
            onMouseLeave={()=> setIshovered(false)} 
            >
                <img 
                    src={product?.image_url? `${process.env.API_URL}/${product.image_url}` : 'https://www.mahogany-cachemire.fr/img/articles/zoom/Cachemire-pull-homme-col-v-hippolyte-4f-vert-anglais-m--3612270080940.jpg'}
                    alt='product' 
                    className='w-full object-cover h-[380px] mx-auto'
                    onClick={seeProduct}
                />
                {/* <img src={product?.image_url? `${process.env.API_URL}/${product.image_url}` : 'https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg'} alt='product' className='w-full h-full rounded-t-xl' /> */}
                <div className='absolute flex justify-between w-full top-[50%]'>
                    <FaChevronLeft size={30} className='hover:text-primary transition-colors cursor-pointer' 
                    onMouseEnter={()=>setIshovered(false)} 
                    onMouseLeave={()=> setIshovered(true)} />

                    <FaChevronRight size={30} className='hover:text-primary transition-colors cursor-pointer'
                    onMouseEnter={()=>setIshovered(false)} 
                    onMouseLeave={()=> setIshovered(true)} />
                </div>
                {ishovered && <div className='absolute bottom-2 flex justify-center w-full h-[100px]'>
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
                </div>}
            </div>
            <div className='flex flex-col p-2 '>
                    <span className='text-lg font-bold text-center ml-2 first-letter:uppercase'>{product?.title} - {product?.matter}</span>
                    <span className='text-center text-2xl font-bold text-primary'>{product.price} € </span>
                </div>
                    <div className='relative w-full flex flex-col'>
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
                <div>
            </div>
        </div>
    );
}

export default ProductCard;
