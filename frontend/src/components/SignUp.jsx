import React, { useState } from "react";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const change = (changing) => {
    const { name, value } = changing.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (submitting) => {
    submitting.preventDefault();
    await axios
      .post("http://localhost:3001/api/v1/register", inputs)
      .then((response) => {
        if (response.data.message === "User Already exists") {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          setInputs({
            email: "",
            username: "",
            password: "",
          });
          history("/signin");
        }
      });
  };
  return (
    <div className="w-100 vh-100">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="vh-100 col-lg-8 d-flex justify-content-center align-items-center">
            <div className="w-100 p-3 d-flex flex-column">
              <input
                className="p-2 my-3"
                name="email"
                type="email"
                placeholder="Enter your Email"
                onChange={change}
                value={inputs.email}
                required
              />
              <input
                className="p-2 my-3"
                name="username"
                type="email"
                placeholder="Enter your Username"
                onChange={change}
                value={inputs.username}
                required
              />
              <input
                className="p-2 my-3"
                name="password"
                type="password"
                placeholder="Enter your Password"
                onChange={change}
                value={inputs.password}
                required
              />
              <button className="btn btn-outline-primary" onClick={submit}>
                SignUp
              </button>
            </div>
          </div>
          <div className="d-none vh-100 col-lg-4 d-lg-flex justify-content-center align-items-center border-start">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
