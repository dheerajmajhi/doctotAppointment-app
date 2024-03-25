"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from "sonner"


function BookAppointment({doctors}) {

    useEffect(() => {
        getTime();
        isExist();
    }, [])

    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedtimeSlot, setSelectedTimeSlot] = useState();
    const [note,setNote] = useState();
    const [appointments,setAppointments]=useState([]);
    const {user} = useKindeBrowserClient();

    const getTime = () => {
        const timelist = []
        for (let index = 10; index <= 12; index++) {
            if (index == 12) {
                timelist.push({
                    time: index + ':00 PM'
                })
                timelist.push({
                    time: index + ':30 PM'
                })
            }
            else {
                timelist.push({
                    time: index + ':00 AM'
                })
                timelist.push({
                    time: index + ':30 AM'
                })
            }

        }
        for (let index = 1; index <= 6; index++) {
            timelist.push({
                time: index + ':00 PM'
            })
            timelist.push({
                time: index + ':30 PM'
            })
        }
        setTimeSlot(timelist);
    }

    const isExist = ()=>{
        GlobalApi.getAppointment().then(res=>{
            console.log(res.data.data);
            setAppointments(res.data.data);
        })
    }

    const saveBooking = ()=>{
        const data = {
            data:{
                username:user.given_name+" "+user.family_name,
                Email:user.email,
                Date:date,
                Time:selectedtimeSlot,
                Note:note,
                doctor:doctors.id
            }
        }
        let index=appointments.findIndex((i)=>{
            return i?.attributes?.doctor?.data?.id==doctors.id && i?.attributes?.Time==selectedtimeSlot && new Date(i?.attributes?.Date)==date;
        })
        console.log(index);
        if(index > -1 ){
            toast("Choose different time or date as it is already booked");
        }
        else{
            GlobalApi.bookAppointment(data).then(res=>{
                if(res){
                    GlobalApi.sendEmail(data).then((res)=>{
                        console.log(res);
                    })
                    toast("Booking Confirmed Successfully")
                }
            }).then(()=>{
                isExist();
            })
        }
        
    }

    const isPastDay = (day) => {
        return day < new Date();
    }
    return (
        <Dialog>
            <DialogTrigger>
                <h2 className='border-[1px] w-full p-2 px-3 bg-primary text-white rounded-full text-center 
                 cursor-pointer mt-3 hover:opacity-90
                '>Book Appointment</h2>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mb-5'>Book Appointment</DialogTitle>
                    <DialogDescription>
                        <div className='grid grid-cols-1 md:grid-cols-2'>
                            {/* calendar */}
                            <div className='flex flex-col items-baseline gap-3'>
                                <h2 className='flex items-center gap-2'>
                                    <CalendarDays className='text-primary h-5 w-5' />
                                    Select Date
                                </h2>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                    disabled={isPastDay}
                                />
                            </div>
                            {/* time slot */}
                            <div className='mt-3 md:mt-0'>
                                <h2 className='flex items-center gap-2 mb-3'>
                                    <Clock className='text-primary h-5 w-5' />
                                    Select TimeSlot
                                </h2>
                                <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                                    {
                                        timeSlot.map((item, i) => (
                                            <h2 key={i} onClick={() => setSelectedTimeSlot(item.time)} className={`border p-2 rounded-full text-center 
                                                hover:bg-primary hover:text-white cursor-pointer ${item.time == selectedtimeSlot && 'bg-primary text-white'}
                                            `}>{item?.time}</h2>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <Textarea placeholder="Any Comments..." onChange={(e)=>setNote(e.target.value)} />
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className='text-red-500 border-red-500'>
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="button" disabled={!(date && selectedtimeSlot)} onClick={()=>saveBooking()}  >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BookAppointment
