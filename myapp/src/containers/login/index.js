// import { jwtDecode } from 'jwt-decode';
import {useEffect, useState } from 'react';
import Logo from "../../../public/logo.png"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ErrorAlert from '../../components/ErrorAlert';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://localhost:8000",
})

function Login() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  // const [user, setUser] = useState({});

  useEffect(() => {
    if(error) {
      setIsVisible(true)
    }
  }, error)

  function validateEmail(email) {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    client.post(
      '/api/login',
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      if (res.status === 200) {
        navigate("/homepage");
      } else {
        // Handle error here
        setError("Unable to login");
      }
    }).catch(function (error) {
      // Handle network error
      setError("Unable to reach the server"); 
  });
  }

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var userObject = jwtDecode(response.credential);
  //   console.log(userObject);
  //   // setUser(userObject);
  //   // document.getElementById("signInDiv").hidden = true;
  // }

  // // function handleSignOut(event) {
  // //   setUser({});
  // //   document.getElementById("signInDiv").hidden = false;
  // // }
  // useEffect(() => {
  //   const loadGoogleAPI = () => {
  //     // Check if google is already defined
  //     /* global google */
  //     if (typeof google === 'undefined') {
  //       const script = document.createElement('script');
  //       script.src = 'https://apis.google.com/js/platform.js';
  //       script.async = true;
  //       script.onload = () => {
  //         // Now that Google API is loaded, you can use it
  //         google.accounts.id.initialize({
  //           client_id: "140911216337-hecompldoi9tnk36dc1utr07h86q0khg.apps.googleusercontent.com",
  //           callback: handleCallbackResponse
  //         });
  //         google.accounts.id.renderButton(
  //           document.getElementById("signInDiv"),
  //           { theme: "outline", size: "large", text: "signIn" }
  //         );
  //       };
  //       document.body.appendChild(script);
  //     } else {
  //       // Google API is already loaded, execute your code directly
  //       google.accounts.id.initialize({
  //         client_id: "140911216337-hecompldoi9tnk36dc1utr07h86q0khg.apps.googleusercontent.com",
  //         callback: handleCallbackResponse
  //       });
  //       google.accounts.id.renderButton(
  //         document.getElementById("signInDiv"),
  //         { theme: "outline", size: "large", text: "signIn" }
  //       );
  //     }
  //   };

  //   loadGoogleAPI();
  // }, []); // Empty dependency array means this effect runs only once, like componentDidMount
  //If we have no user: sign in button
  //If we have a user: show log out button
  return (
    <div className='App'>
      {/* <div id='signInDiv'></div> 
      {
        Object.keys(user).length !== 0 && 
        <button className ="sign-out-button" onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      
      { user && 
        <div className='user-info'>
          <img src={user.picture} alt=""></img>
          <h3 className='user-name'>{user.name}</h3>
        </div> 
      } */}

      <div className="min-h-screen py-10 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:mx-auto w-full sm:w-1/3">
          <div
            className=" hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className=" h-3/4 relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:px-20 sm:py-18">

            <div className="max-w-md mx-auto md:min-h-4">
              <div className='flex justify-center'>
                <img src={Logo} alt="logo-healthy-budget" className='h-44' />
              </div>
              <div className="divide-y divide-gray-200">
                <div className="pt-10 py-10 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input aria-autocomplete='none' id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                    {/* {emailError && <div className="text-red-500 text-sm top-full left-0">{emailError}</div>} */}
                  </div>
                  <div className="relative">
                    <input id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div className="relative pt-6">
                    <button className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400" onClick={e => handleSubmit(e)}>Sign In</button>
                  </div>
                  <div className="-m-2 pt-1 flex flex-col justify-center">
                    {/* <div className="flex justify-center font-bold text-blue-600 text-sm cursor-pointer rounded-full" href="#">Forgot password?</div> */}
                    <div className='flex justify-center mt-4 text-xs sm:text-sm'><p className=""> Dont have an account ? <span className="cursor-pointer font-bold text-blue-600 text-sm text-blue-600"> Join free today</span></p></div>
                  </div>
                </div>
              </div>
            </div>
            {error && (<div className='fixed top-0 right-0 m-4 z-50'>
              <ErrorAlert message={error} timeout={5000} isVisible={isVisible} setIsVisible={setIsVisible} resetMessage={setError}/>  
            </div>)}
            {/* <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
              <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
              <hr className="w-full bg-gray-400" />
            </div>
            <div className="w-full flex justify-center">
              <div id='signInDiv'></div> */}
              {/* {
                  Object.keys(user).length !== 0 &&
                  <button className="sign-out-button" onClick={(e) => handleSignOut(e)}>Sign Out</button>
                }

                {user &&
                  <div className='user-info'>
                    <img src={user.picture} alt=""></img>
                    <h3 className='user-name'>{user.name}</h3>
                  </div>
                } */}
              {/* </button> */}
            {/* </div> */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
