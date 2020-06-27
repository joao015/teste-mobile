import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import {Feather} from '@expo/vector-icons';
import MenuHead from '../components/MenuHead';
import Api from "../services/api";

export default function TransactionCard({route, navigation}) {
    const {cartao} = route.params;

    const [transacoes, setTransacoes] = useState([]);
    const compras = ["Uber", "99 Taxi", "Netflix", "Ifood", "Shopping"];

    useEffect(() => {
        buscarTransacoes();
    }, []);

    async function buscarTransacoes() {
        if (cartao) {
            const params = {
                headers: {
                    user_id: cartao.user,
                    wallet_id: cartao._id,
                },
            };
            const trans = await Api.get("transaction", params);
            setTransacoes(trans.data);
        }
    }

    async function adicionarTransacao() {
        const compra = compras[Math.floor(Math.random() * compras.length)];
        const valor = parseFloat(10 + (80 - 10) * Math.random()).toFixed(2);
        const data = new Date().toISOString().substr(0, 10).split('-').reverse().join('/');
        const params = {
            headers: {
                'Content-Type': 'application/json',
                user_id: cartao.user,
            },
            data: {
                date: data,
                description: compra,
                value_transaction: valor,
            }
        };

        await Api.post("transaction/" + cartao._id, params.data, {headers: params.headers});
        buscarTransacoes();
    }

    function excluirTransacao(transacao) {
        Alert.alert(
            "Exclusão!",
            "Deseja realmente excluir a Transação: " + transacao.description + " ?",
            [
                {
                    text: "Não",
                    style: "cancel",
                },
                {
                    text: "Sim", onPress: async () => {
                        await Api.delete("transaction/" + transacao._id);
                        Alert.alert('Transação exluída com sucesso.');
                        buscarTransacoes();
                    }
                }
            ],
            {cancelable: false}
        );
    }

    function formataValor(valor) {
        return valor && valor > 0 ? 'R$ ' + valor.toString().replace('.', ',') : valor;
    }

    return (
        <>
            <MenuHead navigation={navigation} back={true}/>

            <View style={styles.container}>

                <View style={styles.card}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.card_name}>{cartao.card_name}</Text>
                            <Text style={styles.card_duedate}>{cartao.due_date}</Text>
                        </View>
                    </View>
                    <Text style={styles.card_number}>{cartao.card_number}</Text>
                </View>

                <TouchableOpacity onPress={adicionarTransacao}>
                    <View style={styles.addTrans}>
                        <Feather name="plus" size={25} color="#A0AEC0"/>
                        <Text style={styles.textAddTransBotao}>Adicionar Transação</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.linhaHorizontal}/>

                <Text style={{
                    paddingTop: 15,
                    fontSize: 25,
                }}>Transações recentes:</Text>

                <View>
                    {transacoes.length !== 0 && (
                        <FlatList
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            data={transacoes}
                            keyExtractor={item => String(item._id)}
                            renderItem={({item}) => (
                                <View style={styles.lista}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 10
                                    }}>
                                        <View>
                                            <Text style={{fontSize: 30}}>{item.description}</Text>
                                            <Text style={{fontSize: 30}}>{formataValor(item.value_transaction)}</Text>
                                        </View>

                                        <View>
                                            <Text style={{fontSize: 30}}>{item.date}</Text>
                                            <TouchableOpacity onPress={() => excluirTransacao(item)}>
                                                <View style={styles.excluirTrans}>
                                                    <Feather name="trash" size={25} color="red"/>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    <Text style={styles.linhaHorizontalLista}/>
                                </View>
                            )}
                        />)}
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    card: {
        width: 335,
        height: 200,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        padding: 24,
        borderRadius: 15,
        backgroundColor: '#0C5DFB'
    },

    card_number: {
        color: '#FFF',
        fontSize: 35,
        marginTop: 40,
    },

    card_name: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: "bold"
    },

    card_duedate: {
        color: '#FFF',
        fontSize: 25,
    },

    addTrans: {
        width: 328,
        height: 48,
        backgroundColor: '#F7FAFC',
        borderRadius: 2,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    textAddTransBotao: {
        color: '#654aff',
        fontWeight: 'bold',
        fontSize: 25,
    },

    linhaHorizontal: {
        borderBottomWidth: 1,
        marginTop: '1%',
        width: '90%',
        borderBottomColor: '#dddddd',
    },

    lista: {
        width: 450,
        marginTop: 15,
        padding: 5,
    },

    linhaHorizontalLista: {
        borderBottomWidth: 1,
        width: '100%',
        borderBottomColor: '#dddddd',
    },

    excluirTrans: {
        backgroundColor: '#F7FAFC',
        alignItems: 'center',
        marginTop: 10,
    },

});
