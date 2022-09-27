import { ComponentMeta, ComponentStory } from "@storybook/react";

import SessionMelody from "view/SessionMelody";

export default {
  title: "Views/SessionMelody",
  component: SessionMelody,
  argTypes: {
    melodyType: { control: "text" },
  } as ComponentMeta<typeof SessionMelody>,
};

const Template: ComponentStory<typeof SessionMelody> = (args) => <SessionMelody {...args} />;

export const Default = Template.bind({});
Default.args = {
  melodyType: 4,
};
