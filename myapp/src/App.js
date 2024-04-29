// import React, {useEffect} from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Routers from "./containers/routes";


// const App = () => (
//   <>
//     <div className="bg-background flex flex-col bg-cover min-h-screen bg-center">
//       <Routes>
//         <Route exact path="" element={<Navigate to="/login" />} />
//         <Route path="/*" element={<Routers />} />
//       </Routes>
//     </div>
//   </>
// )

// export default App

import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Routers from "./containers/routes";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://localhost:8000",
})

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      client.post(
        '/api/logout'
      ).then(function (res) {
        <Navigate to="/login" />
      })
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className="bg-background flex flex-col bg-cover min-h-screen bg-center">
        <Routes>
          <Route exact path="" element={<Navigate to="/login" />} />
          <Route path="/*" element={<Routers />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
