import { ComponentStory } from "@storybook/react";

import ProjectList from "components/blocks/ProjectList";

export default {
  title: "blocks/ProjectList",
  component: ProjectList,
};

const Template: ComponentStory<typeof ProjectList> = (args) => <ProjectList {...args} />;

export const Default = Template.bind({});
Default.args = {
  projectList: [
    {
      projectId: 0,
      projectName: "프로젝트명",
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
    },
    {
      projectId: 1,
      projectName: "프로젝트명1",
      trackPreviews: [
        {
          trackId: 3,
          trackTag: "피아노",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 4,
          trackTag: "마라카스",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 5,
          trackTag: "보컬",
          fileUrl: "sdjfiosejfs.mp3",
        },
      ],
      likeCount: 53,
      isLiked: false,
    },
    {
      projectId: 3,
      projectName: "프로젝트명2",
      trackPreviews: [
        {
          trackId: 6,
          trackTag: "피아노",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 7,
          trackTag: "마라카스",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 8,
          trackTag: "보컬",
          fileUrl: "sdjfiosejfs.mp3",
        },
      ],
      likeCount: 10,
      isLiked: true,
    },
    {
      projectId: 4,
      projectName: "프로젝트명3",
      trackPreviews: [
        {
          trackId: 9,
          trackTag: "피아노",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 10,
          trackTag: "마라카스",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 11,
          trackTag: "보컬",
          fileUrl: "sdjfiosejfs.mp3",
        },
      ],
      likeCount: 10,
      isLiked: true,
    },
    {
      projectId: 5,
      projectName: "프로젝트명4",
      trackPreviews: [
        {
          trackId: 12,
          trackTag: "피아노",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 13,
          trackTag: "마라카스",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 14,
          trackTag: "보컬",
          fileUrl: "sdjfiosejfs.mp3",
        },
      ],
      likeCount: 10,
      isLiked: true,
    },
    {
      projectId: 6,
      projectName: "프로젝트명5",
      trackPreviews: [
        {
          trackId: 15,
          trackTag: "피아노",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 16,
          trackTag: "마라카스",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 17,
          trackTag: "보컬",
          fileUrl: "sdjfiosejfs.mp3",
        },
      ],
      likeCount: 10,
      isLiked: true,
    },
    {
      projectId: 7,
      projectName: "프로젝트명6",
      trackPreviews: [
        {
          trackId: 18,
          trackTag: "피아노",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 19,
          trackTag: "마라카스",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 20,
          trackTag: "보컬",
          fileUrl: "sdjfiosejfs.mp3",
        },
      ],
      likeCount: 10,
      isLiked: true,
    },
    {
      projectId: 8,
      projectName: "프로젝트명7",
      trackPreviews: [
        {
          trackId: 21,
          trackTag: "피아노",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 22,
          trackTag: "마라카스",
          fileUrl: "sdjfiosejfs.mp3",
        },
        {
          trackId: 23,
          trackTag: "보컬",
          fileUrl: "sdjfiosejfs.mp3",
        },
      ],
      likeCount: 10,
      isLiked: true,
    },
  ],
};
