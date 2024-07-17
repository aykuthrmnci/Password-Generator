export const generatePassword = (
  length: number,
  options: { numbers: boolean; special: boolean; lowerCase: boolean; upperCase: boolean; custom?: string; filteredCharacters?: string }
) => {
  const chars = {
    num: "1234567890",
    specialChar: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    custom: options.custom!,
    filteredCharacters: options.filteredCharacters!,
  };

  const shuffleStr = (str: string) =>
    str
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

  const factor = Math.ceil(length / Object.values(options).reduce((a, b) => (b ? a + 1 : a), 0));
  let str = "";
  const shouldFilterCharacters = (value: string) => {
    if (options.filteredCharacters) {
      return value
        .split("")
        .filter((char: string) => options.filteredCharacters?.indexOf(char) === -1)
        .join("");
    }
    return value;
  };

  if (options.numbers) {
    str += shuffleStr(shouldFilterCharacters(chars.num).repeat(factor)).substring(0, length); // .substring(0, factor)
  }
  if (options.special) {
    str += shuffleStr(shouldFilterCharacters(chars.specialChar).repeat(factor)).substring(0, length);
  }
  if (options.lowerCase) {
    str += shuffleStr(shouldFilterCharacters(chars.lowerCase).repeat(factor)).substring(0, length);
  }
  if (options.upperCase) {
    str += shuffleStr(shouldFilterCharacters(chars.upperCase).repeat(factor)).substring(0, length);
  }
  if (options.custom) {
    str += shuffleStr(shouldFilterCharacters(chars.custom).repeat(factor)).substring(0, length);
  }

  return shuffleStr(str).substring(0, length);
};
