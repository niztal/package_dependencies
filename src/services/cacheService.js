import NodeCache from 'node-cache';

const cache = new NodeCache({
    //Assumption: package won't get change every 100 seconds!
    stdTTL: 100, //TODO: Put it on configuration file
    checkperiod: 100
})

const retrieve = (key) => {
    const entity = cache.get(key);
    return entity ? entity : null;
}

const insert = (key, entity) => {
    cache.set(key, entity);
}

const empty = () => {
    cache.flushAll();
}

module.exports = {
    retrieve,
    insert,
    empty
}