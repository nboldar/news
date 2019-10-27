const cluster=require('../cluster');
const os=require('os');

test('workers number should be equal CPU num', async ()=>{
    const keys= await Object.keys(cluster.workers);
    expect(keys.length).toBe(os.cpus().length);
});

afterAll(async () => {
   await cluster.disconnect();
});
