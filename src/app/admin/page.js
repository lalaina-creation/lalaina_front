"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import ProductForm from '@/components/forms/ProductForm'

const AdminPage = () => {

    const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen w-screen">
        <div className='w-[96%] h-[94%] rounded-md bg-blue-300 shadow-black shadow-sm p-4'>
            <h1 className='text-center text-2xl font-semibold'>Administration</h1>
            <div className='w-full mt-8 flex justify-evenly'>
                
            </div>
        </div>
    </div>
  )
}

export default AdminPage