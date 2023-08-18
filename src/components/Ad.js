import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import QASection from "./QASection";
import ConfirmModal from "./ConfirmModal";
import { Link } from "react-router-dom";
const AD_URL = "/ad/";

const Ad = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [ad, setAd] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleAdActivation = async () => {
    const updatedAd = { ...ad, isActive: !ad.isActive };
    try {
      const response = await axiosPrivate.put(AD_URL + id, updatedAd);
      setAd(updatedAd);
    } catch (err) {
      console.log(err);
    }

    closeModal();
  };

  const handleActivateButtonClick = () => {
    if (ad?.isActive) {
      openModal();
    } else {
      toggleAdActivation();
    }
  };

  return (
    <div className="ad-container">
      {ad ? (
        <>
          <h2>{ad.title}</h2>
          <img src="/color-placeholder.png" alt="" />
          {auth?.user === ad.postedBy.username && (
            <div className="ad-action-buttons">
              <Link to={`/edit-ad/${ad._id}`}>Edit</Link>
              <Link onClick={handleActivateButtonClick}>
                {ad?.isActive ? "Deactivate" : "Activate"}
              </Link>
              <ConfirmModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={toggleAdActivation}
              />
            </div>
          )}
          <p>Posted by: {ad.postedBy.fullname}</p>
          <p>{ad.description}</p>
          <p>${ad.price}</p>
          <p>Start Date: {ad.startDate.split("T")[0]}</p>
          <p>End Date: {ad.expiryDate.split("T")[0]}</p>
          {ad.isActive ? <p>Active</p> : <p>Inactive</p>}
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
