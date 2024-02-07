import rgbaToHex from "@/utils/rgbaToHex";

interface ColorInfo {
  backgroundColor: string;
  color: string;
}

const getRandomColor = (): ColorInfo => {
  const MAX_HEX_COLOR_VALUE: number = 16777215;

  const generateRandomColor = (): string => {
    return "#" + Math.floor(Math.random() * MAX_HEX_COLOR_VALUE).toString(16);
  };

  const generateColorWithOpacity = (color: string): string => {
    const hexPairsGroup: RegExpMatchArray | null = color.match(/[A-Za-z0-9]{2}/g);

    if (!hexPairsGroup) {
      throw new Error("색상 형식이 올바르지 않습니다.");
    }

    const rgb: number[] = hexPairsGroup.map((hexPairs) => parseInt(hexPairs, 16));
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.3)`;
  };

  const color: string = generateRandomColor();
  const rgbaBackgroundColor: string = generateColorWithOpacity(color);
  const backgroundColor = rgbaToHex(rgbaBackgroundColor);

  return {
    backgroundColor,
    color,
  };
};

export default getRandomColor;
