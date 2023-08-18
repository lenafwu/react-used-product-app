import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const MyAds = () => {
  const [ads, setAds] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAds = async () => {
      try {
        const response = await axiosPrivate.get("/ad/user");
        setAds(response.data.ads);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getAds();
  }, []);

  return (
    <article className="ads">
      <h2>My Products</h2>
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

export default MyAds;
