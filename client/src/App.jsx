import './App.css'
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
function App() {
  const token = localStorage.getItem("token")
  return (
    <>
      <div>
        <ToastContainer autoClose={1500} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              token ? <HomePage /> : <LoginPage />
            } />


            {/* <Route path="/" element={<HomePage />} /> */}

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
