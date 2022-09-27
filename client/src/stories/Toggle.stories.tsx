import { ComponentMeta, ComponentStory } from "@storybook/react";

import Toggle from "components/atoms/Toggle";

export default {
  title: "atoms/Toggle",
  component: Toggle,
  argTypes: {
    isLocked: { control: "boolean" },
  } as ComponentMeta<typeof Toggle>,
};

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Locked = Template.bind({});
Locked.args = {
  isLocked: true,
};

export const Unlocked = Template.bind({});
Unlocked.args = {
  isLocked: false,
};
