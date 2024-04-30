import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signout } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_PORT,
})

function Navigation({ active, setActive }) {

    const [user, setUser] = useState({});

    useEffect(() => {
            client.get(
                '/api/user'
            ).then(function (res) {
                console.log(res.data.user)
                setUser(res.data.user)
            }).catch(function (error) {
                if (error.response && error.response.status === 403) {
                  // Redirect to login page if 403 error
                  navigate('/login');
                } else {
                  // Handle other errors
                  console.error("Error:", error);
                }
            });
      }, [])


    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        client.post(
            '/api/logout'
        ).then(function (res) {
            navigate("/login");
        })
    }

    return (
        <NavStyled>
          <div className="user-con">
            {user && (
              <>
                <img
                  src={
                    user.profile_photo
                      ? user.profile_photo.slice(user.profile_photo.lastIndexOf("avatars/"))
                      : 'avatars/default.jpeg'
                  }
                  alt=""
                />
                <div className="text">
                    <h2 onClick={() => setActive(6)} style={{cursor: 'pointer'}}>{user.first_name} {user.last_name}</h2>
                    <p>Healthy Budget</p>
                </div>
              </>
            )}
          </div>
          <ul className="menu-items">           
          {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav cursor-pointer" onClick={handleLogout}>
        <li>{signout} Sign Out</li>
      </div>
    </NavStyled>
  );
}

//     return (
//         <NavStyled>
//             <div className="user-con">
//                 <img src={user.profile_photo ? user.profile_photo : "/temp_profile_photo.jpeg" } alt="" />
//                 <div className="text">
//                     <h2 onClick={navigateToProfile} style={{cursor: 'pointer'}}>{user.first_name} {user.last_name}</h2>
//                     <p>Healthy Budget</p>
//                 </div>
//             </div>
//             <ul className="menu-items">
//                 {menuItems.map((item) => {
//                     return (
//                         <li
//                             key={item.id}
//                             onClick={() => setActive(item.id)}
//                             className={active === item.id ? 'active' : ''}
//                         >
//                             {item.icon}
//                             <span>{item.title}</span>
//                         </li>
//                     )
//                 })}
//             </ul>
//             <div className="bottom-nav cursor-pointer" onClick={handleLogout}>
//                 <li>
//                     {signout} Sign Out
//                 </li>
//             </div>
//         </NavStyled>
//     )
// }

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation;