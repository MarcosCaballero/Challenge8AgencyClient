import React from "react";
import Banner from "../Banner/Banner";
import Presentation from "../Presentation/Presentation";
import "./homeData.css";

const HomeData = () => {
  return (
    <section className="container-home-data">
      <Banner />
      <Presentation />
      <Banner />
    </section>
  );
};

export default HomeData;
