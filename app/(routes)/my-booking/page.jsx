"use client"
import React, { use, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/bookingList'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const booking = () => {

  const {user}=useKindeBrowserClient();
  const [bookings,setBookings]=useState([]);

  useEffect(()=>{
    user&&getBookings();
  },[user])

  const getBookings = ()=>{
    GlobalApi.getBookingList(user.email).then((res)=>{
      console.log(res.data.data);
      setBookings(res.data.data)
    })
  }

  const filterBookings = (type)=>{
    const result = bookings.filter(item => type=='upcoming'? new Date(item?.attributes?.Date)>=new Date() : new Date(item?.attributes?.Date)<=new Date()
    )
    console.log(result);
    return result;
  }

  return (
    <div className='h-max px-4 sm:px-10 mt-10 mb-10'>
      <h2 className='font-bold text-2xl'>My Bookings</h2>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className='w-full justify-start mt-5 p-4'>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList bookings={filterBookings('upcoming')} expired={false} updateRecord={()=>getBookings()}/>
        </TabsContent>
        <TabsContent value="expired">
        <BookingList bookings={filterBookings('expired')} expired={true} updateRecord={()=>getBookings()} />
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default booking
