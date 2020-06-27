import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Feather} from '@expo/vector-icons';
import MenuHead from '../components/MenuHead';
import Api from "../services/api";

export default function DetailCard({route, navigation}) {
    const {cartao} = route.params;

    const [cardName, setCardName] = useState(cartao.card_name);
    const [cardNumber, setcardNumber] = useState(String(cartao.card_number));
    const [cardDate, setcardDate] = useState(cartao.due_date);
    const [cardCvc, setcardCvc] = useState(String(cartao.cvc));

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
    }

    async function alterarCartao() {
        const params = {
            data: {
                date: moment(new Date()),
                card_number: cardNumber,
                card_name: cardName,
                cvc: cardCvc,
                due_date: cardDate,
            }
        };
        await Api.put("wallets/" + cartao._id, params.data);
        limparCampos();
        Alert.alert('Cartão alterado com sucesso.');
        navigation.navigate('Cards');
    }

    function deletarCartao() {
        Alert.alert(
            "Exclusão!",
            "Deseja realmente excluir o cartão?",
            [
                {
                    text: "Não",
                    style: "cancel",
                },
                {
                    text: "Sim", onPress: async () => {
                        await Api.delete("wallets/" + cartao._id);
                        Alert.alert('Cartão exluído com sucesso.');
                        navigation.navigate('Cards');
                    }
                }
            ],
            {cancelable: false}
        );
    }

    function transacaoCartao() {
        navigation.navigate("TransactionCard", {cartao});
    }

    function limparCampos() {
        setCardName('');
        setcardNumber('');
        setcardDate('');
        setcardCvc('');
    }

    return (
        <>
            <MenuHead navigation={navigation} back={true}/>

            <View style={styles.container}>

                <TouchableOpacity onPress={transacaoCartao}>
                    <View style={styles.transacaoCartao}>
                        <Text style={styles.textTransacaoCartaoBotao}>Transações do Cartão</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.textAddCartao}>Detalhes do cartão</Text>
                <View style={styles.forms}>
                    <View style={styles.input}>
                        <Feather name="credit-card" size={25} color="#A0AEC0" style={styles.iconInput}/>
                        <TextInput
                            maxLength={16}
                            keyboardType="numeric"
                            placeholder="Número do Cartão"
                            value={cardNumber}
                            onChangeText={setcardNumber}
                        />
                    </View>

                    <View style={styles.input}>
                        <Feather name="user" size={25} color="#A0AEC0" style={styles.iconInput}/>
                        <TextInput
                            placeholder="Nome impresso no cartão"
                            value={cardName}
                            onChangeText={setCardName}/>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <View style={[styles.input, {width: 154, marginRight: 16}]}>
                            <Feather name="calendar" size={25} color="#A0AEC0" style={styles.iconInput}/>
                            <TextInput
                                maxLength={5}
                                placeholder="Validade"
                                value={cardDate}
                                onChangeText={setcardDate}
                            />
                        </View>
                        <View style={[styles.input, {width: 154}]}>
                            <Feather name="lock" size={25} color="#A0AEC0" style={styles.iconInput}/>
                            <TextInput
                                maxLength={3}
                                keyboardType="numeric"
                                placeholder="CVC"
                                value={cardCvc}
                                onChangeText={setcardCvc}
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={alterarCartao}>
                        <View style={styles.addCartao}>
                            <Text style={styles.textAddCartaoBotao}>Confirmar alteração</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={deletarCartao}>
                        <View style={styles.excluirCartao}>
                            <Text style={styles.textExcluirCartaoBotao}>Excluir cartão</Text>
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
    forms: {},
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

    excluirCartao: {
        width: 328,
        height: 48,
        backgroundColor: '#F7FAFC',
        borderRadius: 2,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textExcluirCartaoBotao: {
        color: '#bc0005',
        fontWeight: 'bold',
        fontSize: 25
    },

    textAddCartao: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 25,
    },

    textAddCartaoBotao: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    transacaoCartao: {
        width: 328,
        height: 48,
        backgroundColor: '#654aff',
        borderRadius: 2,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textTransacaoCartaoBotao: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

});
