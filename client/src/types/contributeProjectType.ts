import { Field } from "./requestProjectType";

export type ContributeProject = {
  contributeProjectId: number;
  contributeField: Array<Field>;
  contributeContent: string;
  contributeLyric?: string;
  contributeInstrument?: string;
  contributeMelody?: string;
};
