const mongoose = require('mongoose');

module.exports = async ()=>{
    return new Promise((resolve, reject)=>{
        console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`)
        mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                resolve()})
            .catch((err) => {
                reject(err)
            });
    })
}
