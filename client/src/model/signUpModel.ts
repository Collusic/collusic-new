import { atom, selector } from "recoil";

export const signUpState = atom({
  key: "signUpState",
  default: false,
});

export const getSignUpUserInfo = selector({
  key: "getLoginDetailInfo",
  get: () => {

    return {
      profileSrc: "../../assets/signin/default_profile@2x.png",
      email: "kkr991221@gmail.com",
    }
  },
})