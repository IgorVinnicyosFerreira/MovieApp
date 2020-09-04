import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Container, AddIcon, TextEmptyMovieList, ChevronIcon } from './styles';
import { TouchableOpacity, FlatList } from 'react-native';
import { IMovie, INavigation } from '../../types';
import Realm from '../../services/realm';
import MovieListItem from '../../components/movieListItem';

const Home: React.FC<INavigation> = ({ navigation }) => {
    const [movies, setMovies] = useState<IMovie[]>([]);

    useFocusEffect(
        useCallback(() => {
            async function loadMovies() {
                const realm = await Realm();
                const movieList = realm
                    .objects<IMovie>('Movie')
                    .sorted('title')
                    .map((movie) => movie);

                setMovies(movieList);
            }

            loadMovies();
        }, []),
    );

    useLayoutEffect(() => {
        function navigateToSearchMoviesScreen() {
            navigation.navigate('SearchMovies');
        }

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={navigateToSearchMoviesScreen}>
                    <AddIcon />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    function navigateToMovieScreen(imdbID: string) {
        navigation.navigate('Movie', { imdbID });
    }

    function renderItem({ item }: { item: IMovie }) {
        const iconName = item.favorite ? 'heart' : 'heart-outline';
        return (
            <TouchableOpacity
                onPress={() => navigateToMovieScreen(item.imdbID)}>
                <MovieListItem
                    title={item.title}
                    poster={item.poster}
                    year={item.year}>
                    <ChevronIcon />
                </MovieListItem>
            </TouchableOpacity>
        );
    }

    return (
        <Container>
            {movies.length === 0 && (
                <TextEmptyMovieList>
                    Filmes não cadastrados, adicione filmes para continuar.
                </TextEmptyMovieList>
            )}
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}-movie`}
            />
        </Container>
    );
};

export default Home;
