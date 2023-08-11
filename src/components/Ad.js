import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import QASection from "./QASection";
const AD_URL = "/ad/";

const Ad = () => {
  const { id } = useParams();
  const [ad, setAd] = useState();
  const [questions, setQuestions] = useState();

  useEffect(() => {
    // const getAd = async () => {
    //   try {
    //     const response = await axios.get(AD_URL + id);
    //     setAd(response.data.ad);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getAd();
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
