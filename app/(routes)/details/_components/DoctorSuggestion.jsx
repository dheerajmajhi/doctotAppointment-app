"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

function DoctorSuggestion() {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getDoctors()
    }, [])

    const getDoctors = () => {
        GlobalApi.getDoctorList().then(res => {
            console.log(res.data.data);
            setDoctors(res.data.data);
        })
    }
    return (
        <div className='mt-5 md:ml-5 border-[1px] p-4 rounded-lg flex flex-col items-center justify-center'>
            <h2 className='font-bold text-xl mb-3'>Suggestions</h2>
            {
              doctors.length>0 ?  doctors.map((item, i) => i<6 && (
                    <Link href={'/details/'+item?.id} className='flex gap-3 items-center justify-center shadow-sm mb-2 rounded-lg hover:bg-slate-100 cursor-pointer md:w-[250px] lg:w-full' key={i}>
                        <Image src={item.attributes?.Image?.data.attributes?.url}
                            width={70}
                            height={70}
                            alt='doctor-image'
                            className='w-[70px] h-[70px] object-cover rounded-full'
                        />
                        <div className='items-baseline flex flex-col gap-1 p-2'>
                            <h2 className='text-[12px] bg-blue-50 p-1 px-2 text-primary rounded-full'>{item.attributes?.category?.data?.attributes?.Name}</h2>
                            <h2 className='font-bold text-sm'>{item.attributes?.Name}</h2>
                            <h2 className='text-[12px] text-primary'>{item.attributes?.Year_of_experience}</h2>
                        </div>
                    </Link>
                ))
                :
                [1, 2, 3, 4, 5, 6].map((item, i) => (
                    <div key={i} className='h-[80px] bg-gray-100 w-full rounded-lg animate-pulse mb-2'>
      
                    </div>
                  ))
            }
        </div>
    )
}

export default DoctorSuggestion
