export const findWithRegex = (
  regex: RegExp,
  contentBlock: any,
  callback: (start: number, end: number) => void,
) => {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};
