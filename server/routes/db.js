// Use this file to connect to database - easy to switch between local and cloud for testing
const{MongoClient} = require('mongodb')

let dbConnection
// Connect to local database
// let URI = 'mongodb://127.0.0.1:27017/PM_AI'
// Connect to Mongo Atlast database
let URI = 'mongodb+srv://NhienPhan:hoangnhien2909@cluster0.khirzqo.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(URI)
        // MongoClient.connect(cloudURI)
         .then((client) => {
            dbConnection = client.db()
            return cb()
         })
         .catch(err => {
            console.log(err)
            return cb(err)
         })
    },
    getDb: () => dbConnection,
    URI
}