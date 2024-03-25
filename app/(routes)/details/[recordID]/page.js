"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import DoctorDetails from '../_components/DoctorDetails';
import DoctorSuggestion from '../_components/DoctorSuggestion';

function details({params}) {
  
  const [doctors,setDoctors]=useState([]);
  useEffect(()=>{
    getDoctors();
  },[])

  const getDoctors = ()=>{
    GlobalApi.getDoctorById(params.recordID).then(res=>{
      console.log(res);
      setDoctors(res.data.data);
    })
  }
  return (
    <div className='h-fit p-5 md:px-20'>
      <h2 className='font-bold text-2xl'>Details</h2>
      <div className='grid grid-cols-1  lg:grid-cols-4'>
        <div className='col-span-3'>
          {/* details */}
          <DoctorDetails  doctors={doctors}/>
        </div>
        <div>
          {/* suggestion */}
          <DoctorSuggestion/>
        </div>
      </div>
    </div>
  )
}

export default details
