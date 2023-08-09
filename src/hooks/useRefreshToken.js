import axios from "../api/axios";
import useAuth from "./useAuth";

const REFRESH_TOKEN_URL = "/api/refresh";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_TOKEN_URL, {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(prev);
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
