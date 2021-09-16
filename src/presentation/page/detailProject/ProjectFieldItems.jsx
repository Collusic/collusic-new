import React, { useState, useEffect } from "react";
import API from "data/http/axios/api";
import styled from "./styled";

function ProjectFieldItems({ id }) {
  const [requestProject, setRequestProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const readContributeProjects = async () => {
      try {
        setError(null);
        setRequestProject(null);
        setLoading(true);
        const { data } = await API.get("/requestprojects/" + id);
        setRequestProject(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    readContributeProjects();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!requestProject) return null;

  return (
    <>
      {/* {requestProject.map((project) => (
        <styled.RequestFieldItem>{project.email}</styled.RequestFieldItem>
      ))} */}
    </>
  );
}

export default ProjectFieldItems;
