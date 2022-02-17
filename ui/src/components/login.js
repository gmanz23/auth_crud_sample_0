import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import AuthService from "../services/auth.service";

export default function Login() {

    const navigate = useNavigate();


    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();

    // login submit function
    const handleSubmit = async e => {
        e.preventDefault();

        const token = await AuthService.login(username,password);       

        if (token.error) {
            // set error message
            setMessage(token.error);
        }
        else {
            
            AuthService.setToken(token);

            // remember previous location - for now send to posts
            navigate("/posts");
            window.location.reload();            
        }
    }

  return(  
    <div className="col">
        <div className="card card-container">
            <img src="/logo192.png" alt="profile-img" className="profile-img-card"/>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control"
                        name="username"
                        onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"
                        name="password"
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <br/>
                <div className="mb-3">                    
                    <button type="submit" className="btn btn-primary" >
                        <span>Login</span>
                    </button>
                </div>
                <br/>
                {message && (
                    <div className="mb-3">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </form>
        </div>
    </div>
  )
}