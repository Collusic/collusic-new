import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "components/atoms/Button";

export default {
  title: "atoms/LineButton",
  component: Button,
  argTypes: {
    type: { control: "text" },
    isSelected: { control: "boolean" },
  } as ComponentMeta<typeof Button>,
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "line",
  isSelected: false,
  children: "BUTTON",
};

export const Selected = Template.bind({});
Selected.args = {
  type: "line",
  isSelected: true,
  children: "BUTTON",
};
