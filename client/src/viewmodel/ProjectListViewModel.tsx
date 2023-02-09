import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { projectListState } from "model/projectModel";
import ProjectList from "components/blocks/ProjectList";
import { getProjectList } from "api/project";

function ProjectListViewModel() {
  const [projectList, setProjectList] = useRecoilState(projectListState);
  const [hasNext, setHasNext] = useState(false);
  const observationTarget = useRef<HTMLDivElement>(null);
  const isFirstPage = useRef(true);
  const lastProjectId = useRef(0);

  const observer = useRef(
    new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          const getNextProjectList = await getProjectList({
            ...(!!lastProjectId.current
              ? {
                  cursorId: lastProjectId.current,
                }
              : {}),
          });
          const nextProjectList = getNextProjectList.responseDtos;
          setHasNext(getNextProjectList.hasNext);
          setProjectList((prev) => [...prev, ...nextProjectList]);
        }
      },
      { threshold: 1 },
    ),
  );

  const currentTarget = observationTarget;
  const currentObserver = observer.current!;

  useEffect(() => {
    if (currentTarget.current && isFirstPage.current) {
      currentObserver.observe(currentTarget.current!);
    }
  }, []);

  useEffect(() => {
    if (isFirstPage.current) isFirstPage.current = false;
    else if (hasNext) {
      lastProjectId.current = projectList[projectList.length - 1].projectId!;
    } else if (!hasNext) {
      currentObserver.unobserve(currentTarget.current!);
    }
  }, [projectList]);

  return <ProjectList projectList={projectList} currentRef={observationTarget} />;
}

export default ProjectListViewModel;
