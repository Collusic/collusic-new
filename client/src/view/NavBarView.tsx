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
              <img src="../../assets/notification.png" alt="Notify" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="" alt="MyPage" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
