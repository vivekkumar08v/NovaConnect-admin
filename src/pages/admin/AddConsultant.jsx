import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from "react-toastify";
import axios from 'axios'


const AddConsultant = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Yaer')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('Business Strategy')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const address = `${address1}, ${address2}`;


  const {backendUrl,aToken} = useContext(AdminContext)

  const onSubmitHandler = async(event) =>{
    event.preventDefault()

    try {
      
      if(!docImg)
      {
        return toast.error('Image Not Selected')
      }

      const formData =new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', fees)
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      // formData.append('address', JSON.stringify({ line1: address1, line2: address2}))
      formData.append('address', address)

      // console log formdata

      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`)
      })

      const {data} =await axios.post(backendUrl + 'api/admin/add-consultant', formData, {headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setFees('')
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full '>
      <p className='mb-3 text-lg font-medium'>Add Consultant</p>

      <div className='px-8 py-8 border border-primary rounded w-full max-w-6xl max-h-[80vh] overflow-scroll  '>
        <div className='flex items-center gap-4 mb-8 '>
          <label htmlFor="doc-img">
            <img className='w-16  rounded-full cursor-pointer' src={docImg? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=> setDocImg(e.target.files[0])} type="file"  id="doc-img" hidden />
          <p>Upload consultant <br />picture</p>
        </div>

       <div className='flex flex-col lg:flex-row items-start gap-10'>
        <div className='w-full lg:flex-1 flex flex-col gap-4'>

          <div className='flex flex-1 flex-col gap-1'>
            <p>Consultant name</p>
            <input onChange={(e)=> setName(e.target.value)} value={name} className='text-black border border-primary rounded px-3 py-2' type="text" placeholder='Name' required />
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <p>Consultant Email</p>
            <input onChange={(e)=> setEmail(e.target.value)} value={email} className='text-black border border-primary rounded px-3 py-2' type="email" placeholder='Email' required />
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <p>Consultant Password</p>
            <input onChange={(e)=> setPassword(e.target.value)} value={password} className='text-black border border-primary rounded px-3 py-2' type="password" placeholder='Password' required />
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <p>Experience</p>
            <select onChange={(e)=> setExperience(e.target.value)} value={experience} className='text-black border border-primary rounded px-3 py-2 ' name="" >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
            </select>
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <p>Fees</p>
            <input onChange={(e)=> setFees(e.target.value)} value={fees} className='text-black border border-primary rounded px-3 py-2' type="number" placeholder='Fees' required />
          </div>

        </div>

        <div className='w-full lg:flex-1 flex flex-col gap-4'>
          
        <div className='flex flex-1 flex-col gap-1'>
          <p>Speciality</p>
          <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className='text-black border border-primary rounded px-3 py-2' name="" >
            <option value="Business Strategy">Business Strategy</option>
            <option value="Human Resources">Human Resources</option>
            <option value="IT Consulting">IT Consulting</option>
            <option value="Financial Planning">Financial Planning</option>
            <option value="Marketing Strategy">Marketing Strategy</option>
            <option value="Operations Management">Operations Management</option>
          </select>
        </div>

        <div className='flex flex-1 flex-col gap-1'>
            <p>Education</p>
            <input onChange={(e)=> setDegree(e.target.value)} value={degree} className='text-black border border-primary rounded px-3 py-2' type="text" placeholder='Education' required />
          </div>
          <div className='flex flex-1 flex-col gap-1'>
            <p>Address</p>
            <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className='text-black border border-primary rounded px-3 py-2' type="text" placeholder='Address Line 1' required />
            <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className='text-black border border-primary rounded px-3 py-2' type="text" placeholder='Address Line 2' required />
          </div>
        </div> 
      </div>

      <div className='mt-4 mb-2'>
        <p>About Consultant</p>
        <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='text-black border border-primary rounded w-full px-4 pt-2' placeholder='Write about consultant' rows={5} />
      </div>
      <button className='bg-primary px-8 py-2 mt-4 text-black rounded-full'>Add Consultant</button>
      </div>      
    </form>
  )
}

export default AddConsultant