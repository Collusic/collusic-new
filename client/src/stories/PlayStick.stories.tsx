import { ComponentMeta, ComponentStory } from "@storybook/react";

import PlayStick from "components/blocks/PlayStick";

export default {
  title: "blocks/PlayStick",
  component: PlayStick,
  argTypes: {
    currentTime: { control: "number" },
  } as ComponentMeta<typeof PlayStick>,
};

const Template: ComponentStory<typeof PlayStick> = (args) => <PlayStick {...args} />;

export const Default = Template.bind({});
Default.args = {
  maxOffsetX: 1800,
  minOffsetX: 16,
};
