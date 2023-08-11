import { useState, useEffect } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";
import { Link } from "react-router-dom";

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
          {ads.map((ad) => (
            <li key={ad._id}>
              <p>Title: {ad?.title}</p>
              <p>Description: {ad?.description}</p>
              <p>Posted by: {ad?.postedBy.fullname}</p>
              <p>Price: {ad?.price}</p>
              <Link className="line" to={`/ad/${ad._id}`}>
                Detail
              </Link>
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
