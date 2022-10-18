import { ComponentStory } from "@storybook/react";

import RecordDevice from "components/blocks/RecordDevice";

export default {
  title: "blocks/RecordDevice",
  component: RecordDevice,
};

const Template: ComponentStory<typeof RecordDevice> = (args) => <RecordDevice {...args} />;

export const Default = Template.bind({});
Default.args = {
  handleDeviceClick: () => {},
};
