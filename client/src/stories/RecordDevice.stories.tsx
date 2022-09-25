import { ComponentStory } from "@storybook/react";

import RecordDevice from "components/RecordDevice";

export default {
  title: "Atoms/RecordDevice",
  component: RecordDevice,
};

const Template: ComponentStory<typeof RecordDevice> = () => <RecordDevice />;

export const Default = Template.bind({});
Default.args = {
  clickHandler: () => {},
};
