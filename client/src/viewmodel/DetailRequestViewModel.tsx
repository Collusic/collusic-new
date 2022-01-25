import React from "react";
import { useRecoilValue } from "recoil";
import { getDetailRequestState } from "../model/detailRequestProjectModel";
import { DetailRequestView } from "../view/DetailRequestView";

export const DetailRequestViewModel: React.FC = () => {
  const {
    userEmail,
    userDetail,
    userProfile,
    requestField,
    requestGenre,
    requestMood,
    requestProjectId,
    requestTitle,
    requestContent,
    requestInstrument,
    requestLyric,
    requestMelody,
  } = useRecoilValue(getDetailRequestState);

  return (
    <DetailRequestView
      userEmail={userEmail}
      userDetail={userDetail}
      userProfile={userProfile}
      requestField={requestField}
      requestGenre={requestGenre}
      requestMood={requestMood}
      requestProjectId={requestProjectId}
      requestTitle={requestTitle}
      requestContent={requestContent}
      requestInstrument={requestInstrument}
      requestLyric={requestLyric}
      requestMelody={requestMelody}
    ></DetailRequestView>
  );
};
