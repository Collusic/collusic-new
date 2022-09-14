import { atom } from "recoil";

export const loginTypeState = atom({
  key: "LoginTypeState",
  default: "",
});

export const refreshTokenState = atom({
  key: "RefreshTokenState",
  default: "",
});
