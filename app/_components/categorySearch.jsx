"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'

function categorySearch() {

  useEffect(() => {
    getCategoryList()
  }, [])

  const [category, setCategory] = useState([]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(res => {
      console.log(res.data.data);
      setCategory(res.data.data)
    })
  }

  return (
    <div className='mb-10 flex flex-col justify-center items-center gap-1 px-5'>
      <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-primary'>Doctors</span></h2>
      <h2 className='text-gray-500 text-xl mt-2'>Search your doctor and Book appointment in one click</h2>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
        <Input type="text" placeholder="Search..." />
        <Button type="submit"> <Search className='h-4 w-4 mr-2' /> Search</Button>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-5 gap-2'>
        {
         category.length > 0 ? category.map((item, i) => i < 6 && (
            <Link href={'/search/'+item.attributes?.Name} key={i} className='flex flex-col text-center items-center p-5 bg-blue-50 m-2
           rounded-lg text-blue-500 text-sm hover:scale-110 transition-all ease-in-out cursor-pointer
          '>
              <Image
                src={item.attributes?.Icon?.data.attributes?.url}
                width={40}
                height={40}
                alt='category'
              />
              <label htmlFor="">{item.attributes?.Name}</label>
            </Link>
          ))
          :
          [1, 2, 3, 4, 5, 6].map((item, i) => (
            <div key={i} className='h-[100px] bg-gray-100 w-[130px] rounded-lg animate-pulse mr-4'>

            </div>
          ))

        }
      </div>
    </div>
  )
}

export default categorySearch
