import React from "react"
import { Router, Route, Routes } from "react-router-dom"
import Login from "../login"
import Homepage from "../homepage/index"

const Routers = () => {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>

    </>
  )
}

export default Routers
