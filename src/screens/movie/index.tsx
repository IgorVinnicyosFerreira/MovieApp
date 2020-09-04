import React, { useEffect, useState } from 'react';
import { INavigation } from '../../types';
import {
    Container,
    ScrollView,
    PosterContainer,
    Poster,
    BackButton,
    BackIcon,
    FavoriteButton,
    FavoriteIcon,
    Title,
    InfoContainer,
    MovieInfoTitle,
    DataContainer,
    MovieInfoValue,
    PlotContainer,
    SectionTitle,
    SectionText,
    ActorsContainer,
    DirectorContainer,
} from './styles';
import Api from '../../services/api';
import Realm from '../../services/realm';
import { IMovie } from '../../types';
import { Alert } from 'react-native';

const Movie: React.FC<INavigation> = ({ route, navigation }) => {
    const [movie, setMovie] = useState<IMovie>();
    const [favorite, setFavorite] = useState<boolean>(true);

    const { imdbID } = route.params;

    useEffect(() => {
        async function loadMovie() {
            const data = await Api.getMovieById(imdbID);
            setMovie(data);
        }
        loadMovie();
    }, [imdbID]);

    function goBackScreen() {
        navigation.goBack();
    }

    async function handleFavorite() {
        try {
            const realm = await Realm();
            realm.write(() => {
                if (favorite) {
                    realm.delete(realm.objectForPrimaryKey('Movie', imdbID));
                } else {
                    realm.create('Movie', {
                        title: movie?.title,
                        poster: movie?.poster,
                        year: movie?.year,
                        imdbID: imdbID,
                    });
                }
            });
            setFavorite(!favorite);
        } catch (error) {
            Alert.alert('Erro', 'Falha ao executar esta ação');
        }
    }

    return (
        <Container>
            <ScrollView>
                <PosterContainer>
                    <Poster
                        source={{
                            uri: movie?.poster,
                        }}
                    />
                    <BackButton onPress={goBackScreen}>
                        <BackIcon />
                    </BackButton>
                    <FavoriteButton onPress={handleFavorite}>
                        <FavoriteIcon
                            name={favorite ? 'heart' : 'heart-outline'}
                        />
                    </FavoriteButton>
                </PosterContainer>
                <Title>{movie?.title}</Title>
                <InfoContainer>
                    <DataContainer>
                        <MovieInfoTitle>ANO</MovieInfoTitle>
                        <MovieInfoValue>{movie?.year}</MovieInfoValue>
                    </DataContainer>
                    <DataContainer>
                        <MovieInfoTitle>NOTA</MovieInfoTitle>
                        <MovieInfoValue>{movie?.imdbRating}</MovieInfoValue>
                    </DataContainer>
                    <DataContainer>
                        <MovieInfoTitle>DURAÇÃO</MovieInfoTitle>
                        <MovieInfoValue>{movie?.runtime}</MovieInfoValue>
                    </DataContainer>
                </InfoContainer>

                <PlotContainer>
                    <SectionTitle>Enredo</SectionTitle>
                    <SectionText>{movie?.plot}</SectionText>
                    <ActorsContainer>
                        <SectionTitle>Atores</SectionTitle>
                        <SectionText>{movie?.actors}</SectionText>
                        <DirectorContainer>
                            <SectionTitle>Diretor</SectionTitle>
                            <SectionText>{movie?.director}</SectionText>
                        </DirectorContainer>
                    </ActorsContainer>
                </PlotContainer>
            </ScrollView>
        </Container>
    );
};

export default Movie;
