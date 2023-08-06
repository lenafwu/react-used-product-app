import { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

const UPDATE_PROFILE_URL = "/api/profile";

const UpdateProfile = () => {
  const { auth } = useAuth();
  console.log();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(UPDATE_PROFILE_URL, {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        setFirstname(response?.data?.user?.firstname);
        setLastname(response?.data?.user?.lastname);
        setAddress(response?.data?.user?.address);
        setPhone(response?.data?.user?.phone);
        setEmail(response?.data?.user?.email);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [auth]);

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
      <h1>Profile</h1>
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
