import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import './src/config/reactotronConfig';

import Routes from './src/routes';

export default function App() {
    return (
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    );
}
