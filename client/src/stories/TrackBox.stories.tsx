import { ComponentMeta, ComponentStory } from "@storybook/react";

import TrackBox from "components/atoms/TrackBox";

export default {
  title: "atoms/TrackBox",
  component: TrackBox,
  argTypes: {
    currentTime: { control: "number" },
    isPlaying: { control: "boolean" },
    isRecording: { control: "boolean" },
  } as ComponentMeta<typeof TrackBox>,
};

const Template: ComponentStory<typeof TrackBox> = (args) => <TrackBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentTime: 27,
  isRecording: false,
};
