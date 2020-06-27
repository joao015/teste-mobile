import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {Feather} from '@expo/vector-icons';

import Perfil from '../../assets/perfil.png';

export function Menu(props) {

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source={Perfil}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>João Gabriel Sales</Title>
                                <Caption style={styles.caption}>joaosalesgn@gmail.com</Caption>
                            </View>
                        </View>

                    </View>
                    <Drawer.Section style={styles.drawerSection}/>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="Meus cartões"
                            icon={({color, size}) => (
                                <Feather name="credit-card" color={color} size={size}/>
                            )}
                            onPress={() => {
                                props.navigation.navigate('Cards')
                            }}
                        />
                        <DrawerItem
                            label="Editar perfil"
                            icon={({color, size}) => (
                                <Feather name="user" color={color} size={size}/>
                            )}
                            onPress={() => {
                            }}
                        />
                        <DrawerItem
                            label="Configurações"
                            icon={({color, size}) => (
                                <Feather name="settings" color={color} size={size}/>
                            )}
                            onPress={() => {
                            }}
                        />
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    label="Sair"
                    icon={({color, size}) => (
                        <Feather name="log-out" color={color} size={size}/>
                    )}
                    onPress={() => {
                        props.navigation.navigate('Login')
                    }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
});
