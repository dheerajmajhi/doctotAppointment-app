"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/categorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [doctors,setDoctors] = useState([])

  useEffect(()=>{
    getDoctorList()
  },[])

  const getDoctorList = ()=>{
    GlobalApi.getDoctorList().then(res=>{
      console.log(res.data.data);
      setDoctors(res.data.data)
    })
  }

  return (
      <div>
       <Hero />
       <CategorySearch />
       <DoctorList doctors={doctors} />
      </div>
  );
}
