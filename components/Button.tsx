import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, TouchableWithoutFeedback, Text, View } from 'react-native';
import { colors } from '../styles/colors';
import { fontSizes, fonts } from '../styles/text';

interface Props {
    /**
     * Text to display in the button
     */
    text: string,
    /**
     * Function to execute when the button
     * has been pressed
     */
    onPress: () => void,
    /**
     * Styles to apply to the button's container
     */
    containerStyle?: StyleProp<ViewStyle>,
    /**
     * Styles to apply to the button's text
     */
    textStyle?: StyleProp<TextStyle>
}

function Button({text, onPress, containerStyle, textStyle}: Props) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.button, containerStyle]}>
                <Text style={[styles.buttonText, textStyle]}>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.light,
        padding: 8,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: fontSizes.header[2],
        fontFamily: fonts.serif,
        textAlign: "center",
        color: colors.dark
    }
})