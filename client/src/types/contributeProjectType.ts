import { Field } from "types/requestProjectType";

export type ContributeProject = {
  id: number;
  fields: Array<Field>;
  content: string;
  lyrics?: string;
  uploadFilePath?: string;
};
