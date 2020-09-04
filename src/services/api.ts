import axios from 'axios';
import { IMovie } from '../types';

const API_KEY = 'e10b3c13';

const api = axios.create({
    baseURL: 'http://www.omdbapi.com/',
    params: {
        apiKey: API_KEY,
    },
});

interface IMoviesByTitleParams {
    title: string;
    page?: number;
}

interface IMovieAPIImdb {
    Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
}

export default {
    async getMoviesByTitle({
        title,
        page,
    }: IMoviesByTitleParams): Promise<IMovie[]> {
        const response = await api.get('', {
            params: { s: title, page: page || 1 },
        });

        if (response.data.Error) {
            return [];
        }

        return response.data.Search.map((movie: IMovieAPIImdb) => ({
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            imdbID: movie.imdbID,
        }));
    },
    async getMovieById(id: string): Promise<IMovie> {
        const response = await api.get('', { params: { i: id } });
        const { data } = response;
        return {
            title: data.Title,
            poster: data.Poster,
            imdbID: data.mdbID,
            year: data.Year,
            imdbRating: data.imdbRating,
            runtime: data.Runtime,
            plot: data.Plot,
            actors: data.Actors,
            director: data.Director,
        };
    },
};
