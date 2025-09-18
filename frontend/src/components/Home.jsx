import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="">
          What gets
          <br /> scheduled gets done
        </h1>
        <p className="fs-5">~ Michael Hyatt</p>
        <button
          className="btn btn-outline-primary p-2"
          onClick={() => navigate("/signin")}
        >
          Make Todo List
        </button>
      </div>
    </div>
  );
};

export default Home;
