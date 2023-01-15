import { ComponentStory } from "@storybook/react";

import SoundBar from "components/blocks/SoundBar";

export default {
  title: "blocks/SoundBar",
  component: SoundBar,
};

const Template: ComponentStory<typeof SoundBar> = (args) => <SoundBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  targetState: 0,
  onSoundInput: (e) => {
    console.log((e.target as HTMLInputElement).value);
  },
};
