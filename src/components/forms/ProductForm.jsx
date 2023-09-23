'use client'
import productsAPI from '@/API/products.api';
import React, { useState } from 'react';

const ProductForm = () => {
    
    const categories = ['Cachemire', 'Pyjamas', 'Robes'];

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
        image: '',
        category: categories[0],
        // size: 0
    });


    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    }

    const importImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
      
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            setProduct({ ...product, image: file }); // Set the file object
          }
        };
      
        input.click();
      };

      const saveProduct = () => {
        console.log(product);
        
        const form = new FormData();
        form.append('title', product.title);
        form.append('description', product.description);
        form.append('price', product.price);
        form.append('image', product.image); // Use 'file' as the field name for the image
        form.append('category', product.category);
        
        productsAPI.addProduct(form)
        .then(res => {
            if(res.status === 201) {
                setProduct({
                    title: '',
                    description: '',
                    price: 0,
                    image: '',
                    category: categories[0],
                    // size: 0
                });
            }
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div className='inset-0 fixed top-0 left-0 flex justify-center items-center lg:w-2/3 w-5/6 mx-auto '>
            <div className='bg-primary rounded-md p-4 shadow-lg'>
                <h1 className='font-bold text-2xl text-center text-white underline'>Ajouter un article</h1>
                <div className='mt-4 grid grid-cols-2 gap-4'>
                        {/* IMAGE  */}
                    <div className='flex justify-center'>
                        <img src={product.image? URL.createObjectURL(product.image) : 'https://picsum.photos/200/300' } 
                        alt='product' 
                        className='w-full h-full rounded-md object-contain cursor-pointer' 
                        onClick={importImage} />
                        
                    </div>
                        
                        {/* FORMULAIRE  */}
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='title' className='text-center'>Nom de l'article</label>
                            <input type='text' name='title' id='title'
                            className='rounded-md bg-white px-2 outline-none h-12'
                            placeholder="Nom de l'article..." 
                            value={product.title}
                            onChange={handleChange} 
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='description'>Description</label>
                            <textarea type='text' name='description' id='description' 
                                placeholder="Description de l'article..."
                                className='min-h-[60px] h-fit w-full px-2 rounded-md'
                                value={product.description}
                                onChange={handleChange}/>
                        </div>

                        <div className='flex gap-2'>
                            <input type='number' name='price' id='price' min={0} 
                            className={`min-w-[10px] px-1 rounded-md text-center`}
                            style={{width: `${product.price.toString().length * 20}px`, minWidth: '30px'}} 
                            value={product.price} 
                            onChange={handleChange} /> €
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='category'>Catégorie</label>
                            <select name='category' id='category' onChange={handleChange}>
                               {categories.map((category, index) => (
                                     <option key={index} value={category}>{category}</option>
                               ))}
                            </select>
                        </div>

                    </div>
                </div>

                    <div className='flex justify-center mt-8'>
                        <button className='bg-white rounded-md px-4 py-2 text-primary font-bold' onClick={saveProduct}>Enregistrer</button>
                    </div>
            </div>
        </div>
    );
}

export default ProductForm;
