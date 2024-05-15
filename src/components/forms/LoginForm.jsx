import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginComponent = () => {

    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleKeyDown = (e) => {
        console.log(e.key)
        if(e.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        setLoader(true)
        setError(false)
        // authApi.login(user)
        // .then(res => {
        //     setLoader(false)
        //     localStorage.setItem('token', res.data.user.token)
        //     logUser()
        //     router.push('/chat')
        // })
        // .catch(err => {
        //     console.log(err)
        //     setError(true)
        //     setLoader(false)
        // })
        
    }

    return (
        <div className='relative w-full h-full flex justify-center'>
           <Image src="/assets/images/logo.png" alt="logo" width={140} height={140} className='absolute top-20 left-32 cursor-pointer' onClick={() => router.push('/')} />
           <div className='w-[520px] flex flex-col gap-2 self-center '>
            
            <div className='flex flex-col gap-5 mt-10 w-full border border-slate-400 bg-blue rounded-md p-6'>
                <Image src="/assets/images/logo.png" alt="logo" width={140} height={140} className='mx-auto cursor-pointer' onClick={() => router.push('/')} />
                <div className='w-full px-8'>
                    <label htmlFor="username" className='font-semibold'>Username</label>
                    <input
                        value={user.username}
                        name="username" 
                        type="text" 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent'
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full px-8 relative'>
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input
                        value={user.password}
                        name="password" 
                        type={showPassword ? 'text' : 'password'} 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent text-zinc-200'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <span className='absolute right-8 top-8 cursor-pointer text-white' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={22}/> : <FaEye size={22} />}
                    </span>
                </div>
            </div>
            
           <div className='flex flex-col justify-center text-center items-center'>
                {loader && <DefaultLoader/> }
                {error && <p className='text-red-500 font-semibold'> Email or Password is invalid </p>}
           </div>

           </div>
        </div>
    );
}

export default LoginComponent;
