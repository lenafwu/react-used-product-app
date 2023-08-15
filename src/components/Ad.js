import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import QASection from "./QASection";
const AD_URL = "/ad/";

const Ad = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [ad, setAd] = useState();

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
    <div>
      {ad ? (
        <>
          <h2>{ad.title}</h2>
          {auth?.user === ad.postedBy.username && (
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )}
          <p>Posted by: {ad.postedBy.fullname}</p>
          <p>Description: {ad.description}</p>
          <p>Price: {ad.price}</p>
          <QASection
            questions={ad.questions}
            adID={ad._id}
            fetchQuestions={fetchAd}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Ad;
