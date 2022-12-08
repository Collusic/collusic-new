const onChangeMeldoyFile = (
  e: React.ChangeEvent<HTMLInputElement> | any
) => {
  e.preventDefault();

  let fileName = "+ mp3 파일을 드래그하여 업로드 해주세요.";
  let file = e.currentTarget.files[0];

  if (e.type === "change" && file !== undefined) {
    fileName = file.name;
  }
  e.currentTarget.parentNode.lastChild.innerText = fileName;
};

const stopEventBubbling = (e: React.MouseEvent<HTMLDivElement> | MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.stopPropagation();
}

export {
  onChangeMeldoyFile,
  stopEventBubbling,
}