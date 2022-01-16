import React from "react";
import "./NavBar.scss";

export const NavBarView: React.FC = () => {
  return (
    <header>
      <a className="logo" href="#">
        <img src="" alt="Collusic" />
      </a>
      <nav>
        <ul>
          <li>
            <a href="#">
              <img src="" alt="Notify" />
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
