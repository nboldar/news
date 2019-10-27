const https = require('https');
const parseXML = require('./parser');

module.exports = () => {
    return new Promise((resolve, reject) => {
        const req = https.get('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en', res => {
            const {statusCode} = res;
            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            }

            if (error) {
                console.error(error.message);
                reject(error);
                res.resume();
            }

            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                resolve(parseXML(rawData));
            });
        });
        req.on('error', error => {
            reject(error);
            console.error(error)
        });

    });
};
