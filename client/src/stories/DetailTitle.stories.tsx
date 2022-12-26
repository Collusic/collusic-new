import { ComponentMeta, ComponentStory } from "@storybook/react";

import DetailTitle from "components/atoms/DetailTitle";

export default {
  title: "atoms/DetailTitle",
  component: DetailTitle,
  argTypes: {
    content: { control: "text" },
  } as ComponentMeta<typeof DetailTitle>,
};

const Template: ComponentStory<typeof DetailTitle> = (args) => <DetailTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: "일이삼사오육칠팔구십",
};
