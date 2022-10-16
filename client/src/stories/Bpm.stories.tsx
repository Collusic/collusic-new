import { ComponentStory } from "@storybook/react";

import Bpm from "components/blocks/Bpm";

export default {
  title: "blocks/Bpm",
  component: Bpm,
};

const Template: ComponentStory<typeof Bpm> = (args) => <Bpm {...args} />;

export const Default = Template.bind({});
Default.args = {
  inputHandler: (e) => {
    console.log((e.target as HTMLInputElement).value);
  },
};
