import Realm from 'realm';

import RepositorySchema from '../schemas/movieSchema';

export default function getRealm() {
    return Realm.open({
        schema: [RepositorySchema],
    });
}
