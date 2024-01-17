import { ComponentMeta, ComponentStory } from "@storybook/react";

import LikeButton from "components/atoms/LikeButton";

export default {
  title: "atoms/LikeButton",
  component: LikeButton,
  argTypes: {
    isPlaying: { control: "boolean" },
  } as ComponentMeta<typeof LikeButton>,
};

const Template: ComponentStory<typeof LikeButton> = (args) => <LikeButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLiked: true,
  likeCount: 10,
};

export const Detail = Template.bind({});
Detail.args = {
  isLiked: true,
  likeCount: 10,
  useIn: "detail",
};
