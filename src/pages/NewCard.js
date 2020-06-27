import React, { useState } from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MenuHead from '../components/MenuHead';
import Api from "../services/api";

export default function NewCard({ route, navigation }) {

    const [cardName, setCardName] = useState('');
    const [cardNumber, setcardNumber] = useState('');
    const [cardDate, setcardDate] = useState('');
    const [cardCvc, setcardCvc] = useState('');
    const [params, setParams] = useState({});

    async function adicionarCartao() {
        const { user } = route.params;
        setParams({
            headers: {
                'Content-Type': 'application/json',
                user_id: user.user_id,
            },
            data: {
                date: moment(new Date()),
                card_number: cardNumber,
                card_name: cardName,
                cvc: cardCvc,
                due_date: cardDate,
            }
        });
        const cartao = await Api.post("wallets", params.data, { headers: params.headers });
        limparCampos();
        Alert.alert('Cartão cadastrado com sucesso.');
        navigation.navigate('Cards');
    }

    function limparCampos() {
        setCardName('');
        setcardNumber('');
        setcardDate('');
        setcardCvc('');
        setParams({});
    }

    return (
        <>
            <MenuHead navigation={navigation} back={true} />
            <View style={styles.container}>
                <Text style={styles.textAddCartao}>Adicionar cartão de crédito</Text>
                <View style={styles.forms}>
                    <View style={styles.input}>
                        <Feather name="credit-card" size={25} color="#A0AEC0" style={styles.iconInput} />
                        <TextInput
                            maxLength={16}
                            keyboardType="numeric"
                            placeholder="Número do Cartão"
                            value={cardNumber}
                            onChangeText={setcardNumber}
                        />
                    </View>

                    <View style={styles.input}>
                        <Feather name="user" size={25} color="#A0AEC0" style={styles.iconInput} />
                        <TextInput
                            placeholder="Nome impresso no cartão"
                            value={cardName}
                            onChangeText={setCardName} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.input, { width: 154, marginRight: 16 }]}>
                            <Feather name="calendar" size={25} color="#A0AEC0" style={styles.iconInput} />
                            <TextInput
                                maxLength={5}
                                placeholder="Validade"
                                value={cardDate}
                                onChangeText={setcardDate}
                            />
                        </View>
                        <View style={[styles.input, { width: 154 }]}>
                            <Feather name="lock" size={25} color="#A0AEC0" style={styles.iconInput} />
                            <TextInput
                                maxLength={3}
                                keyboardType="numeric"
                                placeholder="CVC"
                                value={cardCvc}
                                onChangeText={setcardCvc}
                            />
                        </View>
                    </View>

                    <TouchableOpacity  onPress={adicionarCartao}>
                        <View style={styles.addCartao}>
                            <Text style={styles.textAddCartaoBotao}>Adicionar cartão</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
    },
    card: {
        width: 335,
        height: 150,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 70,
        padding: 24,
        borderRadius: 15,
        backgroundColor: '#0C5DFB'
    },
    card_image: {
        width: 70,
        height: 70
    },
    card_number: {
        color: '#FFF',
        fontSize: 25
    },
    card_name: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: "bold"
    },
    card_cvc: {
        color: '#FFF',
        fontWeight: "bold"
    },
    card_duedate: {
        color: '#FFF'
    },
    forms: {

    },
    input: {
        width: 328,
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

    addCartao: {
        width: 328,
        height: 48,
        backgroundColor: '#000',
        borderRadius: 2,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textAddCartaoBotao: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    textAddCartao: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 25,
    },
});
