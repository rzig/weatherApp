import React, { useState } from 'react'
import HeaderText from '../components/HeaderText'
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Text } from 'react-native'
import { colors } from '../styles/colors'
import BodyText from '../components/BodyText'
import { measures } from '../styles/measures'
import Wave from '../assets/Wave'
import { fonts } from '../styles/text'
import MaskedView from '@react-native-community/masked-view';
import Button from '../components/Button'
import { useUser, useUserDispatch } from '../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'

function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const user = useUser();
    const userDispatch = useUserDispatch();

    const tryLogin = () => {
        userDispatch({type: 'LOG_IN', email: username, password: password});
    }

    if(user.signedIn) {
        navigation.navigate("Home");
        return <></>;
    } else {
        return (
            <View style={styles.container}>
                <HeaderText level={1} style={styles.headerText}>
                    Welcome Back
                </HeaderText>
                <MaskedView
                    style={styles.waveView}
                    maskElement={
                        <>
                            <Wave fill="#000"/>
                            <View style={{flex: 1, backgroundColor: "#000"}}/>
                        </>
                    }
                >
                    <KeyboardAvoidingView style={styles.formContainer} enabled behavior="padding" keyboardVerticalOffset={3 * measures.outerGutter}>
                        <BodyText style={styles.formText}>Username</BodyText>
                        <TextInput
                            value={username}
                            style={styles.formInput} 
                            onChangeText={(newText) => setUsername(newText)}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            returnKeyLabel="Log In"
                            autoCapitalize="none"
                        />
                        <BodyText style={styles.formText}>Password</BodyText>
                        <TextInput
                            value={password} 
                            style={styles.formInput} 
                            secureTextEntry 
                            onChangeText={(newText) => setPassword(newText)}
                            autoCompleteType="password"
                            returnKeyLabel="Log In"
                        />
                    </KeyboardAvoidingView>
                </MaskedView>
                <View style={styles.loginButtonContainer}>
                    <Button text="Login" onPress={() => tryLogin()} containerStyle={styles.loginButton}/>
                </View>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingTop: 2.5 * measures.outerGutter,
        backgroundColor: "#fff"
    },
    headerText: {
        width: "70%", // causes it to be on two lines
        lineHeight: 50,
        marginLeft: measures.outerGutter
    },
    formText: {
        color: colors.light
    },
    waveView: {
        backgroundColor: colors.dark,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: -1 * measures.outerGutter
    },
    formContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: measures.outerGutter,
        paddingRight: measures.outerGutter,
        backgroundColor: colors.dark,
        marginTop: -1 * measures.outerGutter
    },
    formInput: {
        paddingTop: 4,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.light,
        color: colors.light,
        fontFamily: fonts.sansSerif,
        marginBottom: 5
    },
    loginButtonContainer: {
        position: "absolute",
        width: "100%",
        bottom: measures.outerGutter
    },
    loginButton: {
        marginLeft: measures.outerGutter,
        marginRight: measures.outerGutter,
        bottom: measures.outerGutter,
        width: "auto"
    },
})