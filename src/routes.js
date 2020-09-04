import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import Home from './screens/home';
import SearchMovies from './screens/searchMovies';
import Movie from './screens/movie';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen
                name="Home"
                options={{ title: 'Seus Filmes' }}
                component={Home}
            />
            <Stack.Screen
                name="SearchMovies"
                options={{ title: 'Buscar Filmes' }}
                component={SearchMovies}
            />
            <Stack.Screen
                name="Movie"
                options={{ headerShown: false }}
                component={Movie}
            />
        </Stack.Navigator>
    );
}
