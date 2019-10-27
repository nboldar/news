const getNews = require('../getNews');

test('get response from google news url', () => {
    return getNews().then(data => {
        expect(typeof data==='string').toBeTruthy();
    });
});
test('Is it google news?', () => {
    return getNews().then(data => {
        expect(/<description>Google News<\/description>/.test(data)).toBeTruthy();
    });
});
