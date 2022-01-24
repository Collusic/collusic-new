import { atom, selector } from "recoil";

import { API } from "../utils/axios";
import { getDetailRequest } from "./detailRequestProjectModel";

const getRequestProjectField = selector({
  key: "getRequestProjectField",
  get: ({ get }) => {
    const requestProject = get(getDetailRequest);
    const requestProjectFieldList = requestProject.requestField;
    return requestProjectFieldList;
  },
});

export { getRequestProjectField };
