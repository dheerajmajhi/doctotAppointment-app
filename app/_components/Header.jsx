"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LoginLink, useKindeBrowserClient,LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function Header() {
  const menu = [
    {
      id: 1,
      name: 'Home',
      path: "/"
    },
    {
      id: 2,
      name: 'Explore',
      path: "/"
    },
    {
      id: 3,
      name: 'Contact Us',
      path: "/"
    },
  ]

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user])
  return (
    <div className='flex justify-between shadow-sm p-5 items-center'>
      <div className='flex items-center gap-10'>
        <Image src="/logo.svg" alt='logo' width={180} height={80} />
        <ul className='md:flex gap-8 hidden'>
          {
            menu.map((item, i) => (
              <Link key={i}  href={item.path}>
                <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
              </Link>
            ))
          }
        </ul>
      </div>
      {
        user ?
          <Popover>
            <PopoverTrigger> <Image src={user?.picture}
              width={45}
              height={45}
              alt='profile-pic'
              className='rounded-full cursor-pointer'
            /></PopoverTrigger>
            <PopoverContent className='w-40'>
              <ul className='flex flex-col gap-2'>
                {/* <li className='cursor-pointer hover:bg-slate-100 rounded-md p-2'>My Profile</li> */}
                <Link href={'/my-booking'} className='cursor-pointer hover:bg-slate-100 rounded-md p-2'>My Bookings</Link>
                <li className='cursor-pointer hover:bg-slate-100 rounded-md p-2'> <LogoutLink>Logout</LogoutLink> </li>
              </ul>
            </PopoverContent>
          </Popover>
          :
          <LoginLink>
            <Button>Get Started</Button>
          </LoginLink>
      }

    </div>
  )
}

export default Header
