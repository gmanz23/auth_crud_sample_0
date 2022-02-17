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

        // validate token // display error message (setMessage)

        AuthService.setToken(token);

        // remember previous location - for now send to posts
        navigate("/posts");
        window.location.reload();
        //setIsLoading(false)
    }



  return(
    // <div className="login-wrapper">
    //     <h1>Please Log In</h1>
    //     <form onSubmit={handleSubmit}>
    //         <label>
    //             <p>Username</p>
    //             <input type="text" onChange={e => setUserName(e.target.value)} />
    //         </label>
    //         <label>
    //             <p>Password</p>
    //             <input type="password" onChange={e => setPassword(e.target.value)} />
    //         </label>
    //         <div>
    //             <button type="submit">Submit</button>
    //         </div>
    //     </form>
    // </div>

    <div className="col-md-12">
        <div className="card card-container">
            <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control"
                        name="username"
                        onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"
                        name="password"
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    {/* <button type="submit" className="btn btn-primary btn-block" disabled={isLoading} onClick={buttonHandler}>  */}
                    {/* <button type="submit" className="btn btn-primary btn-block" disabled={isLoading} onClick={buttonHandler} >
                        {isLoading && (<span className="spinner-border spinner-border-sm"></span>)}
                        <span>Login</span>
                    </button> */}
                    <br/>
                    <button type="submit" className="btn btn-primary btn-block" >
                        <span>Login</span>
                    </button>
                </div>
                
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                
                {/* <CheckButton style={{ display: "none" }}
                    ref={c => { this.checkBtn = c;}} /> */}
            </form>
        </div>
    </div>
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   };