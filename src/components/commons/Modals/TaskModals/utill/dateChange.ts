function convertToUTCString(inputDate: string) {
  const date = new Date(inputDate);

  // UTC 형식의 문자열로 변환
  const utcString = date.toISOString();

  return utcString;
}

export { convertToUTCString };
