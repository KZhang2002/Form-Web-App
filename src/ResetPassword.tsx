import React, {ChangeEvent, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './Home'
import NavBar from './components/NavBar';
import loginImage1 from "./Images/LoginImage1.png"
import loginImage2 from "./Images/LoginImage2.png"
import { UserControllerApi } from './typing/apis/UserControllerApi';

export interface LoginInfo {
  username: string;
  password: string;
}

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState<string>();

  const location = useLocation();
  const loginInfo: LoginInfo = location.state || {};

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setNewPassword(value);
  }

  const handleBlur = (): string => {
    let errorText = "";
    if (loginInfo.password == "") {
      errorText = "Password can not be empty";
    } else {
      errorText = "";
    }

    setError(errorText);
    return errorText;
  }

  const handleReset = async () => {
    if (handleBlur()) return;

    setLoading(true);
    try {
      const api = new UserControllerApi();
      api.changeUserPassword({ changeUserPasswordRequest: { username: loginInfo.username, password: newPassword }});

      setLoading(false);
      navigate("/home", {state: loginInfo});
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div
        className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
        <NavBar username={"Placeholder"} showAccount={false}/>
      </div>
      <div className="grid grid-cols-3 h-screen">
        <div>
          <img src={loginImage1} alt="Sidebar Image" className="w-full h-full object-cover"/>
        </div>
        <div className="grid grid-rows-5">
          <div className="row-span-3 flex flex-col">
            <div className="text-center text-5xl font-sans m-5 mt-30">
              Reset Password
            </div>
            <div className="text-xl font-sans m-5">
              New Password
            </div>
            <input className="flex border-2 mx-5" type="text" name="password" value={newPassword}
                   onChange={handleInputChange} onBlur={handleBlur}/>
            <div className="m-5 flex">
              <button
                onClick={handleReset}
                disabled={loading}
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit"
              >
                {loading ? 'Logging In...' : 'Set Password'}
              </button>
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

export default ResetPassword;