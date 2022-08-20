export const isValidLetter = (value: string) => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z|0-9]*$/g.test(value);
export const isValidLength = (value: string) => value.length >= 2 && value.length <= 12;
