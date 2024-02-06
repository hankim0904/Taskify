export default function rgbaToHex(rgbaString: string) {
  // RGBA 문자열에서 각 값 추출
  const match = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);

  if (!match) {
    throw new Error("Invalid RGBA string");
  }

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const a = match[4] !== undefined ? parseFloat(match[4]) : 1.0;

  // 각 값을 16진수로 변환
  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");
  const aHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");

  // 최종 HEX 값 생성
  const hex = `#${rHex}${gHex}${bHex}${aHex}`;

  return hex;
}
