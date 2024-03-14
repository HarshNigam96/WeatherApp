import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

// 414 is figma mobile width size and 816 is figma mobile height size
const guidelineBaseWidth = width / 414;
const guidelineBaseHeight = height / 896;

// For font use this scale
const respSize = (size: number) => guidelineBaseWidth * size;
const verticalScale = (size: number) => guidelineBaseHeight * size;

//For Image use this for both width and height
const moderateScale = (size: number, factor: number = 0.2) =>
  size + (respSize(size) - size) * factor;

export { respSize, verticalScale, moderateScale };
