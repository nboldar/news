const http = require('http');
const getNews = require('./getNews');
const parseXML = require('./parser');
const port = process.env.PORT || 8080;

let newsTitles = JSON.stringify(['No news']);
const updateNews = async () => {
    try {
        const rawData = await getNews();
        newsTitles = JSON.stringify(parseXML(rawData));
    } catch (e) {
        console.log(e.message);
    }
    const update = setTimeout(updateNews, 60 * 1000);
};
updateNews();

const app = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(newsTitles)
    }
});
app.listen(port, () => {
    console.log(`Server started on port:${port}.`);
});

module.exports = app;
