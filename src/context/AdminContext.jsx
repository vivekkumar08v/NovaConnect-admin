import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken,setAToken] =useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [consultants, setConsulatnts] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllConsultants =async() => {
        try {
            
            const {data} = await axios.post(backendUrl + 'api/admin/all-consultants',{}, {headers:{aToken}})
            if(data.success) {
                setConsulatnts(data.consultants)
            //     console.log(data.consultants);             
            } 
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async(consId) =>{
        try {
            
            const {data} = await axios.post(backendUrl + 'api/admin/change-availability', {consId},{headers:{aToken}})

            if(data.success)
            {
                toast.success(data.message)
                getAllConsultants()
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast(error.message)
        }
    }

    const getAllAppointments = async()=>{
        try {
            
            const {data} = await axios.get(backendUrl + 'api/admin/appointments', {headers:{aToken}})

            if(data.success){
                setAppointments(data.appointments)
                // console.log(data.appointments)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast(error.message)
        }
    }

    const cancelAppointment = async(appointmentId) =>{
        try {
            
            const {data} = await axios.post(backendUrl + 'api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}})

            if(data.success){
                toast.success(data.message)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast(error.message)
        }
    }

    const getDashData = async()=>{
        try {
            
            const {data} = await axios.get(backendUrl + 'api/admin/dashboard', {headers:{aToken}})

            if(data.success)
            {
                setDashData(data.dashData)
                
                // console.log(data.dashData.latestAppointments[0].consData.name)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast(error.message)
        }
    }

    const value ={
        aToken,setAToken,
        backendUrl, consultants, getAllConsultants, changeAvailability,
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData, getDashData

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider