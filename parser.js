module.exports = XMLString => {
    if (typeof XMLString !== 'string'){
        return [];
    }
    const rawData = XMLString.match(/<item><title>(.+?)<\/title>/gi);
    return rawData === null ? [] : rawData.map(elem => {
        return elem.substring(13, elem.length - 8)
    });

};
