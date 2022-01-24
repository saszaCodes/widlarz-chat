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
      d="m33.4 31.35-5.695-5.724C34.55 14.326 20.763 5.2 12.79 12.783c-7.738 8.714 1.95 21.59 12.815 14.952l5.695 5.569c1.646 1.81 3.75-.3 2.1-1.955ZM19.667 12.98c8.994 0 9.285 13.546 0 13.546-9.042 0-8.784-13.546 0-13.546Z"
      fill="#5603AD"
    />
  </Svg>
);

export default SvgComponent;
