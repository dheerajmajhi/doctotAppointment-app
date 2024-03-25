"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { usePathname } from 'next/navigation';


function category() {

    const path = usePathname();
    let type='';
    let check;
    if(path.search('%20')>=0){
        let temp = path.split('%20');
        type = temp[0].split('/')[2]+" "+temp[1];
        check=type;
    }
    else{
        type = path.split('/')[2];
    }

    useEffect(() => {
        getCategoryList();
    }, [])


    const [category, setCategory] = useState([]);

    const getCategoryList = () => {
        GlobalApi.getCategory().then(res => {
            console.log(res.data.data);
            setCategory(res.data.data)
        })
    }

    return (
        <div className='h-screen mt-5'>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className='overflow-visible' >
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions" >
                        {category && category.map((item, i) => (
                            <CommandItem key={i}>
                                <Link href={'/search/'+item?.attributes?.Name} className={`p-2 flex gap-2 text-[12px] text-blue-600 w-full cursor-pointer rounded-md
                                ${(type==item.attributes.Name) && 'bg-blue-100'}
                                `
                            } >
                                    <Image
                                        src={item.attributes?.Icon?.data.attributes?.url}
                                        width={25}
                                        height={25}
                                        alt='icon'
                                    />
                                    <label>{item.attributes?.Name}</label>
                                </Link>
                            </CommandItem>
                        ))
                        }
                    </CommandGroup>
                    <CommandSeparator />
                </CommandList>
            </Command>

        </div>
    )
}

export default category
