import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "140911216337-hecompldoi9tnk36dc1utr07h86q0khg.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large", text: "signIn" }
    );
  }, [])
  //If we have no user: sign in button
  //If we have a user: show log out button
  return (
    <div className='App'>
      <div id='signInDiv'></div> 
      {
        Object.keys(user).length !== 0 && 
        <button className ="sign-out-button" onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      
      { user && 
        <div className='user-info'>
          <img src={user.picture}></img>
          <h3 className='user-name'>{user.name}</h3>
        </div> 
      }
    </div>
  );
}

export default App;
