import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Update = ({ display, update }) => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    setInputs({ title: update.title, body: update.body });
  }, [update]);

  const change = (changing) => {
    const { name, value } = changing.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    await axios
      .put(`http://localhost:3001/api/v2/updateTask/${update._id}`, inputs)
      .then((response) => {
        toast.success(response.data.message);
      });

    display("none");
  };
  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column h-100">
      <h3>Update your Task</h3>
      <input
        type="text"
        className="to-do-inputs my-4 w-100 p-3"
        value={inputs.title}
        name="title"
        onChange={change}
      />
      <textarea
        className="to-do-inputs w-100 p-3"
        id=""
        value={inputs.body}
        name="body"
        onChange={change}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => display("none")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
