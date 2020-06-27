import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {Feather} from '@expo/vector-icons';
import MenuHead from '../components/MenuHead';
import cartao from '../../assets/cartao.png';

import Visa from '../../assets/cards/visa.png';
import MasterCard from '../../assets/cards/mastercard.png';
import AmericanExpress from '../../assets/cards/american-express.png';
import Api from "../services/api";

export default function Cards({route, navigation}) {
    const [paramsRoute] = useState(route.params);
    const [cartoes, setCartoes] = useState([]);

    useEffect(() => {
        buscarCartoes();
    }, []);

    async function buscarCartoes() {
        if (paramsRoute) {
            const params = {
                headers: {
                    user_id: paramsRoute.user.user_id,
                },
            };
            const cards = await Api.get("wallets", params);
            setCartoes(cards.data);
        }
    }

    async function detalharCartao(cartao) {
        await navigation.navigate('DetailCard', { cartao });
    }

    return (
        <>
            <MenuHead navigation={navigation} back={false}/>
            <View style={styles.container}>
                {cartoes.length === 0 ? (
                    <View style={styles.viewCartao}>
                        <Image source={cartao}/>
                        <Text style={styles.labelNenhumCartao}>Nenhum cartão Cadastrado.</Text>
                    </View>
                ) : (
                    <View style={styles.containerList}>
                        <FlatList
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            data={cartoes}
                            keyExtractor={item => String(item._id)}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.card} onPress={() => detalharCartao(item)}>
                                    {/*<Image source={item.img_card} style={styles.card_image}/>*/}
                                    <Text style={styles.card_number}>{item.card_number}</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 10
                                    }}>
                                        <View>
                                            <Text style={styles.card_name}>{item.card_name}</Text>
                                            <Text style={styles.card_duedate}>{item.due_date}</Text>
                                        </View>

                                        <View>
                                            <Text style={styles.card_cvc}>{item.cvc}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}

                <TouchableOpacity style={{marginBottom: 10}} onPress={() => navigation.navigate('NewCard', { user: paramsRoute.user })}>
                    <View style={styles.viewBotaoAdd}>
                        <Feather name="plus-square" color="#654aff" size={16}/>
                        <Text style={styles.labelAddCartao}>Adicionar novo cartão</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{marginBottom: 20}} onPress={() => buscarCartoes()}>
                    <View style={styles.viewBotaoAtualizar}>
                        <Text style={styles.labelAddCartao}>Atualizar Tela</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
    },
    viewCartao: {
        alignItems: 'center',
    },
    labelNenhumCartao: {
        color: '#718096',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        marginTop: 11,
    },
    labelAddCartao: {
        color: '#654aff',
        fontSize: 16,
        marginLeft: 11,
    },
    viewBotaoAdd: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        height: 64,
        borderRadius: 6,
    },
    viewBotaoAtualizar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        height: 20,
        borderRadius: 6,
    },
    containerList: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
    }
});
