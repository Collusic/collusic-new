import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LoginButton } from "../components/LoginButton";

export default {
  title: "Button/LoginButton",
  component: LoginButton,
  argTypes: {
    innerText: { control: "text" },
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
    src: { control: "file", accept: ".svg" },
  } as ComponentMeta<typeof LoginButton>,
};

const Template: ComponentStory<typeof LoginButton> = (args) => (
  <LoginButton {...args} />
);

export const Naver = Template.bind({});
Naver.args = {
  innerText: "네이버로 시작하기",
  backgroundColor: "#03c75a",
  textColor: "#fff",
  src: "../assets/login/naver.svg",
};

export const Kakao = Template.bind({});
Kakao.args = {
  innerText: "카카오로 시작하기",
  backgroundColor: "#fee500",
  textColor: "#000",
  src: "../assets/login/kakao.svg",
};

export const Google = Template.bind({});
Google.args = {
  innerText: "구글로 시작하기",
  backgroundColor: "#fff",
  textColor: "#000",
  src: "../assets/login/google.svg",
};
