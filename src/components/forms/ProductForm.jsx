'use client'
import React, { useEffect, useState } from 'react';

import colsListAPI from '@/API/colsList.api';
import productsAPI from '@/API/products.api';
import mattersListAPI from '@/API/mattersList.api';
import productsListAPI from '@/API/productsList.api';

import ListBox from '@/components/utilities/ListBox';


const ProductForm = () => {
    
    const categoriesList = [
        {id: 1, title: 'Hommes'},
        {id: 2, title: 'Femmes'},
        {id: 3, title: 'Enfants'},
        {id: 4, title: 'Accessoires'} 
    ];
    const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'TU'];
    const threadsList = ['2 fils', '3 fils', '4 fils', '12 fils']
    const washList = [
        {
            title: "Lavage à la main",
            icon: ""
        },
        {
            title: "Repassage interdit",
            icon: ""
        }

    ]


    const [images, setImages] = useState([]);

    const [colsList, setColsList] = useState([]);
    const [mattersList, setMattersList] = useState([]);
    const [productsList, setProductsList] = useState([]);

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState({type: '', content: ''});

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
        images: [],
        category: '',
        matter: '',
        col: '',
        threads: '',
        size: '',
        color: '',
        stock_quantity: 1,
        hand_wash: false,
        ironing: false
    });

    useEffect(() => {
        fetchColsList();
        fetchMattersList();
        fetchProductsList();
    }, []);


    const fetchColsList = () => {
       colsListAPI.getColsList()
         .then(res => {
            setColsList(res);
         })
        .catch(err => {
            console.log(err);
        })
    }

    const fetchMattersList = () => {
        mattersListAPI.getMattersList()
            .then(res => {
                 setMattersList(res);
            })
             .catch(err => {
                 console.log(err);
             })
    }

    const fetchProductsList = () => {
        productsListAPI.getProductsList()
            .then(res => {
                setProductsList(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    //NEW
    const handleFileChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
    }


    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
        console.log(product)
    }

      const saveProduct = () => {
        setLoader(true);
        product.images = images;
        const form = new FormData();
        
        form.append('title', product.title);
        form.append('description', product.description);
        form.append('price', product.price);
        form.append('category', product.category);
        form.append('matter', product.matter);
        form.append('col', product.col);
        form.append('threads', product.threads);
        form.append('size', product.size);
        form.append('color', product.color);
        form.append('stock_quantity', product.stock_quantity);
        form.append('hand_wash', product.hand_wash);
        form.append('ironing', product.ironing);
        images.forEach((image) => {
            form.append('images', image);
        });

        const token = localStorage.getItem('token');
        console.log(product)
        productsAPI.addProduct(token, form)
        .then(res => {
            console.log('produit ajouté:' , res)
            if(res.status === 201) {
                setLoader(false);
                setMessage({type: 'success', content: 'Produit enregistré avec succès'});
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
            setLoader(false);
            setMessage({type: 'error', content: 'Erreur lors de l\'enregistrement'});
        })
    }

    const handleSelectProduct = (e) => {
        if(!e?.title) return;
        setProduct({...product, title: e.title});
    }
    const handleSelectCategory = (e) => {
        if(!e?.title) return;
        setProduct({...product, category: e.title});
    }
    const handleSelectMatter = (e) => {
        if(!e?.title) return;
        setProduct({...product, matter: e.title});
    }
    const handleSelectCol = (e) => {
        if(!e?.title) return;
        setProduct({...product, col: e.title});
    }




    return (
        <div className='inset-0 fixed top-0 left-0 flex justify-center items-center lg:w-2/3 w-5/6 mx-auto '>
            <div className='bg-primary rounded-md p-6 shadow-lg max-h-screen h-[94%] overflow-auto'>
                <h1 className='font-bold text-2xl text-center text-white underline'>Ajouter un article</h1>
                <div className='mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
                        {/* IMAGE  */}
                    <div className='flex justify-center flex-col'>
                        {images.length > 0? (
                            <div className={`w-full h-full rounded-md border grid ${images.length!=1? 'grid-cols-2': ' grid-cols-1'}`}>
                                {images.map((image, index) => (
                                    <img key={index} src={URL.createObjectURL(image)} alt='product' 
                                    className={`rounded-md border object-contain cursor-pointer w-full h-full`} 
                                     />
                                ))}
                            </div>
                        ):
                        (
                        <img src='https://st3.depositphotos.com/23594922/31822/v/1600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg' 
                            alt='product' 
                            className='w-full h-full rounded-md border object-contain cursor-pointer' 
                             /> 
                        )}
                        
                        <div className='flex justify-center mt-4'>
                            <input
                            type="file"
                            id="imageUpload"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            />
                        </div>
                    </div>
                   
                    

                        {/* FORMULAIRE  */}
                    <div className='flex flex-col gap-4'>

                        {/* Categorie  */}
                        <div className='flex flex-col'>
                            <label htmlFor='category' className='text-left font-semibold'>Categorie: </label>
                            <ListBox list={categoriesList} handleSelect={handleSelectCategory} />
                        </div>

                        {/* NAME  */}
                        <div className='flex flex-col'>
                            <label htmlFor='title' className='text-left font-semibold'>Type d&apos;article: </label>
                            <ListBox list={productsList} handleSelect={handleSelectProduct} />
                        </div>

                        {/* MATIERE  */}
                        <div className='flex flex-col'>
                            <label htmlFor='matter' className='text-left font-semibold'>Matière: </label>
                            <ListBox list={mattersList} handleSelect={handleSelectMatter} />
                        </div>

                        {/* COL  */}
                        <div className='flex flex-col'>
                            <label htmlFor='col' className='text-left font-semibold'>Col: </label>
                            <ListBox list={colsList} handleSelect={handleSelectCol} />
                        </div>

                        {/* Fils  */}
                        <div className='flex flex-col'>
                            <label htmlFor='threads' className='text-left font-semibold'>Fils: </label>
                            <div className='flex flex-wrap'>
                                {threadsList.map((thread, index) => ( 
                                    <div key={index} className='flex items-center gap-1 mx-2'>
                                        <input type='radio' name='threads' id={thread} value={thread} onChange={handleChange} />
                                        <label className='border-b border-secondary cursor-pointer' htmlFor={thread}>{thread}</label>
                                    </div>
                                ))}
                             </div>
                        </div>

                        {/* Taille  */}
                        <div>
                            <label htmlFor='size' className='text-left font-semibold'>Taille: </label>
                            <div className='flex flex-wrap'>
                                {sizeList.map((size, index) => ( 
                                    <div key={index} className='flex items-center gap-1 mx-2'>
                                        <input type='radio' name='size' id={size} value={size} onChange={handleChange} />
                                        <label className='border-b border-secondary cursor-pointer' htmlFor={size}>{size}</label>
                                    </div>
                                ))}
                             </div>
                        </div>

                        {/* Prix  */}
                        <div className='flex gap-2'>
                            <input type='number' name='price' id='price' min={0} 
                            className={`min-w-[10px] px-1 rounded-md text-center`}
                            style={{width: `${product.price.toString().length * 20}px`, minWidth: '30px'}} 
                            value={product.price} 
                            onChange={handleChange} /> €
                        </div>

                            <div className='flex justify-evenly'>
                                <div className='flex flex-col items-center gap-2'>
                                {/* Couleur  */}
                                    <div className='flex items-center gap-4'>
                                        <label htmlFor='color' className='text-left font-semibold'>Couleur: </label>
                                        <input className='cursor-pointer' type='color' name='color' id='color' value={product.color} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor='stock_quantity' className='text-left font-semibold'>Quantité: </label>
                                        <input className='w-6 rounded-md text-center' type='number' name='stock_quantity' id='stock_quantity' min={0} value={product.stock_quantity} onChange={handleChange} />
                                    </div>
                                </div>
                                <div>

                                    <div className='flex items-center gap-2'>
                                        <input type='checkbox' name="hand_wash" id="hand_wash" value={product.hand_wash} onChange={() => setProduct({...product, hand_wash: !product.hand_wash})} />
                                        <label className='cursor-pointer'> Lavage à la main </label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input type='checkbox' name="ironing" id="ironing" value={product.ironing} onChange={() => setProduct({...product, ironing: !product.ironing})} />
                                        <label className='cursor-pointer'> Repassage interdit </label>
                                    </div>

                                </div>
                            </div>

                    </div>
                </div>

                    <div className='flex justify-center mt-8'>
                        <button className='bg-white rounded-md px-4 py-2 text-primary font-bold hover:opacity-50' onClick={saveProduct}>Enregistrer</button>
                    </div>

                    {loader && <div className='flex justify-center mt-4'>
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-700 h-10 w-10"></div>
                    </div>}

                    {message.type && <div className={`mt-4 p-2 rounded-md flex justify-between px-4 relative text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {message.content}
                        <div className='cursor-pointer' onClick={()=> setMessage({type: '', content: ''})}> X </div>
                    </div>}
            </div>
        </div>
    );
}

export default ProductForm;
