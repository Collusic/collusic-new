import { ComponentMeta, ComponentStory } from "@storybook/react";

import PreviewButton from "components/atoms/PreviewButton";

export default {
  title: "atoms/PreviewButton",
  component: PreviewButton,
  argTypes: {
    isPlaying: { control: "boolean" },
  } as ComponentMeta<typeof PreviewButton>,
};

const Template: ComponentStory<typeof PreviewButton> = (args) => <PreviewButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  isPlaying: true,
};
