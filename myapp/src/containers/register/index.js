import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import Logo from "../../../public/logo.png"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import Validation from './registerValidation';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://localhost:8000",
})

function Register() {
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const handleInput = (event) => {
    setFormValues(prev => ({
      ...prev, 
      [event.target.name]: event.target.value,
    }));
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { password: enteredPassword, confirmPassword } = formValues;
    if (enteredPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setErrors(Validation(formValues));
    if (Object.values(errors).some(error => error !== "")) {
      // There are errors, handle them or prevent form submission
      return;
    }  
    // Proceed with form submission
    axios.post('http://localhost:8000/api/register', formValues)
      .then(res => {
        console.log("Registered");
        navigate('/login'); // redirect to log in page
      })
      .catch(err => console.log(err));
  };
    
    // const { email, password } = formValues;
    // client
    //   .post(
    //   '/api/register',
    //   {
    //     email,
    //     password,
    //   }
    // ).then(() => {
    //   console.log("Registered");
    //   navigate('/login');
    // })
    //   .catch((error) => {
    //   console.log(error);
    // });

  return (
    <div className="App">
      <div className="min-h-screen py-10 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:mx-auto w-full sm:w-1/3">
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="h-3/4 relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:px-20 sm:py-18">
            <div className="max-w-md mx-auto md:min-h-4">
              <div className="flex justify-center">
                <img
                  src={Logo}
                  alt="logo-healthy-budget"
                  className="h-44"
                />
              </div>
              <div className="banner">Register for Healthy Budget</div>
              <div className="divide-y divide-gray-200">
                <div className="pt-10 py-10 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Username"
                      value={formValues.first_name}
                      onChange={handleInput}
                    />
                    <label
                      htmlFor="first_name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      First Name
                    </label>
                    {/* {errors.username && (
                      <span className="text-danger"> {errors.email}</span>
                    )} */}
                  </div>
                  <div className="relative">
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Username"
                      value={formValues.last_name}
                      onChange={handleInput}
                    />
                    <label
                      htmlFor="last_name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                    {/* {errors.username && (
                      <span className="text-danger"> {errors.email}</span>
                    )} */}
                  </div>
                <div className="relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Username"
                      value={formValues.username}
                      onChange={handleInput}
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Username
                    </label>
                    {/* {errors.username && (
                      <span className="text-danger"> {errors.email}</span>
                    )} */}
                  </div>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={formValues.email}
                      onChange={handleInput}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    {errors.email && (
                      <span className="text-danger"> {errors.email}</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={formValues.password}
                      onChange={handleInput}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    {errors.password && (
                      <span className="text-danger"> {errors.password}</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Confirm Password"
                      value={formValues.confirmPassword}
                      onChange={handleInput}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="relative pt-6">
                    <button
                      className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                  </div>
                  <div className="-m-2 pt-1 flex flex-col justify-center">
                    <div className="flex justify-center mt-4 text-xs sm:text-sm">
                      <p className="">
                        Already have an account ?{' '}
                        <Link to="../login">
                          <span className="cursor-pointer font-bold text-blue-600 text-sm text-blue-600">
                            Sign in
                          </span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  // const navigate = useNavigate();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }
  //   setErrors(registerValidation(values));
  //   client.post(
  //     '/api/register',
  //     {
  //       email: email,
  //       password: password
  //     }
  //   ).then(function (res) {
  //     console.log("Registered")

  //     // After successful registration, store the user data in local storage or context
  //     // could decode the JWT token here if needed
  //     // var userObject = jwtDecode(res.data.token);
  //     // localStorage.setItem('user', JSON.stringify(userObject));
  //     navigate('/login');
  //   }).catch(function (error) {
  //     console.log(error);
  //   })
  // }

//   return (
    
//     <div className='App'>
//       <div className="min-h-screen py-10 flex flex-col justify-center sm:py-12">
//         <div className="relative py-3 sm:mx-auto w-full sm:w-1/3">
//           <div
//             className="hidden sm:block absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
//           </div>
//           <div className="h-3/4 relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:px-20 sm:py-18">
//             <div className="max-w-md mx-auto md:min-h-4">
//               <div className='flex justify-center'>
//                 <img src={Logo} alt="logo-healthy-budget" className='h-44' />
//               </div>
//               <div className="banner"> Register for Healthy Budget</div>
//               <div className="divide-y divide-gray-200">
//                 <div className="pt-10 py-10 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                   <div className="relative">
//                     <input id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" onChange={handleInput} />
//                     <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
//                     {errors.email && <span className='text-danger'> {errors.email}</span>}
//                   </div>
//                   <div className="relative">
//                     <input id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" onChange={handleInput} />
//                     <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
//                     {errors.password && <span className='text-danger'> {errors.password}</span>}
//                   </div>
//                   <div className="relative">
//                     <input id="confirmPassword" name="confirmPassword" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Confirm Password" onChange={handleInput} />
//                     <label htmlFor="confirmPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
//                   </div>
//                   <div className="relative pt-6">
//                     <button className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400" onClick={e => handleSubmit(e)}>Register</button>
//                   </div>
//                   <div className="-m-2 pt-1 flex flex-col justify-center">
//                     <div className='flex justify-center mt-4 text-xs sm:text-sm'><p className=""> Already have an account ? <Link to="../login"> <span className="cursor-pointer font-bold text-blue-600 text-sm text-blue-600"> Sign in</span></Link></p></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative pt-6">
//         <button className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400" onClick={e => handleSubmit(e)}>Register</button>
//       </div>
//       <div className="-m-2 pt-1 flex flex-col justify-center">
//         <div className='flex justify-center mt-4 text-xs sm:text-sm'><p className=""> Already have an account ? <Link to="../login"> <span className="cursor-pointer font-bold text-blue-600 text-sm text-blue-600"> Sign in</span></Link></p></div>
//       </div>



//     </div>
//   );
// }

// export default Register;
