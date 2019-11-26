import React from "react";
import Robot from "./Robot";

export default ({ items, handleDelete }) => {
  return (
    <div className="list">
      {items.map(robot => (
        <Robot key={robot.id} robot={robot} handleDelete={handleDelete} />
      ))}
    </div>
  );
};
