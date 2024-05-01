import React, { useEffect, useState } from "react";
import axios from "axios";
import { InnerLayout } from "../../styles/Layouts";
import styled, { css } from 'styled-components';
import { useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_PORT}`,
  withCredentials: true,
})

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
    
  }
`;

const FormColumn = styled.div`
  width: calc(50% - 10px);
  
  &:first-child {
    margin-right: 20px;
  }
  ${props =>
    props.isEditing &&
    css`
      input:focus,
      input:hover {
        outline: none;
        border-color: rgba(234, 76, 137, 0.4);
        background-color: #fff;
        box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
      }
    `}  
`;




const EditProfileButton = styled.button`
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #23c483;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;


const ProfilePhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const ProfilePhoto = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: #4caf50;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

function Profile() {

    const [user, setUser] = useState({});
    
    const navigate = useNavigate();
    useEffect(() => {
        client.get(
            '/api/user'
        ).then(function (res) {
            setUser(res.data.user)
            setProfile({
                first_name: res.data.user.first_name,
                last_name: res.data.user.last_name,
                email: res.data.user.email,
                phone_number: res.data.user.phone_number,
                country: "USA", // Assuming default value is USA
                currency: "USD", // Assuming default value is USD
                profile_photo: res.data.user.profile_photo, // Assuming profile_photo is the correct field
            });
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
    
    

    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        profilePhoto: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handleSaveChanges = () => {
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
        client.put('/api/user', profile)
            .then(response => {
                console.log(response.data);
                setIsEditing(false);
            })
            .catch(error => {
                console.error("Error updating profile:", error);
                setIsEditing(false);
            });
    };

   

    const handleUploadPhoto = (e) => {
        const file = e.target.files[0];
        setProfile((prevProfile) => ({ ...prevProfile, profilePhoto: file }));
    };
    console.log("isEditing:", isEditing);
    return (
        
        <IncomeStyled>
        <InnerLayout>
            <ProfilePhotoWrapper>
            
            <ProfilePhoto>
                {user.profile_photo ? (
                <img
                    src={user.profile_photo.slice(user.profile_photo.lastIndexOf("avatars/"))}
                    alt="Profile"
                />
                ) : (
                  <img
                  src='avatars/default.jpeg'
                  alt="Profile"
                   />
                )}
                {isEditing && <input type="file" onChange={handleUploadPhoto} />}
            </ProfilePhoto>
            </ProfilePhotoWrapper>
            <FormRow>
            <FormColumn isEditing={isEditing}>
                <div className="form-group">
                <label>First Name:</label>
                <input
                    class="input"
                    type="text"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    isEditing={isEditing}
                    
                    />
                </div>
            </FormColumn>
            <FormColumn isEditing={isEditing}>
                <div className="form-group">
                <label>Last Name:</label>
                <input
                    type="text"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                </div>
            </FormColumn>
            </FormRow>
            <FormRow>
            <FormColumn isEditing={isEditing}>
                <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    
                    disabled={!isEditing}
                />
                </div>
            </FormColumn>
            <FormColumn isEditing={isEditing}>
                <div className="form-group">
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone_number"
                    value={profile.phone_number}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                </div>
            </FormColumn> 
            </FormRow>
            <FormRow>
            <FormColumn isEditing={isEditing}>
                <div className="form-group">
                <label>Country:</label>
                <input
                    type="text"
                    name="country"
                    value="USA"
                    disabled={!isEditing}
                />
                </div>
            </FormColumn>
            <FormColumn isEditing={isEditing}>
                <div className="form-group">
                <label>Currency:</label>
                <input
                    type="text"
                    name="currency"
                    value="USD"
                    disabled={!isEditing}
                />
                </div>
            </FormColumn>
            </FormRow>
            {/* <div className="form-group">
            <EditProfileButton onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}>
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </EditProfileButton>
            </div> */}
        
        </InnerLayout>
        </IncomeStyled>
    );
}



const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    
    

    .form-group {
        margin-bottom: 2rem;
        
        label {
            font-weight: bold;
        }
        input {
            display: flex;
            
            padding: 0.5rem;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            outline: none;
            box-shadow: 0 0.2rem #dfd9d9;
            width: 75%;
            
        }
        
    }
`;

export default Profile;