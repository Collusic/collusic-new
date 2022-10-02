import { ComponentMeta, ComponentStory } from "@storybook/react";

import Bpm from "components/blocks/Bpm";

export default {
  title: "blocks/Bpm",
  component: Bpm,
};

const Template: ComponentStory<typeof Bpm> = () => <Bpm />;

export const Default = Template.bind({});
