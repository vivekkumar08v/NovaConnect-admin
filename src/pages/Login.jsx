import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ConsultantContext } from "../context/ConsultantContext";

const Login = () => {
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const {setCToken} = useContext(ConsultantContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
      else{
        const {data} = await axios.post(backendUrl+'api/consultant/login', {email, password})

        if(data.success){
          localStorage.setItem("cToken", data.token)
          // console.log(data.token)
          setCToken(data.token);
        }
        else{
          toast.error(data.message);
        }
      }

    } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[100vh] flex items-center">
      <div className="flex flex-col items-start gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border border-primary rounded-xl text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-primary rounded w-full mt-1 p-2 text-black"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-primary rounded w-full mt-1 p-2 text-black"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-black w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Consultant Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Consultant")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
