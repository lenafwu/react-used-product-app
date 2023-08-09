import { useState, useEffect } from "react";
import axios from "./api/axios";
import useRefreshToken from "./hooks/useRefreshToken";

const ADS_URL = "/ad";
const Ads = () => {
  const [ads, setAds] = useState();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // cancel request
    const getAds = async () => {
      try {
        const response = await axios.get(ADS_URL, {
          signal: controller.signal,
        });
        isMounted && setAds(response.data.ads);
      } catch (err) {
        console.log(err);
      }
    };

    getAds();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article className="ads">
      <button onClick={() => refresh()}>Refresh Token</button>
      <h2>Ads list</h2>
      {ads?.length ? (
        <ul>
          {ads.map((ad, i) => (
            <li key={i}>
              <p>Title: {ad?.title}</p>
              <p>Description: {ad?.description}</p>
              {/* TODO: change posted by to username */}
              <p>Posted by: {ad?.postedBy}</p>
              <p>Price: {ad?.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ads found</p>
      )}
    </article>
  );
};

export default Ads;
