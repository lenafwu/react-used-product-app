import { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

const UPDATE_PROFILE_URL = "/api/profile";

const UpdateProfile = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState(auth.user?.firstname || "");
  const [lastname, setLastname] = useState(auth.user?.lastname || "");
  const [address, setAddress] = useState(auth.user?.address || "");
  const [email, setEmail] = useState(auth.user?.email || "");
  const [phone, setPhone] = useState(auth.user?.phone || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        UPDATE_PROFILE_URL,
        JSON.stringify({
          firstname,
          lastname,
          address,
          phone,
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(response?.data);
      navigate("/profile");

      // TODO: check if update is successful
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
