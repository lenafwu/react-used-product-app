import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const AD_URL = "/ad/";

const AddEditAd = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const [errMsg, setErrMsg] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState(today);
  const [expiryDate, setExpiryDate] = useState(today);


  

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axiosPrivate.get(AD_URL + id);
        const ad = response.data.ad;
        setTitle(ad.title);
        setDescription(ad.description);
        setPrice(ad.price);
        setStartDate(ad.startDate.split("T")[0]);
        setExpiryDate(ad.expiryDate.split("T")[0]);
      } catch (err) {
        console.log(err);
      }
    };
    if (id) {
      fetchAd();
    }
  }, [id]);

  // validate form
  useEffect(() => {
    setErrMsg(null);
    if (new Date(startDate) > new Date(expiryDate)) {
      setErrMsg("Start date must be before expiry date");
      setIsValid(false);
    }
  }, [title, description, price, startDate, expiryDate]);


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrMsg(null);

    const ad = {
      title,
      description,
      price,
      startDate,
      expiryDate,
    };

    try {
      let response;
      if (id) {
        // Update existing ad
        response = await axiosPrivate.put(AD_URL + id, ad);
      } else {
        // Create new ad
        response = await axiosPrivate.post("/ad", ad);
      }
      navigate(`/ad/${response.data.ad._id}`);
      console.log(response);
    } catch (err) {
      console.log("error creating ad: ", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Advertisement" : "Post an Advertisement"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-input description-textarea"
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="form-input"
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-input"
            required
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => {
              setExpiryDate(e.target.value);
            }}
            className="form-input"
            required
          />
        </label>
        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        <button disabled={!isValid ? true : false} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEditAd;
