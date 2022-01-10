import { Field, requestLyric, requestMelody } from "./requestProjectType";

export type ContributeProject = {
  contributeProjectId: number;
  contributeField: Array<Field>;
  contributeContent: string;
  upload: requestMelody | requestLyric;
};
