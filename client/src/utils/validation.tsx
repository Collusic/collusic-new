export const validateLetter = (value: string) => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z|0-9]*$/g.test(value);
export const validateLength = (value: string) => value.length >= 2 && value.length <= 12;
