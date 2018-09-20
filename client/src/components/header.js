import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <h3>
      <Link to="/">NLCF Admin</Link>
    </h3>
    <nav>
      <Link to="/">Sign Out</Link>
    </nav>
  </div>
);

export default Header;
