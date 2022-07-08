import React from "react";
import { useSetRecoilState } from "recoil";

import { modalOpenState } from "../model/signInModel";
import "../utils/style/NavBar.scss";

export function NavBarView() {
  const  setIsModalOpen = useSetRecoilState(modalOpenState);

  return (
    <header>
      <h1>
        <a className="logo" href="/main/requestProjects">
          Collusic
        </a>
      </h1>
      <nav>
        <ul>
          <li>
            <a href="">
              <img src="../../assets/alarm/alarm.png" alt="alarm" />
            </a>
          </li>
          <li>
          <button onClick={() => setIsModalOpen(true)}>로그인/회원가입</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
