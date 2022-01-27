import React from "react";
import { useRecoilValue } from "recoil";
import { getDetailRequestState } from "../model/detailRequestProjectModel";
import { DetailRequestView } from "../view/DetailRequestView";

export const DetailRequestViewModel: React.FC = () => {
  const {
    userEmail,
    userDetail,
    userProfile,
    fields,
    genres,
    moods,
    id,
    title,
    content,
    instrument,
    lyrics,
    melody,
  } = useRecoilValue(getDetailRequestState);

  return (
    <DetailRequestView
      userEmail={userEmail}
      userDetail={userDetail}
      userProfile={userProfile}
      fields={fields}
      genres={genres}
      moods={moods}
      id={id}
      title={title}
      content={content}
      instrument={instrument}
      lyrics={lyrics}
      melody={melody}
    ></DetailRequestView>
  );
};
