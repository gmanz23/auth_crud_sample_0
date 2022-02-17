import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar, Nav, Container } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
 

import AuthService from "./services/auth.service";
import Login from "./components/login";
import Logout from "./components/logout";
import Posts from "./components/posts";

import "./components/app/app.css";

const App = () => {   

    const user = AuthService.getCurrentUser();

    // redirect to login if no session jwt found
    if(!user) {
        return <Login />
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto btn-danger">
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route exact path="/" element={<Navigate replace to="/posts" />} />
                </Routes>                
            </div>
        </div>
    );
}; 
export default App;

