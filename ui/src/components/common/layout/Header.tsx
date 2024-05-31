import React from "react";
import Logo from "./Logo";

const Header: React.FC<{}> = () => {
  return (
    <div className="container">
      <h1>
        <Logo />
      </h1>
    </div>
  );
};

export default Header;
