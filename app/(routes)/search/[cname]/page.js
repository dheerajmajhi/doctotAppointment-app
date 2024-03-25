"use client"
import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'


const search = ({params}) => {
  const [doctors,setDoctors]=useState([]);
  const path = params.cname;
  let type='';
    let check;
    if(path.search('%20')>=0){
        let temp = path.split('%20');
        type = temp[0] +" "+temp[1];
        check=type;
    }
    else{
        type = path.split('/')[2];
    }
  useEffect(()=>{
     console.log(params.cname);
     getDoctor()
  },[])

  const getDoctor = ()=>{
    GlobalApi.getDoctorByCategory(params.cname).then((res)=>{
      setDoctors(res.data.data);
      console.log(res);
    })
  }
  return (
    <div className='h-screen mt-5' >
      <DoctorList heading={type?type:params.cname} doctors={doctors}/>
    </div>
  )
}

export default search
