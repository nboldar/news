const http = require('http');
const port = process.env.PORT || 8080;
const promise = require('./getNews');
//const news = require('./getNews1');
let news;
const updateNews = () => {
    promise().then((data) => {
        console.log('1');
        news = data;
    });
    const int = setTimeout(updateNews, 10 * 1000);
};
updateNews();

const app = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result))
    }
});
app.listen(port, () => {
    console.log(`Server started on port:${port}.`);
});

