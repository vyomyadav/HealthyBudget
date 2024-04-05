import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import Routers from "./containers/routes"
import { GlobalStyles } from "./styles/GlobalStyles"


const App = () => (
  <> 
    <GlobalStyles />
    <div className="bg-background flex flex-col bg-cover min-h-screen bg-center">
      <Routes>
        <Route exact path="" element={<Navigate to="/login" />} />
        <Route path="/*" element={<Routers />} />
      </Routes>
    </div>
  </>
)

export default App