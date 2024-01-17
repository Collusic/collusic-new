import { ComponentStory } from "@storybook/react";

import UnderPlayBar from "components/blocks/UnderPlayBar";

export default {
  title: "blocks/UnderPlayBar",
  component: UnderPlayBar,
};

const Template: ComponentStory<typeof UnderPlayBar> = (args) => <UnderPlayBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  sound: 0,
  currentTime: "00:00",
  totalTime: "03:00",
  onSoundInput: (e) => {
    console.log(e);
  },
};
