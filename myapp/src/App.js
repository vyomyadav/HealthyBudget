import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import Routers from "./containers/routes"
import UserProfileCard from "./containers/user-profile/UserprofileCard/UserProfileCard";


function App() {
  return (
    <div className="App">
      <UserProfileCard/>
    </div>
  );
  }

export default App