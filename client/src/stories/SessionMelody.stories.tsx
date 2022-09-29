import { ComponentMeta, ComponentStory } from "@storybook/react";

import SessionMelody from "components/blocks/SessionMelody";

export default {
  title: "blocks/SessionMelody",
  component: SessionMelody,
  argTypes: {
    melodyType: { control: "text" },
  } as ComponentMeta<typeof SessionMelody>,
};

const Template: ComponentStory<typeof SessionMelody> = (args) => <SessionMelody {...args} />;

export const Default = Template.bind({});
Default.args = {
  melodyType: "4",
};
