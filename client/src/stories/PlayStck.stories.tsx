import { ComponentStory } from "@storybook/react";

import PlayStick from "components/atoms/PlayStick";

export default {
  title: "atoms/PlayStick",
  component: PlayStick,
};

const Template: ComponentStory<typeof PlayStick> = () => <PlayStick />;

export const Default = Template.bind({});
