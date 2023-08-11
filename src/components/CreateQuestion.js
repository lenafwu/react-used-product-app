import { useState } from "react";

const CreateQuestion = ({ onQuestionSubmit, onToggle }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      title,
      description,
    };

    onQuestionSubmit(newQuestion);
    // send data to backend
    setTitle("");
    setDescription("");
  };
  return (
    <div>
      <h3>Ask a question</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={onToggle}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
