import React from "react";
import { staff } from "./staff";
import "./card.css";

const Card = () => {
  return (
    <div className="container-staff">
      {staff.map((member, index) => (
        <div key={index} className="container-member">
          <img
            className="container-member__img"
            src={member.imageUrl}
            alt={member.name}
          />
          <div className="container-member__text">
            <p>{member.name}</p>
            <span>{member.function}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
