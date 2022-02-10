import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
 
 
// We import all the components we need in our app
import Login from "./components/login/login";
import Dashboard from "./components/dashboard";
import useToken from './components/app/useToken';

// import Navbar from "./components/navbar";
// import RecordList from "./components/recordList";
// import Edit from "./components/edit";
// import Create from "./components/create";


const App = () => {

    const apiUrl = "http://localhost:5000/"

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div>            
            <div className="wrapper">
                <h1>BookFace</h1>
                <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </div>
    );
};
 
export default App;