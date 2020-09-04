export interface IMovie {
    title: string;
    poster: string;
    imdbID: string;
    year: string;
    actors?: string;
    director?: string;
    genre?: string;
    released?: string;
    imdbRating?: string;
    favorite?: boolean;
    runtime?: string;
    plot?: string;
}

export interface INavigation {
    navigation?: any;
    route?: any;
}
