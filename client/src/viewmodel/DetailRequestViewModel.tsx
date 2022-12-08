import React from "react";
import { useRecoilValue } from "recoil";
import {
  detailRequestProjectIdState,
  getDetailRequestState,
} from "../model/detailRequestProjectModel";
import { DetailRequestView } from "../view/DetailRequestView";

export const DetailRequestViewModel: React.FC = () => {
  const detailRequestProjectId = useRecoilValue(detailRequestProjectIdState);
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
    lyrics,
    uploadFilePath,
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
      lyrics={lyrics}
      uploadFilePath={uploadFilePath}
    ></DetailRequestView>
  );
};
