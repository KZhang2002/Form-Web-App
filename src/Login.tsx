import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './Home'
import NavBar from './components/NavBar';

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div>
      <div className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
              <NavBar username={"Placeholder"} showAccount={false}/>
            </div>
      <div className="grid grid-cols-3 h-screen">
        <div className="bg-blue-500">
        </div>
        <div className="grid grid-rows-5">
          <div className="bg-gray-500">
          </div>
          <div className="row-span-3 flex flex-col">
            <div className="text-center text-5xl font-sans m-5">
              Log into SwiftForms
            </div>
            <div className="text-xl font-sans m-5">
              Username
            </div>
            <input className="flex border-2 mx-5" type="text" name="username" value={loginInfo.username} onChange={handleInputChange} />
            <div className="text-xl font-sans m-5">
              Password
            </div>
            <input className="flex border-2 mx-5" type="text" name="password" value={loginInfo.password} onChange={handleInputChange} />
            <div className="mt-auto flex justify-center">
              <button onClick={() => navigate("/home", { state: loginInfo })}
                className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit">Log In</button>
            </div>

          </div>
          <div className="bg-gray-500">
          </div>
        </div>
        <div className="bg-blue-500">
        </div>
      </div>
    </div>


  )
};

export default Login;