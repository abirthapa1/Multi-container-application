import React from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
const TodoCards = ({
  title,
  body,
  id,
  delid,
  display,
  updateId,
  toBeUpdate,
}) => {
  return (
    <div className="p-3 border border-dark">
      <div>
        <h5>{title}</h5>
        <p>{body.split("", 77)}...</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="card-icons d-flex justify-content-center align-items-center p-2"
          onClick={() => {
            display("block");
            toBeUpdate(updateId);
          }}
        >
          <MdOutlineAdd /> Update
        </div>
        <div
          className="card-icons d-flex justify-content-center align-items-center p-2 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <MdDelete /> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
