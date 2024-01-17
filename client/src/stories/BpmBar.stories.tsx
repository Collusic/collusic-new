import { ComponentStory } from "@storybook/react";

import BpmBar from "components/blocks/BpmBar";

export default {
  title: "blocks/BpmBar",
  component: BpmBar,
};

const Template: ComponentStory<typeof BpmBar> = (args) => <BpmBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  onBpmInput: (e) => {
    console.log((e.target as HTMLInputElement).value);
  },
};
