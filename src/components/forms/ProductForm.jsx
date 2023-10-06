'use client'
import productsAPI from '@/API/products.api';
import categoriesAPI from '@/API/categories.api';
import attributesAPi from '@/API/attributes.api';
import React, { useEffect, useState } from 'react';

const ProductForm = () => {
    
    const genderList = ['Hommes', 'Femmes', 'Garçons', 'Filles', 'Tous'];
    const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
        image_url: '',
        category: '',
        attributes: [],
        gender: genderList[0],
        sizes: [],
    });

    useEffect(() => {
        fetchCategories();
        fetchTypes();
    }, []);


    const fetchCategories = () => {
        categoriesAPI.getCategories()
        .then(res => {
            console.table(res);
                setCategories(res);
                setProduct({...product, category: res[0].category_name});
        })
        .catch(err => {
            console.log(err);
        })
    }

    const fetchTypes = () => {
        attributesAPi.getAttributes()
        .then(res => {
            console.table(res);
                setTypes(res);
                // setProduct({...product, attributes: res[0].attribute_name});
        })
        .catch(err => {
            console.log(err);
        })
    }


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
            setProduct({ ...product, image_url: file }); // Set the file object
          }
        };
      
        input.click();
      };


      const handleSelectType = (e) => {
        const type = e.target.value;
        const index = product.attributes.indexOf(type);
        if(index === -1) {
            setProduct({...product, attributes: [...product.attributes, type]});
        } else {
            const newAttributes = product.attributes.filter(attribute => attribute !== type);
            setProduct({...product, attributes: newAttributes});
        }
        console.log(product.attributes);
    }

    const handleSelectSizes = (e) => {
        const size = e.target.textContent;
        const index = product.sizes.indexOf(size);
        if(index === -1) {
            setProduct({...product, sizes: [...product.sizes, size]});
        } else {
            const newSizes = product.sizes.filter(s => s !== size);
            setProduct({...product, sizes: newSizes});
        }
        console.log(product.sizes);
    }


      const saveProduct = () => {
        console.log(product);
        
        const form = new FormData();
        form.append('title', product.title);
        form.append('description', product.description);
        form.append('price', product.price);
        form.append('image', product.image_url); // Use 'file' as the field name for the image
        form.append('category', product.category);
        form.append('attributes', product.attributes);
        form.append('gender', product.gender);
        form.append('sizes', product.sizes);
        
        productsAPI.addProduct(form)
        .then(res => {
            if(res.status === 201) {
                setProduct({
                    title: '',
                    description: '',
                    price: 0,
                    image_url: '',
                    category: '',
                    attributes: [],
                    gender: genderList[0],
                    sizes: [],
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
                        <img src={product.image_url? URL.createObjectURL(product.image_url) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkatl3eMWf4EbSUD4U3ToV_8dnyFRi0kv4QFHn0Ku-Js3P2kH9jHlFp77E7XfdY99yYdI&usqp=CAU' } 
                        alt='product' 
                        className='w-full h-full rounded-md border  object-contain cursor-pointer' 
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
                            <label htmlFor='category'>Categorie</label>
                            <select name='category' id='category' onChange={handleChange}>
                               {categories?.map((categorie, index) => (
                                     <option key={index} value={categorie.category_name}>{categorie.category_name}</option>
                               ))}
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='attributes'>Types</label>
                            <select name='attributes' id='attributes' multiple className='h-52 rounded-md p-1'>
                               {types?.map((type, index) => (
                                     <option  
                                     className={`${product.attributes.includes(type.attribute_name) && 'bg-primary rounded-md'} cursor-pointer mx-1 py-[1px] my-2 text-center font-bold border-b-2`}
                                      key={index} value={type.attribute_name} 
                                      onClick={handleSelectType}>
                                        {type.attribute_name}
                                      </option>
                               ))}
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='gender'>Genre</label>
                            <select name='gender' id='gender' onChange={handleChange}>
                               {genderList.map((gender, index) => (
                                     <option key={index} value={gender}>{gender}</option>
                               ))}
                            </select>
                        </div>

                        <div className='flex justify-center gap-2'>
                            {sizeList.map((size, index) => (
                                <div 
                                className={`rounded-full items-center flex justify-center p-1 cursor-pointer ${product.sizes.includes(size)? 'bg-secondary': 'bg-gray-200'}`}
                                onClick={handleSelectSizes}>
                                    {size} 
                                </div>
                            ))}
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
