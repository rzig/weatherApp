import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

function Gradient() {
  return (
    <Svg width={435} height={128} viewBox="0 0 435 128">
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} />
          <Stop offset={1} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path
        data-name="Rectangle 2"
        transform="rotate(180 217.5 64)"
        fill="url(#prefix__a)"
        d="M0 0h435v128H0z"
      />
    </Svg>
  )
}

export default Gradient