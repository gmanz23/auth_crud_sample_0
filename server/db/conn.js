//db driver

const { MongoClient } = require("mongodb");

const atlasURI = process.env.ATLAS_URI;
const dbName = process.env.DATABASE_NAME;

var _db;

//create mongo client
const client = new MongoClient(atlasURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = {
    
    connectToServer: function (callback) {
        // initilize db connection
        client.connect(function (err, db) {
            if (db)
            {
                _db = db.db(dbName);
                console.log("Successfully connected to data source."); 
            }
            return callback(err);
        });
    },
    
    getDb: function () {
      return _db;
    }
};