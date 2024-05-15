import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const ProductCard = ({product, infosProduct}) => {

    const colorsDialog = useRef(null);

    const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'TU'];
    const [ishovered, setIshovered] = useState(false);
    const [showColors, setShowColors] = useState(false);

    const [showingImage, setShowingImage] = useState(0);


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
        <div className='flex flex-col h-[440px] rounded-md transition-all cursor-pointer border  bg-gray-200 items-center shadow-xl shadow-gray-400 hover:scale-105' >
            <div className='items-center relative w-[260px]' 
            onMouseEnter={()=>setIshovered(true)} 
            onMouseLeave={()=> setIshovered(false)} 
            style={{ userSelect: 'none' }}
            >
                <img 
                    src={product?.images[showingImage]? `${process.env.API_URL}/${product.images[showingImage]}` : 'https://www.mahogany-cachemire.fr/img/articles/zoom/Cachemire-pull-homme-col-v-hippolyte-4f-vert-anglais-m--3612270080940.jpg'}
                    alt='product' 
                    className='w-full object-cover h-[320px] mx-auto rounded-t-md'
                    onClick={seeProduct}
                />
                {product?.images.length > 1 && (
                <div className='absolute flex justify-between w-full top-[50%]'>
                    <FaChevronLeft size={30} className='hover:text-primary transition-colors cursor-pointer' 
                    onMouseEnter={()=>setIshovered(false)} 
                    onMouseLeave={()=> setIshovered(true)} 
                    onClick={slideImageLeft}
                    />

                    <FaChevronRight size={30} className='hover:text-primary transition-colors cursor-pointer'
                    onMouseEnter={()=>setIshovered(false)} 
                    onMouseLeave={()=> setIshovered(true)} 
                    onClick={slideImageRight}
                    />
                    
                </div>
                )}
                {ishovered && <div className='absolute bottom-2 flex justify-center w-full h-[100px]'>
                    <div className='bg-white w-full mx-4 border border-black justify-center text-center relative'>
                        <div className='flex gap-3 justify-center items-center mx-3 h-full'>
                            {sizeList.map((size, index) => (
                                <div key={index} className={`${size == product.size? 'text-primary font-bold': 'text-gray-500 opacity-60'}`}>
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
                        <div className='text-center text-orange-500 flex justify-center' onClick={()=> setShowColors(true)}>
                            {/* <img src='https://cdn.iconscout.com/icon/free/png-256/free-color-palette-1594598-1348703.png' alt='color' className='w-8 h-8' /> */}
                            <div className={`rounded-full w-7 h-7 flex justify-center items-center border`} style={{backgroundColor: product.color}}>
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
                <div>
            </div>
        </div>
    );
}

export default ProductCard;
