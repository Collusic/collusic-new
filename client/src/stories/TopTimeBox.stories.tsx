import { ComponentMeta, ComponentStory } from "@storybook/react";

import TopTimeBox from "components/blocks/TopTimeBox";

export default {
  title: "blocks/TopTimeBox",
  component: TopTimeBox,
  argTypes: {
    bpm: { control: "number" },
  } as ComponentMeta<typeof TopTimeBox>,
};

const Template: ComponentStory<typeof TopTimeBox> = (args) => <TopTimeBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  bpm: 30,
};
