import React from "react"
import { Router, Route, Routes } from "react-router-dom"
import Login from "../login"
import Homepage from "../homepage/index"
import Register from "../register"

// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");



const Routers = () => {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
        </Routes>

    </>
  )
}

export default Routers
