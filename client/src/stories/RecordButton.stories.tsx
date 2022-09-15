import { ComponentStory } from "@storybook/react";

import RecordButton from "components/RecordButton";

export default {
  title: "Atoms/RecordButton",
  component: RecordButton,
};

const Template: ComponentStory<typeof RecordButton> = () => <RecordButton />;

export const Default = Template.bind({});
