import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";

import { DetailProjectInfo } from "types/detailProjectType";
import Bpm from "components/atoms/Bpm";
import DetailTitle from "components/atoms/DetailTitle";
import LikeButton from "components/atoms/LikeButton";
import Button from "components/atoms/Button";
import TrackBox from "components/atoms/TrackBox";
import TrackSpace from "components/blocks/TrackSpace";
import useAudios from "hooks/useAudios";
import TrackCount from "components/atoms/TrackCount";
import { setProjectLike } from "api/project";

function DetailProject({ projectName, likeCount, isLiked, bpm, tracks }: DetailProjectInfo) {
  const navigate = useNavigate();
  const location = useLocation();
  const { time, setTime, audioList, setAudios } = useAudios();

  const [count, setCount] = useState(0);
  const [like, setLike] = useState(false);

  const clickLikeButtonHandler = async () => {
    const { likeCount, isLiked } = await setProjectLike(Number(location.pathname.slice(1)));
    setCount(likeCount);
    setLike(isLiked);
  };

  useEffect(() => {
    if (tracks.length === 0) {
      return;
    }
    setAudios(tracks.map((track) => track.fileUrl));
  }, [tracks]);
  useEffect(() => {
    setCount(likeCount);
  }, [likeCount]);
  useEffect(() => {
    setLike(isLiked);
  }, [isLiked]);

  return (
    <div id="detail-box">
      <div id="detail-header">
        <div id="detail-left-box">
          <Bpm bpmState={bpm} />
          <div className="line">
            <DetailTitle content={projectName} />
            <LikeButton onClickLikeBtn={clickLikeButtonHandler} isLiked={like} likeCount={count} />
          </div>
        </div>
        <Button type="green" onBtnClick={() => navigate(`${location.pathname}/track/new`)} padding="1rem 4rem">
          트랙 추가하기
        </Button>
      </div>
      <div id="detail-body">
        <div id="detail-tracks-info">
          <TrackCount trackCount={tracks.length} />
          {tracks.map((track) => (
            <TrackBox
              key={track.memberId}
              profileUrl={track.profileImageUrl}
              nickName={track.nickname}
              track={track.trackTag}
              trackName={track.trackName}
            />
          ))}
        </div>
        <TrackSpace bpm={bpm} time={time} audioTracks={audioList} setTime={setTime} />
      </div>
    </div>
  );
}

export default DetailProject;
