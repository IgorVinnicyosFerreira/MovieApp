import Realm from 'realm';

export default class MovieSchema {
    public static schema: Realm.ObjectSchema = {
        name: 'Movie',
        primaryKey: 'imdbID',
        properties: {
            imdbID: 'string',
            title: 'string',
            year: 'string',
            poster: 'string',
        },
    };
}
