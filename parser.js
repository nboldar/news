module.exports = XMLString => {
    const rawData = XMLString.match(/<item><title>(.+?)<\/title>/gi);
    return rawData.map(elem => {
        return elem.substring(13, elem.length - 8)
    });
};
