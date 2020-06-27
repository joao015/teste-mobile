import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Menu } from './components/Menu';

import Login from './pages/Login';
import Cards from './pages/Cards';
import NewAccount from './pages/NewAccount';
import NewCard from './pages/NewCard';
import DetailCard from './pages/DetailCard';
import TransactionCard from './pages/TransactionCard';

const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <Menu {...props} />}>
                <Drawer.Screen name="Login" component={Login} />
                <Drawer.Screen name="Cards" component={Cards} />
                <Drawer.Screen name="NewAccount" component={NewAccount} />
                <Drawer.Screen name="NewCard" component={NewCard} />
                <Drawer.Screen name="DetailCard" component={DetailCard} />
                <Drawer.Screen name="TransactionCard" component={TransactionCard} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
