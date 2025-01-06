import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom';
import { ConsultantContext } from '../context/ConsultantContext';

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {cToken} = useContext(ConsultantContext)

  return (
    <div className='min-h-screen  border-r border-r-gray-100  '>
        <div className=' '>
        {
            aToken && <ul className='mt-5'>
               
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-primary border-r-4 text-black':' '} `} to={'/admin-dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary border-r-4 text-black':''} `} to={'/all-appointments'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center  gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary border-r-4 text-black':''} `} to={'/add-consultant'}>
                    <img src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Consultant</p>
                </NavLink >
                
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary border-r-4 text-black':''} `} to={'/consultant-list'}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Consultants List</p>
                </NavLink>
            </ul>
        }
        {
            cToken && <ul className='mt-5'>
               
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-primary border-r-4 text-black':' '} `} to={'/consultant-dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary border-r-4 text-black':''} `} to={'/consultant-appointments'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>   
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary border-r-4 text-black':''} `} to={'/consultant-profile'}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Consultants Profile</p>
                </NavLink>
            </ul>
        }
        </div>
      
    </div>
  )
}

export default Sidebar