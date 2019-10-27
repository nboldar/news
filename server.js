const http = require('http');
const port = process.env.PORT || 8080;
const getNews = require('./getNews');

let news = ['No news'];
const updateNews = async () => {
    try {
        news = await getNews();
    } catch (e) {
        console.log(e.message);
    }
    const update = setTimeout(updateNews, 10 * 1000);
};
updateNews();

const app = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(news))
    }
});
app.listen(port, () => {
    console.log(`Server started on port:${port}.`);
});

