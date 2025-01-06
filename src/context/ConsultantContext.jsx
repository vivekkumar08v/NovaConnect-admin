import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const ConsultantContext = createContext()

const ConsultantContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [cToken, setCToken] = useState(localStorage.getItem('cToken')?localStorage.getItem('cToken'):'')
    // console.log(cToken)

    const [appointments,setAppointments] = useState([])
    const [dashData, setDashData] =useState(false)
    const [profileData, setProfileData] = useState(false)


    const months =["","Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug","Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) =>{
        if (typeof slotDate !== "string") {
            console.error("Invalid slotDate:", slotDate);
            return "Invalid Date";
          }
        const dateArray = slotDate.split('-');
        if (dateArray.length !== 3) {
            console.error("Unexpected date format:", slotDate);
            return "Invalid Date";
          }
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
      };

    const getAppointments =async() =>{
        try {
            
            const {data} = await axios.get(backendUrl + 'api/consultant/appointments', {headers:{cToken}})
            if(data.success)
            {
                setAppointments(data.appointments)
                //  console.log(data.appointments)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const completeAppointment = async(appointmentId) =>{
        try {

            const {data} = await axios.post(backendUrl + 'api/consultant/complete-appointment', {appointmentId},{headers:{cToken}})
            
            if(data.success)
                {
                    toast.success(data.message)
                    getAppointments()
                }
                else{
                    toast.error(data.message)
                }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    

    const cancelAppointment = async(appointmentId) =>{
        try {

            const {data} = await axios.post(backendUrl + 'api/consultant/cancel-appointment', {appointmentId},{headers:{cToken}})
            
            if(data.success)
                {
                    toast.success(data.message)
                    getAppointments()
                }
                else{
                    toast.error(data.message)
                }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + 'api/consultant/dashboard', {headers:{cToken}})

            if(data.success)
            {
                setDashData(data.dashData) 
                // console.log(data.dashData.clients)
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfileData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + 'api/consultant/profile', {headers:{cToken}})

            if(data.success)
            {
                setProfileData(data.profileData) 
                console.log(profileData)
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value ={

        cToken, setCToken, 
        backendUrl,getAppointments,appointments,slotDateFormat,
        cancelAppointment, completeAppointment,
        dashData, setDashData, getDashData, profileData, getProfileData, setProfileData
    }

    return (
        <ConsultantContext.Provider value={value}>
            {props.children}
        </ConsultantContext.Provider>
    )
}

export default ConsultantContextProvider