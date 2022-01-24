import * as React from "react";
import Svg, { Circle, Mask, G, Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    {...props}
    width={64}
    height={64}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={32} cy={32} r={32} fill="#E9EAEE" />
    <Mask
      id="a"
      maskType="alpha"
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={64}
      height={64}
    >
      <Circle cx={32} cy={32} r={32} fill="#E9EAEE" />
    </Mask>
    <G mask="url(#a)" fill="#BFC1CC">
      <Path d="M32 32c6.627 0 12-5.373 12-12S38.627 8 32 8s-12 5.373-12 12 5.373 12 12 12ZM32 32c19.33 0 35 15.67 35 35s-15.67 35-35 35S-3 86.33-3 67s15.67-35 35-35Z" />
    </G>
  </Svg>
);

export default SvgComponent;
