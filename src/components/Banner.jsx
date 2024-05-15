"use client";
import React, { useEffect, useState } from 'react';
import bannerAPI from '@/API/banner.api';
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";

const Banner = () => {
    const [edit, setEdit] = useState(false);
    const [banner, setBanner] = useState({
        title: 'Reine du Muguet 2024',
        description: 'Andrianina Andriamanantena Reine du mguet de Rambouillet 2024',
        image: 'https://img.freepik.com/premium-vector/white-christmas-background-festive-web-template-vector_532963-885.jpg?w=2000'
    });

    const [editValues, setEditValues] = useState({
        title: banner.title,
        description: banner.description,
        image: banner.image
    });

    useEffect(() => {
        fetchBanner();
    }, []);

    const fetchBanner = async () => {
        try {
            const res = await bannerAPI.getBanner();
            if (res.title) {
                setBanner(res);
                setEditValues({
                    title: res.title,
                    description: res.description,
                    image: res.image
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const editBanner = () => {
        if (edit) {
            // Save the edited values
            setBanner(editValues);
            bannerAPI.editBanner(editValues)
                .then(() => console.log('Banner edited'))
                .catch(err => console.log(err));
        }
        setEdit(!edit);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await bannerAPI.uploadImage(formData); // This endpoint should return the URL of the uploaded image
                if(!res.url) return;
                setEditValues(prevValues => ({
                    ...prevValues,
                    image: res.url
                }));
            } catch (err) {
                console.log(err);
            }
        }
    };

    

    return (
        <div className='h-[50vh] w-full mt-12 relative'>
            <img src={edit ? editValues.image : banner.image} alt='Banner' className='w-full h-full object-cover' />
            <div className='absolute right-2 top-16 z-40 cursor-pointer' onClick={editBanner}>
                {edit ?
                <div className='p-2 rounded-md bg-white flex items-center justify-center'>
                    <FaCheck className='text-3xl text-green-500' />
                </div> 
                : 
                <div className='p-2 rounded-md bg-white flex items-center justify-center'>
                    <CiEdit className='text-3xl text-primary' />
                </div>
                }
            </div>
            {!edit && (<div className={`absolute top-2/3 w-full h-32 bg-white opacity-70`} />)}
            <div className={`absolute w-full mt-8 text-center text-xl font-bold ${edit? 'top-1/3' : 'top-2/3'}`}>
                {edit ? (
                    <input
                        type='text'
                        name='title'
                        value={editValues.title}
                        onChange={handleChange}
                        className='bg-white bg-opacity-75 p-2 rounded text-center'
                    />
                ) : (
                    <span className='uppercase underline text-primary text-2xl'>{banner.title}</span>
                )}
                <div className='mt-2 text-clip w-full flex justify-center'>
                    {edit ? (
                        <textarea
                            name='description'
                            value={editValues.description}
                            onChange={handleChange}
                            className='bg-white bg-opacity-75 p-2 rounded w-1/2 text-center'
                        />
                    ) : (
                        <p className='w-1/2 italic opacity-90 text-primary text-lg'>{banner.description}</p>
                    )}
                </div>
                {edit && (
                    <div className='mt-2 flex flex-col items-center'>
                        <input
                            type='file'
                            onChange={handleImageUpload}
                            className='bg-white bg-opacity-75 p-2 rounded mt-2'
                            accept='image/*'
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Banner;
