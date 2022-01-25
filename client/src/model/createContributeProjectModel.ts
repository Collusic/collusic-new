import { atom, selector } from "recoil";

import { Field } from "../types/requestProjectType";
import { getDetailRequestState } from "./detailRequestProjectModel";

const contributeFields = atom<Field[]>({
  key: "contributeFields",
  default: [],
});

const getRequestProjectField = selector({
  key: "getRequestProjectField",
  get: ({ get }) => {
    const requestProject = get(getDetailRequestState);
    const requestProjectFieldList = requestProject.requestField;
    return requestProjectFieldList;
  },
});

export { contributeFields, getRequestProjectField };
