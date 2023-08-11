import axios from "../api/axios";
import useAuth from "./useAuth";

const LOGOUT_URL = "/api/logout";
const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.get(LOGOUT_URL, { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
