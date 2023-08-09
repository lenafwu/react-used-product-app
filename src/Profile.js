import useAuth from "./hooks/useAuth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./api/axios";

const LOGIN_URL = "/api/profile";
const Profile = () => {
  const { auth } = useAuth();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(LOGIN_URL, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        });
        setUserProfile(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [auth]);

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {userProfile.username}</p>
      <p>Name: {userProfile.firstname + " " + userProfile.lastname}</p>
      <p>Address: {userProfile.address}</p>
      <p>Email: {userProfile.email}</p>
      <p>Phone: {userProfile.phone}</p>
      <p>Created: {new Date(userProfile.created).toLocaleDateString()}</p>
      <Link to="/update-profile">
        <button>Update</button>
      </Link>
    </div>
  );
};

export default Profile;
