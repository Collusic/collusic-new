import React from "react";
import "./NavBar.scss";

export const NavBarView: React.FC = () => {
  return (
    <header>
      <h1>
        <a className="logo" href="#">
          Collusic
        </a>
      </h1>
      <nav>
        <ul>
          <li>
            <a href="#">
              <img src="../../assets/alarm/alarm.png" alt="alarm" />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="../../assets/defaultProfile/defaultProfile.png"
                alt="defaultProfile"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
