import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    StatusBar,
    Animated, LogBox
} from "react-native";
Animated.Text.propTypes = Animated.Text.propTypes || Text.propTypes;
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OutlinedTextField } from 'react-native-material-textfield';

export default function Login() {
    const ref_email = useRef();
    const ref_password = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSecurePasswordTextEntry, setSecurePasswordTextEntry] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        LogBox.ignoreAllLogs();//Hide all warning notifications on front-end
        
    }, [])

    function validateLogin() {
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        setEmailError('');
        setPasswordError('');
        if (!email) {
            ref_email.current.focus();
            setEmailError('Required');
        } else if (reg.test(email) === false) {
            ref_email.current.focus();
            setEmailError('Please enter a valid email');
        } else if (!password) {
            ref_email.current.focus();
            setPasswordError('Required');
        } else if ((email.trim() != 'reactnative@jetdevs.com') || (password != 'jetdevs@123')) {
            ref_password.current.focus();
            setPasswordError('Authentication failed');
        } else {
            navigation.navigate('Home');
        }
    }

    function renderUserAccessory() {
        return (
            <MaterialCommunityIcons
                color={'#64676D'}
                size={16}
                name={'account'}
                style={styles.iconEDT}
            />
        );
    }

    function onAccessoryPress() {
        setSecurePasswordTextEntry(!isSecurePasswordTextEntry);
    }

    function renderPasswordAccessory() {
        let name = isSecurePasswordTextEntry ?
            'eye' :
            'eye-off';

        return (
            <MaterialCommunityIcons
                size={22}
                name={name}
                color={'#64676D'}
                onPress={onAccessoryPress}
                suppressHighlighting={true}
            />
        );
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true} />
            <View style={[styles.loginContainer, styles.center]}>

                <Image source={require('../assets/icon.png')} style={{ width: 100, height: 100, marginBottom: 60 }} resizeMode={'contain'} />

                <OutlinedTextField
                    onChangeText={setEmail}
                    value={email}
                    label="EMAIL"
                    keyboardType={"email-address"}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_password.current.focus()}
                    ref={ref_email}
                    error={emailError}
                    inputContainerStyle={styles.lgn_txtInput}
                    labelTextStyle={{ padding: 3, margin: 0 }}
                    allowFontScaling={false}
                    renderRightAccessory={renderUserAccessory}
                    baseColor={'rgba(112,112,112, 0.5)'}
                    autoCapitalize={"none"}
                />
                <OutlinedTextField
                    onChangeText={setPassword}
                    secureTextEntry={isSecurePasswordTextEntry}
                    autoCapitalize={"none"}
                    inputContainerStyle={styles.lgn_txtInput}
                    autoCorrect={false}
                    value={password}
                    label="PASSWORD"
                    ref={ref_password}
                    error={passwordError}
                    labelTextStyle={{ padding: 3, margin: 0 }}
                    allowFontScaling={false}
                    renderRightAccessory={renderPasswordAccessory}
                    baseColor={'rgba(112,112,112, 0.5)'}
                />
                <View style={styles.btnStyle}>
                    <TouchableOpacity
                        onPress={() => validateLogin()}
                        style={{ width: "100%", marginTop: 20, backgroundColor: '#ff1d25', justifyContent: "center", alignItems: "center", width: 317, height: 43, borderRadius: 6 }}>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600', marginTop: Platform.OS === "ios" ? 2 : 0 }}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowStyle: {
        flexDirection: 'row'
    },
    loginContainer: {
        flex: 1,
        paddingTop: 30
    },
    dataContainer: {
        flex: 1
    },
    lgn_txtInput: {
        minHeight: 50,
        width: '90%',
        padding: 0,
        marginTop: 8,
        marginBottom: 8,

        borderRadius: 30,
        borderWidth: 0
    },
    btnStyle: {
        width: 327,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});