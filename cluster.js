const cluster = require('cluster');
const os = require('os');

const createWorker = (cluster) => {
    const worker = cluster.fork();
    console.log(`Worker created, it's pid:${worker.process.pid}`);
    worker.on('exit', () => {
        console.log(`Worker died with pid:${worker.process.pid}`);
        cluster.fork()
    });
};

if (cluster.isMaster) {
    let i = os.cpus().length;
    console.log(`Master started. CPU num is ${i}`);
    while (i > 0) {
        createWorker(cluster);
        i--;
    }
}
if (cluster.isWorker) {
    require('./server');
}
