import React, { useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';


//import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

import "./login.css"

// async function loginUser(credentials) {

//     return fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     }).then(data => data.json());
// }

export default function Login({ setToken }) {

    const navigate = useNavigate();


    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    //const [isLoading, setIsLoading] = useState(false)

    // const buttonHandler = () => {
    //     setIsLoading(current => !current)
    // }

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
            <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>

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

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   };