import React from 'react'
import Image from 'next/image'
import { GraduationCap, MapPin } from 'lucide-react'
import BookAppointment from './BookAppointment'

function DoctorDetails({ doctors }) {
  const social = [
    {
      id: 1,
      icon: '/whatsapp.png'
    },
    {
      id: 2,
      icon: '/instagram.png'
    },
    {
      id: 3,
      icon: '/facebook.png'
    },
    {
      id: 4,
      icon: '/linkedin.png'
    }
  ];
  return (
    <div className='block  h-min'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 border-[1px] p-5 mt-5 rounded-lg'>
        <div>
          <Image src={doctors.attributes?.Image?.data.attributes?.url}
            width={200}
            height={100}
            alt='doctor-image'
            className='rounded-lg md:object-cover w-full mt-2 h-72 sm:object-contain'
          />
       
        </div>
        <div className='col-span-2 mt-5 flex flex-col gap-3 items-baseline md:px-6'>
          <h2 className='font-bold text-xl'>
            {doctors.attributes?.Name}
          </h2>
          <h2 className='flex gap-2 text-md text-gray-500'>
            <GraduationCap />
            <span>{doctors.attributes?.Year_of_experience} of experience</span>
          </h2>
          <h2 className='flex gap-2 text-md text-gray-500'>
            <MapPin />
            <span>{doctors.attributes?.Address}</span>
          </h2>
          <h2 className='text-[12px] bg-blue-50 p-1 px-2 text-primary rounded-full'>{doctors.attributes?.category?.data?.attributes?.Name}</h2>
          <div className='flex gap-4'>
            {
              social.map((item, i) => (
                <Image key={i} src={item.icon}
                  width={25}
                  height={25}
                  alt='social-media'
                  className='rounded-lg cursor-pointer'
                />
              ))
            }
          </div>
          <BookAppointment doctors={doctors} />
        </div>
      </div>
      <div className='p-4 border-[1px] mt-5 rounded-lg h-auto'>
        <h2 className='font-bold text-xl'>About Me</h2>
        <p className='text-gray-500 tracking-wide mt-2'>{doctors.attributes?.About}</p>
      </div>
      </div>
  )
}

export default DoctorDetails
