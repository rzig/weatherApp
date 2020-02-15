/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react";
import Svg, { Defs, Path } from "react-native-svg";
import { View, StyleProp, ViewStyle, Dimensions } from "react-native";
/* Adobe XD React Exporter has dropped some elements not supported by react-native-svg: style */

interface Props {
  /**
   * Fill color
   */
  fill: string,
  /**
   * Additional styles to apply
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Displays a 'wave' image, intended for use on
 * the login screen.
 */
function Wave({fill, style}: Props){
  return (
    <View style={style}>
      <Svg viewBox="0 0 377 64.103" width={Dimensions.get("screen").width} height={Dimensions.get("screen").width / (376 / 64.1)} scaleX={3} style={{transform: [{scaleX: 1.1}]}}>
        <Path
          fill={fill}
          d="M376,273H0V252.626c19.182,12.234,39.325,18.437,59.872,18.437a116.135,116.135,0,0,0,44.951-9.525c23.413-9.814,44.112-17.788,63.278-24.379,19.457-6.69,37.3-11.944,54.555-16.062a436.571,436.571,0,0,1,50.15-9,474.544,474.544,0,0,1,50.062-3.191c.543-.007,1.1-.011,1.643-.011,14.72,0,32.043,2.692,51.489,8V273Z"
          transform="translate(0 -208.396)"
        />
      </Svg>
    </View>
  )
}

export default Wave;