import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import {FontAwesome, Feather} from '@expo/vector-icons'

export default function Login(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);

    function secureEntry() {
        (mostrarPassword === false) ? setMostrarPassword(true) : setMostrarPassword(false);
    }

    useEffect(() => {
    }, []);

    const [user] = useState({
            "__v": 0,
            "user_id": "5ef2920649f57700213a3b2c",
            "email": "Joao-sales2009@hotmail.com",
            "name": "Joao Gabriel",
            "senha": "joao123",
        }
    );

    function criarConta() {
        props.navigation.navigate('NewAccount');
    }

    async function realizaLogin() {
        props.navigation.navigate('Cards', { user });
    }

    return (
        <View style={styles.container}>

            <View style={styles.logo1}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={3000}
                    source={require('../../assets/logo.png')}
                    style={styles.logo2}
                    resizeMode="stretch"
                />
            </View>

            <View style={styles.header}>
                <Text style={styles.bemVindo}>Bem vindo,</Text>
                <Text style={styles.facaLogin}>faça login para continuar</Text>
            </View>

            <Text style={styles.linhaHorizontal}/>

            <View style={styles.action}>
                <FontAwesome name="envelope" color="#05375a" size={30}/>
                <TextInput
                    value={login}
                    onChangeText={setLogin}
                    style={styles.textInput}
                    placeholder="Email"/>
                {(login.length !== 0) ?
                    <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={30}/>
                    </Animatable.View>
                    :
                    null
                }
            </View>

            <View style={styles.action}>
                <FontAwesome name="lock" color="#05375a" size={43}/>
                {(mostrarPassword === false) ?
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={styles.textInput}
                        placeholder="Senha"/>
                    :
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textInput}
                        placeholder="Senha"/>
                }
                <TouchableOpacity onPress={secureEntry}>
                    {(mostrarPassword === false) ? <Feather name="eye-off" color="gray" size={30}/> :
                        <Feather name="eye" color="gray" size={30}/>}
                </TouchableOpacity>
            </View>

            <Text style={styles.esqueceuSenha}>Esqueceu sua senha?</Text>

            <TouchableOpacity onPress={realizaLogin}>
                <View style={styles.buttonLogin}>
                    <LinearGradient colors={['#654aff', '#654aff']} style={styles.gradientLogin}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>

            <View style={[styles.header, {alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}]}>
                <Text style={styles.membro}>Ainda não é membro? </Text>
                <TouchableOpacity onPress={criarConta}>
                    <Text style={styles.criarConta}>Criar uma conta</Text>
                </TouchableOpacity>
            </View>
        </ View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: '15%',
        paddingLeft: '5%',
        // alignItems: 'left',
        // justifyContent: 'center',
    },
    header: {
        paddingTop: '5%',
        fontSize: 50,
    },
    bemVindo: {
        fontSize: 75,
    },
    facaLogin: {
        fontSize: 25,
    },
    membro: {
        fontSize: 20,
    },
    criarConta: {
        fontSize: 20,
        color: '#654aff',
    },
    linhaHorizontal: {
        borderBottomWidth: 1,
        marginTop: '5%',
        marginRight: '5%',
        borderBottomColor: '#c5c7c9'
    },
    esqueceuSenha: {
        marginTop: '5%',
        fontSize: 25,
        color: '#654aff'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 20,
        color: "#05375a",
        fontSize: 30,
    },
    buttonLogin: {
        alignItems: 'center',
        marginTop: 30,
    },
    gradientLogin: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#654aff',
        marginRight: '5%'
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25.,
    },
});
