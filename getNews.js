const https = require('https');

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
                res.resume();
                reject(error);
            }

            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                resolve(rawData);
            });
        });
        req.on('error', error => {
            console.error(error);
            reject(error);
        });

    });
};
