import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={44}
    height={44}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={22} cy={22} r={22} fill="#fff" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 11.5a1.5 1.5 0 0 1 1.5 1.5v7.5H31a1.5 1.5 0 0 1 0 3h-7.5V31a1.5 1.5 0 0 1-3 0v-7.5H13a1.5 1.5 0 0 1 0-3h7.5V13a1.5 1.5 0 0 1 1.5-1.5Z"
      fill="#5603AD"
    />
  </Svg>
);

export default SvgComponent;
