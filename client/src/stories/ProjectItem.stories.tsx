import { ComponentStory } from "@storybook/react";

import ProjectItem from "components/blocks/ProjectItem";

export default {
  title: "blocks/ProjectItem",
  component: ProjectItem,
};

const Template: ComponentStory<typeof ProjectItem> = (args) => <ProjectItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  projectId: 0,
  projectName: "hello",
  trackPreviews: [
    {
      trackId: 0,
      trackTag: "피아노",
      fileUrl: "sdjfiosejfs.mp3",
    },
    {
      trackId: 1,
      trackTag: "마라카스",
      fileUrl: "sdjfiosejfs.mp3",
    },
    {
      trackId: 2,
      trackTag: "보컬",
      fileUrl: "sdjfiosejfs.mp3",
    },
  ],
  likeCount: 10,
  isLiked: true,
};
