import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './Home'
import NavBar from './components/NavBar';
import loginImage1 from "./Images/LoginImage1.png"
import loginImage2 from "./Images/LoginImage2.png"

export interface LoginInfo {
  username: string;
  password: string;
}

export const Login = () => {
  const thingamajig = (num: number) => {
    // do stuff
    return num;
  }

  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ username: "", password: "" });
  const [error, setError] = useState("")

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  }

  const handleBlur = (): string => {
    let errorText = "";
    if(loginInfo.username == ""){
      errorText = "Username can not be empty";
    }
    else if (loginInfo.password == ""){
      errorText = "Password can not be empty";
    }
    else{
      errorText = "";
    }

    setError(errorText);
    return errorText;
  }

  return (
    <div>
      <div className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
              <NavBar username={"Placeholder"} showAccount={false}/>
            </div>
      <div className="grid grid-cols-3 h-screen">
        <div>
          <img src={loginImage1} alt="Sidebar Image" className="w-full h-full object-cover"/>
        </div>
        <div className="grid grid-rows-5">
          <div className="row-span-3 flex flex-col">
            <div className="text-center text-5xl font-sans m-5 mt-30">
              Log into SwiftForms
            </div>
            <div className="text-xl font-sans m-5">
              Username
            </div>
            <input className="flex border-2 mx-5" type="text" name="username" value={loginInfo.username} onChange={handleInputChange} onBlur={handleBlur}/>
            <div className="text-xl font-sans m-5">
              Password
            </div>
            <input className="flex border-2 mx-5" type="text" name="password" value={loginInfo.password} onChange={handleInputChange} onBlur={handleBlur} />
            <div className="m-5 flex">
              <button onClick={() => {
                if(!handleBlur()){
                  navigate("/home", { state: loginInfo });
                }
              }}
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit">Log In</button>
            </div>
          {error && <p className="mx-5 text-red-500">{error}</p>}
          </div>
        </div>
        <div>
          <img src={loginImage2} alt="Sidebar Image" className="w-full h-full object-cover"/>
        </div>
      </div>
    </div>


  )
};

export default Login;