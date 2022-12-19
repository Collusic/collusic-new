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
      projectName: "프로젝트명",
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
    },
    {
      projectName: "프로젝트명1",
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
      likeCount: 53,
      isLiked: false,
    },
    {
      projectName: "프로젝트명2",
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
    },
    {
      projectName: "프로젝트명3",
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
    },
    {
      projectName: "프로젝트명4",
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
    },
    {
      projectName: "프로젝트명5",
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
    },
    {
      projectName: "프로젝트명6",
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
    },
    {
      projectName: "프로젝트명7",
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
    },
  ],
};
