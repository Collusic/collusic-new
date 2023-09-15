import { ComponentStory } from "@storybook/react";

import RecordButton from "components/atoms/RecordButton";

export default {
  title: "atoms/RecordButton",
  component: RecordButton,
};

const Template: ComponentStory<typeof RecordButton> = (args) => <RecordButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
