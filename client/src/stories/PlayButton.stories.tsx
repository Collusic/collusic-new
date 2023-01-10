import { ComponentMeta, ComponentStory } from "@storybook/react";

import PlayButton from "components/atoms/PlayButton";

export default {
  title: "atoms/PlayButton",
  component: PlayButton,
  argTypes: {
    isPlaying: { control: "boolean" },
    isFromMain: { control: "boolean" },
  } as ComponentMeta<typeof PlayButton>,
};

const Template: ComponentStory<typeof PlayButton> = (args) => <PlayButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  isPlaying: true,
  isFromMain: true,
};
