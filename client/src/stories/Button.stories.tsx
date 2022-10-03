import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "components/atoms/Button";

export default {
  title: "atoms/Button",
  component: Button,
  argTypes: {
    type: { control: "text" },
    isSelected: { control: "boolean" },
  } as ComponentMeta<typeof Button>,
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Green = Template.bind({});
Green.args = {
  type: "green",
  isSelected: false,
  children: "BUTTON",
};

export const White = Template.bind({});
White.args = {
  type: "white",
  isSelected: false,
  children: "BUTTON",
};
