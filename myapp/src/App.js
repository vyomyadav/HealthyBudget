import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import Orb from "./components/Orb/Orb"
import HomePage from "./containers/homePage"
import Routers from "./containers/routes"


const App = () => (
  <>
    <div className="bg-background flex flex-col bg-cover min-h-screen bg-center">
      <Orb />
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route exact path="" element={<Navigate to="/login" />} />
        <Route path="/*" element={<Routers />} />
      </Routes>
    </div>
  </>
)

export default App