import React from "react";
import { Link } from 'react-router-dom';
import './HomepageButton.css';
import logo from "./logo.png";

const HomepageButton = () => {
  return (
    <div className="App-logo">
      <Link to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
    </div>
  );
};

export default HomepageButton;