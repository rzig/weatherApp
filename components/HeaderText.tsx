import React, { ReactNode } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { fonts, fontSizes } from '../styles/text';
import { colors } from '../styles/colors';

interface Props {
    /**
     * Text to display as header text
     */
    children: ReactNode,
    /**
     * The level of the header (ie 1, 2, 3)
     */
    level: number,
    /**
     * Additional styles to apply to the text
     */
    style?: StyleProp<TextStyle>
}

function HeaderText({children, level, style}: Props) {
    return (
        <Text 
            style={[
                styles.text,
                style,
                {fontSize: fontSizes.header[level]}
            ]}
        >
            {children}
        </Text>
    )
}

export default HeaderText;

const styles = StyleSheet.create({
    text: {
        fontFamily: fonts.serif,
        color: colors.dark
    }
})