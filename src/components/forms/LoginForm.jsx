"use client";
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import userAPI from '@/API/user.api';
import { Context } from '@/context/context';
const LoginComponent = () => {

    const router = useRouter()
    const { setIsAuth } = useContext(Context)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        if(!user.email || !user.password) return alert('Remplissez tous les champs')
        setLoader(true)
        setError("")

        setTimeout(() => {
            userAPI.signIn(user.email, user.password)
            .then(response => {
                console.log(response)
                if(response.status === 404 || response.status === 401) {
                    setError(response.data)
                    setLoader(false)
                    return
                }
                
                localStorage.setItem('token', response.token)
                setIsAuth(true)
                router.push('/')
                
                setLoader(false)
            })
            .catch(error => {
                console.log(error)
                setLoader(false)
                setError("Erreur serveur")
            })
        }, 2000)
        
    }

    return (
        <div className='relative w-full h-full flex justify-center'>
           <Image src="/assets/images/logo.png" alt="logo" width={140} height={140} className='absolute top-20 left-32 cursor-pointer' onClick={() => router.push('/')} />
           <div className='w-[520px] flex flex-col gap-2 self-center '>
            
            <div className='flex flex-col gap-5 mt-10 w-full border border-slate-400 bg-blue rounded-md p-6'>
                <Image src="/assets/images/logo.png" alt="logo" width={140} height={140} className='mx-auto cursor-pointer' onClick={() => router.push('/')} />
                <div className='w-full px-8'>
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input
                        value={user.email}
                        name="email" 
                        type="text" 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent'
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full px-8 relative'>
                    <label htmlFor="password" className='font-semibold'>Mot de passe</label>
                    <input
                        value={user.password}
                        name="password" 
                        type={showPassword ? 'text' : 'password'} 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <span className='absolute right-8 top-8 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={22}/> : <FaEye size={22} />}
                    </span>
                </div>
                <div className='flex justify-center'>
                    <button onClick={handleSubmit} className='w-1/2 bg-primary text-white py-2 font-semibold rounded-md'>Connexion</button>
                </div>
            </div>
            
           <div className='flex flex-col justify-center text-center items-center'>
                {loader && <div>
                    Loading ...
                </div> }
                {error && <p className='text-red-500 font-semibold'> {error} </p>}
           </div>

           </div>
        </div>
    );
}

export default LoginComponent;
