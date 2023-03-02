import { ComponentMeta, ComponentStory } from "@storybook/react";

import TopTimeBar from "components/atoms/TopTimeBar";

export default {
  title: "atoms/TopTimeBar",
  component: TopTimeBar,
  argTypes: {
    barType: { control: "text" },
  } as ComponentMeta<typeof TopTimeBar>,
};

const Template: ComponentStory<typeof TopTimeBar> = (args) => <TopTimeBar {...args} />;

export const Default = Template.bind({});
