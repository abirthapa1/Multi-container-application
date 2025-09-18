import React from "react";
import HeadingComp from "./HeadingComp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
// import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const change = (changing) => {
    const { name, value } = changing.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (submitting) => {
    submitting.preventDefault();
    await axios
      .post("http://localhost:3001/api/v1/signin", inputs)
      .then((response) => {
        sessionStorage.setItem("id", response.data.others._id);
        dispatch(authActions.login());
        setInputs({
          email: "",
          password: "",
        });
        history("/todo");
      });
  };
  return (
    <div className="w-100 vh-100">
      <div className="container">
        <div className="row">
          <div className="vh-100 col-lg-4 d-none d-lg-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="vh-100 col-lg-8 d-flex justify-content-center align-items-center">
            <div className="w-100 p-5 d-flex flex-column">
              <input
                className="p-2 my-3"
                name="email"
                type="email"
                placeholder="Enter your Email"
                onChange={change}
                value={inputs.email}
              />
              <input
                className="p-2 my-3"
                name="password"
                type="password"
                placeholder="Enter your Password"
                onChange={change}
                value={inputs.password}
              />
              <button className="btn btn-outline-primary" onClick={submit}>
                SignIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
