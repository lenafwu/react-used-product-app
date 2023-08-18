import axios from "../api/axios";
import useAuth from "./useAuth";

const REFRESH_TOKEN_URL = "/api/refresh";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_TOKEN_URL, {
      withCredentials: true,
    });
    setAuth((prev) => {
      // console.log(`prev: ${JSON.stringify(prev)}`);
      //   console.log(`token refreshed: ${JSON.stringify(response.data)}`);
      return {
        ...prev,
        // important: must set user here, otherwise persist login will not work, user state is fetched from server, not kept in anywhere in client
        user: response.data.user,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
