import { ComponentMeta, ComponentStory } from "@storybook/react";

import TrackIcon from "components/atoms/TrackIcon";

export default {
  title: "atoms/TrackIcon",
  component: TrackIcon,
  argTypes: {
    track: { control: "text" },
  } as ComponentMeta<typeof TrackIcon>,
};

const Template: ComponentStory<typeof TrackIcon> = (args) => <TrackIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  track: "",
};
