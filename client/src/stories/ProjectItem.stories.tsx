import { ComponentStory } from "@storybook/react";

import ProjectItem from "components/blocks/ProjectItem";

export default {
  title: "blocks/ProjectItem",
  component: ProjectItem,
};

const Template: ComponentStory<typeof ProjectItem> = (args) => <ProjectItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  projectName: "hello",
  trackTags: [
    {
      id: "dfklsj",
      name: "피아노",
      src: "sdjfiosejfs.mp3",
    },
    {
      id: "dfadafs",
      name: "마라카스",
      src: "sdjfiosejfs.mp3",
    },
    {
      id: "sdfsasdfa",
      name: "보컬",
      src: "sdjfiosejfs.mp3",
    },
  ],
  likeCount: 10,
  isLiked: true,
};
