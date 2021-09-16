import React from "react";
import { StyledNavBar, Title, Box, Alarm, Profile } from "./styled";
import imgAlarm from "assets/alarm.png";
import imgProfile from "assets/profile.png";
import useLastLocationHistory from "lib/history";

function NavBar() {
  const setHistory = useLastLocationHistory();

  return (
    <StyledNavBar>
      <Title>collusic</Title>
      <Box>
        <Alarm src={imgAlarm} />
        <Profile
          src={imgProfile}
          onClick={() => {
            setHistory("/mypage");
          }}
        />
      </Box>
    </StyledNavBar>
  );
}

export default NavBar;
