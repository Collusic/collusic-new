import { ComponentMeta, ComponentStory } from "@storybook/react";

import TrackBox from "components/atoms/TrackBox";

export default {
  title: "atoms/TrackBox",
  component: TrackBox,
  argTypes: {
    profileUrl: { control: { type: "file", accept: ".png" } },
    nickName: { control: "string" },
    track: { control: "string" },
    trackName: { control: "string" },
  } as ComponentMeta<typeof TrackBox>,
};

const Template: ComponentStory<typeof TrackBox> = (args) => <TrackBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  profileUrl: `${process.env.PUBLIC_URL}/assets/trackCount/trackCount.png`,
  nickName: "닉네임최대열두글자까지이",
  track: "피아노",
  trackName: "일이삼사오육칠팔구십일이삼사오육칠팔구십",
};
