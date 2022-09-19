import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "components/Button";

export default {
  title: "Atoms/LineButton",
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
};

export const Selected = Template.bind({});
Selected.args = {
  type: "line",
  isSelected: true,
};
