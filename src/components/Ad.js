import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import QASection from "./QASection";
import { Link } from "react-router-dom";
const AD_URL = "/ad/";

const Ad = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [ad, setAd] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAd();
  }, [id]);

  const fetchAd = async () => {
    try {
      const response = await axios.get(AD_URL + id);
      setAd(response.data.ad);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ad-container">
      {ad ? (
        <>
          <h2>{ad.title}</h2>
          {auth?.user === ad.postedBy.username && (
            <div className="ad-action-buttons">
              <Link to={`/edit-ad/${ad._id}`}>Edit</Link>
              <Link>Deactivate</Link>
            </div>
          )}
          <p>Posted by: {ad.postedBy.fullname}</p>
          <p>Description: {ad.description}</p>
          <p>Price: {ad.price}</p>
          <p>Start Date: {ad.startDate.split("T")[0]}</p>
          <p>End Date: {ad.expiryDate.split("T")[0]}</p>
          <QASection
            questions={ad.questions}
            adID={ad._id}
            fetchQuestions={fetchAd}
          />
        </>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default Ad;
