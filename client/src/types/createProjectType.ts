interface RequestType {
  kind: "request";
  description: "요청";
}

interface ContributeType {
  kind: "contribute";
  description: "기여";
}

export type CreateProjectType = RequestType | ContributeType | any;
