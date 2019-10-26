const https = require('https');
const parser = require('./parser');

const getNews1 = async () => {
    let responseData;
    try {
        const req = https.get('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en', res => {
            const {statusCode} = res;

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            }

            if (error) {
                console.error(error.message);
                res.resume();
                return;
            }

            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    responseData = parser(rawData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
        req.on('error', error => {
            console.error(error)
        });
    } catch (e) {
        console.log()
    }
    return await responseData;
};
module.exports = getNews1;
