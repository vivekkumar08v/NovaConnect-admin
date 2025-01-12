import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Route, Routes} from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard';
import AllAppointments from './pages/admin/AllAppointments';
import AddConsultant from './pages/admin/AddConsultant';
import ConsultantList from './pages/admin/ConsultantList';
import 'react-toastify/dist/ReactToastify.css';
import { ConsultantContext } from './context/ConsultantContext';
import ConsultantDashboard from './pages/Consultant/ConsultantDashboard';
import ConsultantAppointments from './pages/Consultant/ConsultantAppointments';
import ConsultantProfile from './pages/Consultant/ConsultantProfile';

const App = () => {

  const {aToken} =useContext(AdminContext)
  const {cToken} =useContext(ConsultantContext)

  return aToken || cToken ? (
    <div className='bg-bg_color text-white'>
    <ToastContainer/>
    <Navbar/>
    <div className='flex items-start'>
      <Sidebar/>
      <Routes basename ="">
        <Route path='/login' element={<Login/>} />
        {/* Admin Route */}
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/all-appointments' element={<AllAppointments/>}/>
        <Route path='/add-consultant' element={<AddConsultant/>}/>
        <Route path='/consultant-list' element={<ConsultantList/>}/>

        {/* Consultant Route */}
        <Route path='/consultant-dashboard' element={<ConsultantDashboard/>}/>
        <Route path='/consultant-appointments' element={<ConsultantAppointments/>}/>
        <Route path='/consultant-profile' element={<ConsultantProfile/>}/>
      </Routes>
    </div>
    </div>
  ):(
    <div className='bg-bg_color text-white'>
     <Login/>
     <ToastContainer/>
    </ div>
  )
}

export default App