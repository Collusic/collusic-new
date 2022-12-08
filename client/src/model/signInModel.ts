import { atom } from "recoil";

export const isSignInState = atom({
  key: "signIn",
  default: false,
});

export const modalOpenState = atom({
  key: "modalOpenState",
  default: false,
});
