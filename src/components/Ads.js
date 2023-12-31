import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { Link } from "react-router-dom";

const ADS_URL = "/ad";
const Ads = () => {
  const [ads, setAds] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // cancel request
    const getAds = async () => {
      try {
        // const response = await axios.get(ADS_URL, {
        //   signal: controller.signal,
        // });
        const response = await axiosPrivate.get(ADS_URL, {
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
      <h2>Products on Sale</h2>
      {ads?.length ? (
        <ul>
          {ads.map((ad, i) => (
            <li key={i}>
              <div className="product-picture">
                <img src="color-placeholder.png" alt="" />
              </div>
              <div className="info-container">
                <p className="product-price">${ad?.price}</p>
                <p className="product-title">{ad?.title}</p>
                <p className="product-poster">
                  Posted by: {ad?.postedBy.fullname}
                </p>
                <p className="product-description">{ad?.description}</p>
                {ad?.isActive ? <p>Active</p> : <p>Inactive</p>}
                <Link className="line" to={`/ad/${ad._id}`}>
                  Detail
                </Link>
              </div>
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
