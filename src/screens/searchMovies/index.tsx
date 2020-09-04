import React, { useState, useEffect } from 'react';
import {
    Container,
    SearchInput,
    SearchContainer,
    SearchIcon,
    HearthIcon,
    LoadingIndicator,
    TextMoviesNotFound,
} from './styles';
import { FlatList, Alert, TouchableOpacity, Keyboard } from 'react-native';
import MovieListItem from '../../components/movieListItem';
import Api from '../../services/api';
import Realm from '../../services/realm';
import { IMovie } from '../../types';

const SearchMovies: React.FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [favoritesMoviesIds, setFavoritesMoviesIds] = useState<string[]>([]);
    const [refreshList, setRefreshList] = useState<boolean>(false);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
    const [loading, setLoading] = useState<boolean>(false);
    const [movieNotFound, setMovieNotFound] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        async function loadFavoritesMovies() {
            const realm = await Realm();
            const favMoviesIdList = realm
                .objects<IMovie>('Movie')
                .map((movie) => movie.imdbID);

            setFavoritesMoviesIds(favMoviesIdList);
        }

        loadFavoritesMovies();
    }, []);

    //debounce
    function onSearchChangeText(text: string) {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);
                const movieList = await Api.getMoviesByTitle({ title: text });
                const movieListWithFavoriteAttr = movieList.map((movie) => {
                    return favoritesMoviesIds.indexOf(movie.imdbID) !== -1
                        ? { ...movie, favorite: true }
                        : movie;
                });
                setMovies(movieListWithFavoriteAttr);

                if (movieList.length === 0) {
                    setMovieNotFound(true);
                } else {
                    setMovieNotFound(false);
                    Keyboard.dismiss();
                }
            } catch (error) {
                Alert.alert('Erro', 'Ocorreu um erro ao buscar por o filme');
            }
            setTitle(text);
            setPage(1);
            setLoading(false);
        }, 1000);

        setSearchTimeout(timeout);
    }

    async function loadMoreMovies() {
        try {
            const nextPage = page + 1;
            setPage(nextPage);

            const movieList = await Api.getMoviesByTitle({
                title,
                page: nextPage,
            });
            const movieListWithFavoriteAttr = movieList.map((movie) => {
                return favoritesMoviesIds.indexOf(movie.imdbID) !== -1
                    ? { ...movie, favorite: true }
                    : movie;
            });
            setMovies([...movies, ...movieListWithFavoriteAttr]);
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao carregar mais filmes');
        }
    }

    async function saveMovie(movie: IMovie) {
        const realm = await Realm();

        realm.write(() => {
            realm.create('Movie', {
                title: movie.title,
                poster: movie.poster,
                year: movie.year,
                imdbID: movie.imdbID,
            });
        });
    }

    async function removeMovie(id: string) {
        const realm = await Realm();

        realm.write(() => {
            const movie = realm.objectForPrimaryKey('Movie', id);
            if (movie) {
                realm.delete(movie);
            }
        });
    }

    async function handleAddMovie(id: string) {
        try {
            const movie = movies.find((movieItem) => movieItem.imdbID === id);
            if (!movie) {
                return;
            }

            if (movie.favorite) {
                await removeMovie(id);
                const index = favoritesMoviesIds.indexOf(movie.imdbID);
                favoritesMoviesIds.splice(index, 1);
            } else {
                await saveMovie(movie);
                favoritesMoviesIds.push(movie.imdbID);
            }

            const movieList = movies.map((movieItem) => {
                if (movieItem.imdbID === movie.imdbID) {
                    return { ...movieItem, favorite: !movie };
                }
                return movieItem;
            });
            setFavoritesMoviesIds(favoritesMoviesIds);
            setMovies(movieList);
        } catch (error) {
            Alert.alert('Erro', 'Falha ao executar esta ação');
        }
    }

    function renderItem({ item }: { item: IMovie }) {
        const isFavorite = favoritesMoviesIds.indexOf(item.imdbID) !== -1;
        const iconName = isFavorite ? 'heart' : 'heart-outline';
        return (
            <MovieListItem
                title={item.title}
                poster={item.poster}
                year={item.year}>
                <TouchableOpacity onPress={() => handleAddMovie(item.imdbID)}>
                    <HearthIcon name={iconName} />
                </TouchableOpacity>
            </MovieListItem>
        );
    }

    return (
        <Container>
            <SearchContainer>
                <SearchIcon name="search-outline" />
                <SearchInput autoFocus onChangeText={onSearchChangeText} />
            </SearchContainer>
            {movieNotFound && (
                <TextMoviesNotFound>
                    Não encontramos um filme correspondente :(
                </TextMoviesNotFound>
            )}

            {loading ? (
                <LoadingIndicator />
            ) : (
                <FlatList
                    data={movies}
                    extraData={favoritesMoviesIds}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${index}-movie`}
                    onEndReachedThreshold={0.8}
                    onEndReached={loadMoreMovies}
                />
            )}
        </Container>
    );
};

export default SearchMovies;
