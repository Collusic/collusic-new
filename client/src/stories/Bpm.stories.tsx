import { ComponentMeta, ComponentStory } from "@storybook/react";

import Bpm from "components/blocks/Bpm";

export default {
  title: "blocks/Bpm",
  component: Bpm,
};

const Template: ComponentStory<typeof Bpm> = (args) => <Bpm {...args} />;

export const Default = Template.bind({});
Default.args = {
  bpm: 60,
};
