import React from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css';
import Home from './Home.tsx';
import Example from './ExampleFile.tsx';
import Login from './Login.tsx'
import DocumentView from './DocumentView';
import TestApiConnection from './TestApiConnection';
import ResetPassword from './ResetPassword';
import TemplateView from "./TemplateView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/reset_password" element={<ResetPassword/>}/>
      <Route path="/doc" element={<DocumentView/>}/>
      <Route path="/doc/:formId" element={<DocumentView/>}/>
      <Route path="/template" element={<TemplateView/>}/>
      <Route path="/template/:formTemplateIdentifier" element={<TemplateView/>}/>
      <Route path="/home" element={<Home/>}/>
      {/*<Route path="/sent" element={<Home/>}/>*/}
      {/*<Route path="/userList" element={<Home/>}/>*/}
      {/*<Route path="/formList" element={<Home/>}/>*/}
      <Route path="/home/:section" element={<Home />} />
    </Routes>
  );
}

export default App;

