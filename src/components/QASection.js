import { useState } from "react";
import useAuth from "../hooks/useAuth";
import CreateQuestion from "./CreateQuestion";
import axios from "../api/axios";

const QASection = ({ questions, adID, fetchQuestions }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleNewQuestion = async (question) => {
    try {
      const response = await axios.post(`/ad/${adID}/questions`, question, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Question created", response.data);
      fetchQuestions();
      setShowCreateForm(false);
    } catch (err) {
      console.log("Error creating question", err);
    }
  };

  const handleToggleCreateQuestion = () => {
    setShowCreateForm(!showCreateForm);
  };
  //  const handleSubmit = (e) => {};
  return (
    <div className="qa-section">
      <h3>Questions</h3>
      <div>
        {showCreateForm ? (
          <CreateQuestion
            onQuestionSubmit={handleNewQuestion}
            onToggle={handleToggleCreateQuestion}
          />
        ) : (
          <>
            <button onClick={handleToggleCreateQuestion}>Ask a question</button>
            <ul>
              {questions?.length ? (
                questions.map((q) => (
                  <li key={q._id}>
                    <p>Question title: {q.title}</p>
                    <p>Description: {q.description}</p>
                    {q.answer ? (
                      <p>Answer: {q.answer}</p>
                    ) : (
                      <p>No answer yet.</p>
                    )}
                  </li>
                ))
              ) : (
                <p>No questions found </p>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default QASection;
