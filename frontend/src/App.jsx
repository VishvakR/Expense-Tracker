import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Expense from './pages/Dashboard/Expense'
import Income from './pages/Dashboard/Income'
import UserProvider from './context/userContext'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={ <Root /> } />
            <Route path='/login' exact element={ <Login /> } />
            <Route path='/signup' exact element={ <SignUp /> } />
            <Route path='/dashboard' exact element={ <Home /> } />
            <Route path='/expense' exact element={ <Expense /> } />
            <Route path='/income' exact element={ <Income /> } />
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize:'13px'
          },
        }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Navigate to='/dashboard' /> : <Navigate to="/login" />;
}