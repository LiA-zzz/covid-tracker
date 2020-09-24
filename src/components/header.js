import React from "react";
import "./styles.css";

const Header = () => {
  return (
    <React.Fragment>
      <header
        className="centerText whiteText"
        style={{ paddingBottom: 25, paddingTop: 20 }}
      >
        <h1>COVID-19 Data: USA</h1>
      </header>
    </React.Fragment>
  );
};

export default Header;
