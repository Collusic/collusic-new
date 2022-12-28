import { ComponentMeta, ComponentStory } from "@storybook/react";

import Bpm from "components/atoms/Bpm";

export default {
  title: "blocks/Bpm",
  component: Bpm,
  bpmState: { control: "number" },
} as ComponentMeta<typeof Bpm>;

const Template: ComponentStory<typeof Bpm> = (args) => <Bpm {...args} />;

export const Default = Template.bind({});
Default.args = {
  bpmState: 60,
};
