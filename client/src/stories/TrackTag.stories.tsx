import { ComponentMeta, ComponentStory } from "@storybook/react";

import TrackTag from "components/blocks/TrackTag";

export default {
  title: "blocks/TrackTag",
  component: TrackTag,
  argTypes: {
    selectedTrack: { control: "text" },
  } as ComponentMeta<typeof TrackTag>,
};

const Template: ComponentStory<typeof TrackTag> = (args) => <TrackTag {...args} />;

export const Default = Template.bind({});
Default.args = {
  onTrackClick: (e) => {
    console.log(e);
  },
  tracks: ["피아노", "드럼", "보컬", "박수", "어쿠스틱 기타", "일렉 기타", "바이올린", "리코더", "마라카스", "ETC"],
};
