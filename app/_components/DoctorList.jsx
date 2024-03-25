import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function DoctorList({ doctors,heading='Popular Doctors' }) {
  return (
    <div className='mb-10 px-8'>
      <h2 className='text-2xl font-bold mb-4'>{heading}</h2>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7' >
        {
          doctors.length>0 ? doctors.map((item, i) => (
            <div className='border-[1px] p-3 rounded-lg cursor-pointer hover:border-primary shadow-sm transition-all ease-in-out' key={i}>
              <Image src={item.attributes?.Image?.data.attributes?.url}
                height={200}
                width={500}
                alt='doctor'
                className='h-[200px] w-full object-fill rounded-lg'
              />
              <div className='mt-3 items-baseline flex flex-col gap-2'>
                <h2 className='text-[12px] bg-blue-50 p-1 px-2 text-primary rounded-full'>{item.attributes?.category?.data?.attributes?.Name}</h2>
                <h2 className='font-bold'>{item.attributes?.Name}</h2>
                <h2 className='text-sm text-primary'>{item.attributes?.Year_of_experience}</h2>
                <h2 className='text-sm text-gray-500'>{item.attributes?.Address}</h2>
                <Link href={'/details/'+item?.id} className='w-full'>
                <h2 className='border-[1px] w-full p-2 px-3 border-primary rounded-full text-center 
                  text-primary cursor-pointer hover:bg-primary hover:text-white mt-2 transition-all ease-in-out
                '>Book Now</h2></Link>
              </div>
            </div>
          ))
            :
            [1, 2, 3, 4, 5, 6,7,8].map((item, i) => (
              <div key={i} className='h-[250px] bg-gray-100 w-full rounded-lg animate-pulse'>

              </div>
            ))

        }
      </div>
    </div>
  )
}

export default DoctorList
