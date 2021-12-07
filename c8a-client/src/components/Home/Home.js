import React from "react";
import AttendanceForm from "../AttendanceForm/AttendanceForm";
import HomeData from "../HomeData/HomeData";
import "./home.css";

const Home = () => {
  return (
    <div className="container-home">
      <HomeData />
      <AttendanceForm />
    </div>
  );
};

export default Home;
