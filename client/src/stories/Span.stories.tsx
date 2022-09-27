import { ComponentMeta, ComponentStory } from "@storybook/react";

import Span from "components/Span";

export default {
  title: "Atoms/Span",
  component: Span,
  argTypes: {
    children: { control: "text" },
  } as ComponentMeta<typeof Span>,
};

const Template: ComponentStory<typeof Span> = (args) => <Span {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "CONTENT",
};
