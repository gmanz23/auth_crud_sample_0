import React from "react";
import { useNavigate } from 'react-router-dom';

import AuthService from "../services/auth.service";

export default function Logout() {

    const navigate = useNavigate();

    AuthService.logout();

    navigate("/login");
    window.location.reload();   

  return(  
      <div className="col">
        <div className="card card-container">
            <h2>Logging off. Please wait...</h2>
        </div>
    </div>
  )
}