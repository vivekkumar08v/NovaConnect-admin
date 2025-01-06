import React, {useContext} from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { ConsultantContext } from '../context/ConsultantContext'

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)
    const {cToken,setCToken} = useContext(ConsultantContext)

    const logout1 =()=>{
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
       
    }

    const logout2 =()=>{
      cToken && setCToken('')
      cToken && localStorage.removeItem('cToken')
    }

  return (
    <div className='flex justify-between  items-center px-4 sm:px-10  py-4  border-b border-b-gray-200  '>
        <div className='flex items-center gap-2 text-xs'>
        <img  className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-primary'>{aToken? 'Admin' : 'Consultant'}</p>
        </div>

        {
          aToken && <button onClick={logout1} className='bg-primary text-black text-sm px-6 py-2 rounded-full'>Logout</button>
        }
        {
          cToken && <button onClick={logout2} className='bg-primary text-black text-sm px-6 py-2 rounded-full'>Logout</button>
        }
        
    </div>
    
  )
}

export default Navbar