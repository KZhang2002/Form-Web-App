import React from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css';
import Home from './Home.tsx';
import Example from './ExampleFile.tsx';
import Login from './Login.tsx'
import DocumentView from './DocumentView';
import TestApiConnection from './TestApiConnection';
import ResetPassword from './ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/reset_password" element={<ResetPassword/>}/>
      <Route path="/doc" element={<DocumentView/>}/>
      <Route path="/home" element={<Home/>}/>
      {/*<Route path="/sent" element={<Home/>}/>*/}
      {/*<Route path="/userList" element={<Home/>}/>*/}
      {/*<Route path="/formList" element={<Home/>}/>*/}
      <Route path="/home/sent" element={<Home />} />
      <Route path="/home/userList" element={<Home />} />
      <Route path="/home/formList" element={<Home />} />
    </Routes>
  );
}

export default App;

