import { useEffect } from 'react'
import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const ConsultantList = () => {

  const {consultants, aToken, getAllConsultants, changeAvailability} = useContext(AdminContext)

  useEffect(()=>{
    if(aToken) {
      getAllConsultants()
    }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Consultants</h1>
      <div className='flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          consultants.map((item, index)=>(
            <div className='border border-primary rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-primary group-hover:bg-accent transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-lg font-medium'>{item.name}</p>
                <p className='text-gray-200 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ConsultantList