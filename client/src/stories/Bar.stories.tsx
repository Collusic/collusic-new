import { ComponentMeta, ComponentStory } from "@storybook/react";

import Bar from "components/atoms/Bar";

export default {
  title: "atoms/Bar",
  component: Bar,
  argTypes: {
    isShowTarget: { control: "boolean" },
    type: { control: "text" },
  } as ComponentMeta<typeof Bar>,
};

const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args} />;

export const Default = Template.bind({});
Default.args = {
  targetState: 0,
  min: 30,
  max: 240,
  onBarInput: (e) => {
    console.log((e.target as HTMLInputElement).value);
  },
};
