import React from "react"
import { Router, Route, Routes } from "react-router-dom"
import Login from "../login"

const Routers = () => {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

    </>
  )
}

export default Routers
