import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TodoCards from "./TodoCards";
import Update from "./Update";
import axios from "axios";

let id = sessionStorage.getItem("id");
let toUpdateArray = [];
const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or body shouldn't be empty!!");
    } else {
      if (id) {
        await axios
          .post("http://localhost:3001/api/v2/addTask", {
            title: inputs.title,
            body: inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response.data);
          });

        setInputs({ title: "", body: "" });
        toast.success("Your task has been added!");
      } else {
        setArray([...array, inputs]);
        setInputs({ title: "", body: "" });
        toast.error("Your task hasn't been added! Please SignUp");
      }
    }
  };

  const del = async (cardId) => {
    if (id) {
      await axios
        .delete(`http://localhost:3001/api/v2/deleteTask/${cardId}`, {
          data: { id: id },
        })
        .then((response) => {
          toast.success("Task deleted successfully!");
        });
      array.splice(id, "1");
      setArray([...array]);
    } else {
      toast.error("Please Signup ASAP!!");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (value) => {
    toUpdateArray = array[value];
  };

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`http://localhost:3001/api/v2/getTasks/${id}`)
          .then((response) => {
            setArray(response.data.list);
          });
      };

      fetch();
    }
  }, [submit]);
  return (
    <>
      <div className="w-100 min-vh-100 h-auto position-relative">
        <ToastContainer />
        <div className="container d-flex flex-column justify-content-center align-items-center my-4">
          <div className="to-do-input-div d-flex flex-column w-100 p-1">
            <input
              className="to-do-inputs my-2 p-2 border-0"
              type="text"
              placeholder="Title"
              name="title"
              onClick={show}
              value={inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              className="to-do-inputs p-2 border-0"
              type="text"
              name="body"
              value={inputs.body}
              onChange={change}
              placeholder="Body"
            />
          </div>
          <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
            <button className="btn btn-outline-primary" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {array &&
                array.map((item, index) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container h-100">
          <Update display={dis} update={toUpdateArray} />
        </div>
      </div>
    </>
  );
};

export default Todo;
