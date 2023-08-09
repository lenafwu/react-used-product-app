import React from "react";

const Missing = () => {
  return (
    <div class="container">
      <h1>404 Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        Please check the URL or go back to the{" "}
        <a className="line" href="/">
          Home Page
        </a>
        .
      </p>
    </div>
  );
};

export default Missing;
