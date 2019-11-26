import React from "react";

export default ({ robot, handleDelete }) => {
  const { id, name, code, time, trajectory } = robot;

  return (
    <div className="list__item__container">
      <button
        onClick={handleDelete.bind(this, id)}
        className="list__item__delete"
      >
        x
      </button>
      <div className="row">
        <div className="list__item__name">
          <strong>{name}</strong>
        </div>
      </div>
      <div className="row">
        <div className="list__item__quantity">
          <strong>Code: </strong>
          {code}
        </div>
        <div className="list__item__department">
          <strong>Time: </strong>
          {time}
        </div>
      </div>
      <div className="row">
        <div className="list__item__producer">
          <strong>Trajectory: </strong>
          {trajectory}
        </div>
      </div>
    </div>
  );
};
