import React,{useContext, useEffect} from 'react'
import { ConsultantContext } from '../../context/ConsultantContext';
import { assets } from "../../assets/assets";

const ConsultantDashboard = () => {

  const {cToken, setDashData,slotDateFormat, getDashData, dashData,completeAppointment, cancelAppointment } = useContext(ConsultantContext);
  // console.log(dashData.clients)  

  useEffect(()=>{
    getDashData()
  },[cToken])

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-gray  bg-opacity-10 p-4 min-w-72 rounded border-2 border-primary cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-200">
              ₹ {dashData.earnings}
              </p>
              <p className="text-gray-100">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray  bg-opacity-10 p-4 min-w-72 rounded border-2 border-primary cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-200">
                {dashData.appointments}
              </p>
              <p className="text-gray-100">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray  bg-opacity-10 p-4 min-w-72 rounded border-2 border-primary cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.clients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-200">
                {dashData.clients}
              </p>
              <p className="text-gray-100">Clients</p>
            </div>
          </div>
        </div>

        <div className=" ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-primary">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointments</p>
          </div>

          <div className="border border-primary">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 border-b border-primary  hover:bg-primary hover:bg-opacity-10"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-200 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-100">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default ConsultantDashboard