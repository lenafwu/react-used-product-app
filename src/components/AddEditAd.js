import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const CreateAd = ({ ad }) => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [title, setTitle] = useState(ad?.title || "");
  const [description, setDescription] = useState(ad?.description || "");
  const [price, setPrice] = useState(ad?.price || 0);
  const [startDate, setStartDate] = useState(ad?.startDate || today);
  const [expiryDate, setExpiryDate] = useState(ad?.expiryDate || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ad = {
      title,
      description,
      price,
      startDate,
      expiryDate,
    };

    try {
      const response = await axiosPrivate.post("/ad", ad);
      navigate(`/ad/${response.data.ad._id}`);
      console.log(response);
    } catch (err) {
      console.log("error creating ad: ", err);
    }
  };

  return (
    <div>
      <h3>{ad ? "Edit Ad" : "Create Ad"}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAd;
