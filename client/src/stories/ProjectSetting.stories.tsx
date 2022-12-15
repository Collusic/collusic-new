import { ComponentStory } from "@storybook/react";

import ProjectSetting from "components/blocks/ProjectSetting";

export default {
  title: "blocks/ProjectSetting",
  component: ProjectSetting,
};

const Template: ComponentStory<typeof ProjectSetting> = (args) => <ProjectSetting {...args} />;

export const Default = Template.bind({});
Default.args = {
  onDeviceClick: () => {},
  onTrackClick: () => {},
  onBtnClick: () => {},
  onBpmInput: () => {},
  tracks: ["피아노", "드럼", "보컬", "박수", "어쿠스틱 기타", "일렉 기타", "바이올린", "리코더", "마라카스", "ETC"],
};
