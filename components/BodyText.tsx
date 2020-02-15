import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, StyleSheet, Text } from 'react-native';
import { fontSizes, fonts } from '../styles/text';
import { colors } from '../styles/colors';

interface Props {
    /**
     * Text to be displayed as body text
     */
    children: ReactNode,
    /**
     * Additional styles to apply to the text
     */
    style?: StyleProp<TextStyle>
}

function BodyText({children, style}: Props) {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    )
}

export default BodyText;

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.body,
        fontFamily: fonts.sansSerif,
        color: colors.dark
    }
})