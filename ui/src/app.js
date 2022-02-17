import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
 
// We import all the components we need in our app
import AuthService from "./services/auth.service";
// import Login from "./components/login.component";
import Login from "./components/login/login";
import Posts from "./components/posts";
// import Dashboard from "./components/dashboard";
// import useToken from './components/app/useToken';

import "./components/app/app.css";

const App = () => {   

    const user = AuthService.getCurrentUser();

    if(!user) {
        return <Login />
    }

    return (
        <div>            
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route exact path="/" element={<Navigate replace to="/posts" />} />
                </Routes>
            </div>
        </div>
    );
}; 
export default App;

