import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Constants from 'expo-constants';

import Perfil from '../../assets/perfil.png';

export default function MenuHead(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {props.back === false ?
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <Feather name="menu" size={30} color="#FFF" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Feather name="arrow-left" size={30} color="#FFF" />
                    </TouchableOpacity>
                }

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.welcome}>Olá, João Gabriel!</Text>
                <View style={styles.viewImagem}>
                    <Image source={Perfil} style={styles.imagemPerfil} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0e0f2c',
        marginTop: 0,
        padding: 25,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    welcome: {
        color: '#FFF',
        marginRight: 6,
        fontSize: 18,
    },
    viewImagem: {
        height: 34,
        width: 34,
        borderRadius: 50,
        borderColor: 'transparent',
        borderWidth: 3,
        overflow: 'hidden',
    },
    imagemPerfil: {
        flex: 1,
        width: null,
        height: null,
    }
});
