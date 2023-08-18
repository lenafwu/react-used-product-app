import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AnswerQuestion = ({ adId, questionId, fetchQuestions }) => {
  const ANSWER_URL = `/ad/${adId}/questions/${questionId}/answer`;
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axiosPrivate.post(ANSWER_URL, { answer });
      setAnswer("");
      fetchQuestions();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Reply to the question:
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="form-input description-textarea"
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AnswerQuestion;
