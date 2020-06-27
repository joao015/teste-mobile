import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import MenuHead from '../components/MenuHead';
import * as Animatable from "react-native-animatable";
import Api from '../services/api';

export default function NewAccount({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [params, setParams] = useState({});

    async function criarConta() {
        if (await realizarValidacao()) {
            setParams({
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    name,
                    email,
                    senha: password,
                }
            });
            const user = await Api.post("users", params.data, { headers: params.headers });
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            Alert.alert("Usuário cadastrado com sucesso!");
            navigation.navigate('Login');
        }
    }

    async function realizarValidacao() {
        if (email.length === 0) {
            Alert.alert("Por favor, digite seu email");
            return false;
        }
        if (password.length === 0) {
            Alert.alert("Por favor, digite sua senha");
            return false;
        }
        if (confirmPassword.length === 0) {
            Alert.alert("Por favor, confirme sua senha");
            return false;
        }
        if (password ===! confirmPassword) {
            Alert.alert("As senha não são iguais, por favor digite corretamente");
            return false;
        }
        return true;
    }

    return (
        <>
            <MenuHead navigation={navigation} back={true} />
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

                <Text style={styles.textAddConta}>Crie sua conta</Text>
                <View style={styles.forms}>
                    <View style={styles.input}>
                        <FontAwesome name="user" color="#05375a" size={30} style={styles.iconInput}/>
                        <TextInput
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.input}>
                        <FontAwesome name="envelope" color="#05375a" size={30} style={styles.iconInput}/>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.input}>
                        <FontAwesome name="lock" color="#05375a" size={43} style={styles.iconInput}/>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            style={styles.textInput}
                            placeholder="Senha"/>
                    </View>

                    <View style={styles.input}>
                        <FontAwesome name="lock" color="#05375a" size={43} style={styles.iconInput}/>
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            style={styles.textInput}
                            placeholder="Confirmar senha"/>
                    </View>

                    <TouchableOpacity  onPress={criarConta}>
                        <View style={styles.addConta}>
                            <Text style={styles.textAddContaBotao}>Criar conta</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: '15%',
        paddingLeft: '5%',
    },
    input: {
        width: '95%',
        height: 48,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#A0AEC0',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    iconInput: {
        marginLeft: 17,
        marginRight: 9
    },

    addConta: {
        width: '95%',
        height: 48,
        backgroundColor: '#654aff',
        borderRadius: 2,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textAddContaBotao: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    textAddConta: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 60,
        marginBottom: 25,
    },
});
