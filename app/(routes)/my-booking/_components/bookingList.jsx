import React from 'react'
import Image from 'next/image'
import { Calendar, Clock, MapPin, MapPinIcon } from 'lucide-react'
import moment from 'moment/moment'
import { Button } from '@/components/ui/button'
import CancelAppointment from './cancelAppointment'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

function bookingList({ bookings, expired ,updateRecord}) {

  const onDeleteBooking = (item)=>{
    console.log(item);
    GlobalApi.deleteBooking(item.id).then((res)=>{
      console.log(res);
      toast('Booking Deleted Successfully')
      updateRecord()
    })
  }
  return (
    <div>
      {
        bookings.map((item, i) => i < 6 && (
          <div key={i} className='md:flex md:justify-between p-4 border rounded-lg mt-5 shadow-sm'>
            <div className='flex gap-4 items-center'>
              <Image src={item.attributes.doctor.data.attributes?.Image?.data.attributes?.url}
                width={70}
                height={70}
                alt='doctor-image'
                className='rounded-full h-[70px] w-[70px] object-cover'
              />
              <div className='flex flex-col gap-2 justify-center w-full'>
                <h2 className='font-bold text-lg'>{item.attributes?.doctor?.data?.attributes?.Name}
                </h2>
                <h2 className='flex gap-2 text-gray-500 items-center text-[15px]'><MapPin className='text-primary h-4 w-4' />{item.attributes?.doctor?.data?.attributes?.Address}</h2>
                <h2 className='text-[15px] flex gap-2 items-center' ><Calendar className='text-primary h-4 w-4' />Appointment on : {moment(item.attributes?.Date).format("DD MMM,YYYY")}</h2>
                <h2 className='text-[15px] flex gap-2 items-center' ><Clock className='text-primary h-4 w-4' />At Time : {item.attributes?.Time}</h2>
              </div>
            </div>

            <div className='mt-5 md:mt-0'>
              {!expired && <CancelAppointment onClickContinue={()=>onDeleteBooking(item)} />}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default bookingList
