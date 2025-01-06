import React, { useContext, useEffect, useState } from 'react'
import { ConsultantContext } from '../../context/ConsultantContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ConsultantProfile = () => {

  const {cToken, profileData, setProfileData, getProfileData,backendUrl} = useContext(ConsultantContext)


  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async() => {

    try {
      
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const {data} = await axios.post(backendUrl + 'api/consultant/update-profile', updateData, {headers:{cToken}})

      if(data.success)
      {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    if(cToken){
      getProfileData()
      // console.log(profileData)
    }
  },[cToken])

  return  profileData &&(
    <div>

    <div className='flex flex-col m-5'>

    <div className='bg-primary w-full sm:max-w-64  rounded-lg'>
      <img className='sm:max-h-64' src={profileData.image} alt="" />
    </div>

    <div className='flex-1 border mt-4 border-primary  rounded-lg p-8 py-7 '> 
      {/* ---------Consultant Info: name, degree, experience ------------- */}

      <p className='flex items-center gap-2 text-3xl font-medium text-gray-50'>{profileData.name}</p>
      <div className='flex items-centergap-2 mt-1 text-gray-300'>
        <p>{profileData.degree} - {profileData.speciality}</p>
        <button className='ml-1  py-0.5 px-2 border border-primary text-xs rounded-full'>{profileData.experience}</button>
      </div>

      {/* -----------About--------- */}
      <div>
        <p className='flex items-center gap-1 text-sm font-medium text-neutral-50 mt-3'>About:</p>
        <p className='text-sm text-gray-200 max-w-[700px] mt-1'>{profileData.about}</p>
      </div>

      <p className='text-gray-100 font-medium mt-4'>
        Appointment fee: <span>₹ {isEdit? <input className='text-black max-w-20' type="number" onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees} />:profileData.fees}</span>
      </p>

      <div className='flex gap-2  py-2'>
        <p>Address:</p>
        <p className='text-sm'>{isEdit? <input className='text-black w-full' type="text" onChange={(e)=>setProfileData(prev => ({...prev, address: e.target.value}))} value={profileData.address} />:profileData.address}</p>
      </div>

      <div className='flex gap-1 pt-2'>
        <input onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available}  type="checkbox"  />
        <label htmlFor="">Available</label>
      </div>

      {
        isEdit 
        ?<button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-black transition-all'>Save</button>
        :<button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-black transition-all'>Edit</button>
      }

    

    </div>
    

    </div>

    </div>
  )
}

export default ConsultantProfile