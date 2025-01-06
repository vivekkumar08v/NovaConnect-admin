import React, { useContext, useEffect } from 'react'
import { ConsultantContext } from '../../context/ConsultantContext'
import { assets } from "../../assets/assets";

const ConsultantAppointments = () => {

    const {cToken, appointments, getAppointments, slotDateFormat, completeAppointment, cancelAppointment} = useContext(ConsultantContext)

    useEffect(()=>{
        if(cToken){
            getAppointments()
            // console.log(appointments)
        }
    },[cToken])

  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium '>All Appointments</p>

      <div className=' border border-primary rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll '>

        <div className='hidden sm:grid font-medium grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-primary'>
          <p>#</p>
          <p>Client</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>


        {
          appointments.reverse().map((item, index)=>(
            <div className='flex  flex-wrap justify-between max-sm:gap-2 max-sm:text-base sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col items-center text-gray-100 py-3 px-6 border-b border-primary hover:bg-primary hover:bg-opacity-10 ' key={index}>
            <p className='max-sm:hidden '>{index+1}</p>
              <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full ' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
              </div>

            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment?'Online':'CASH'}
              </p>
            </div>

            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
       
            <p>₹{item.amount}</p>

            
              
                  {item.cancelled 
                  ? <p className="text-red-500 text-xs font-medium">Cancelled</p> 
                  : item.isCompleted
                     ? <p className="text-green-500 text-xs font-medium">Completed</p>
                     : <div className='flex'>
                      <img onClick={()=> cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                      <img onClick={()=> completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                       </div>
                  }  
           
            </div>

          ))
        }


      </div>

    </div>
  )
}

export default ConsultantAppointments