import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Routers from "./containers/routes";


const App = () => (
  <>
    <div className="bg-background flex flex-col bg-cover min-h-screen bg-center">
      <Routes>
        <Route exact path="" element={<Navigate to="/login" />} />
        <Route path="/*" element={<Routers />} />
      </Routes>
    </div>
  </>
)

export default App