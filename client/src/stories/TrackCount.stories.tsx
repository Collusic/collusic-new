import { ComponentMeta, ComponentStory } from "@storybook/react";

import TrackCount from "components/atoms/TrackCount";

export default {
  title: "atoms/TrackCount",
  component: TrackCount,
  argTypes: {
    trackCount: { control: "number" },
  } as ComponentMeta<typeof TrackCount>,
};

const Template: ComponentStory<typeof TrackCount> = (args) => <TrackCount {...args} />;

export const Default = Template.bind({});
Default.args = {
  trackCount: 10,
};
