import { ComponentMeta, ComponentStory } from "@storybook/react";

import ProjectBox from "components/blocks/ProjectBox";

export default {
  title: "blocks/ProjectBox",
  component: ProjectBox,
};

const Template: ComponentStory<typeof ProjectBox> = () => <ProjectBox />;

export const Default = Template.bind({});
