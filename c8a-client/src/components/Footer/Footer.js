import React from "react";
import "./Footer.css";
import { redes } from "./redes";

const Footer = () => {
  return (
    <footer>
      <div>@2021</div>
      <div className="container-red">
        {redes.map((red, index) => (
          <a key={index} href={red.url}>
            <img className="container-red__img" src={red.img} alt={red.title} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
