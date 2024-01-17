import { atom, selector } from "recoil";

import { Field } from "types/requestProjectType";
import { getDetailRequestState } from "model/detailRequestProjectModel";

const contributeFields = atom<Field[]>({
  key: "contributeFields",
  default: [],
});

const getRequestProjectField = selector({
  key: "getRequestProjectField",
  get: ({ get }) => {
    const requestProject = get(getDetailRequestState);
    return requestProject.fields;
  },
});

export { contributeFields, getRequestProjectField };
