import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointments = () => {

  const {aToken, appointments, getAllAppointments,cancelAppointment} = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)
  

 

  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium '>All Appointments</p>
      <div className=' border border-primary rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll '>
        <div className='hidden sm:grid font-medium grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-primary'>
          <p >#</p>
          <p>Client</p>
          {/* <p>Age</p> */}
          <p>Date & Time</p>
          <p>Consultant</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item,index)=>(

          <div className='flex  flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col items-center text-gray-100 py-3 px-6 border-b border-primary hover:bg-primary hover:bg-opacity-10 ' key={index}>
            <p className='max-sm:hidden '>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full ' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 bg-primary rounded-full ' src={item.consData.image} alt="" />
              <p>{item.consData.name}</p>
            </div>
            <p>₹ {item.consData.fees}</p>
            {
              item.cancelled
              ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ?<p className='text-green-500 text-xs font-medium'>Completed</p>
                :<img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}

      </div>
    </div>
  )
}

export default AllAppointments