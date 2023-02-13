import { ComponentMeta, ComponentStory } from "@storybook/react";

import TrackSpace from "components/blocks/TrackSpace";

export default {
  title: "blocks/TrackSpace",
  component: TrackSpace,
  argTypes: {
    currentTime: { control: "number" },
  } as ComponentMeta<typeof TrackSpace>,
};

const Template: ComponentStory<typeof TrackSpace> = (args) => <TrackSpace {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentTime: 0,
};
