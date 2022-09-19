import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "components/Button";

export default {
  title: "Atoms/Button",
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
};

export const White = Template.bind({});
White.args = {
  type: "white",
  isSelected: false,
};
