process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


module.exports = {
    // mysqlx://user_name@localhost:33065
    MongoURI: "mongodb://localhost:27017/"
    // MongoURI: "mongodb://admin:admin987@cluster0-shard-00-00.r3fs6.mongodb.net:27017,cluster0-shard-00-01.r3fs6.mongodb.net:27017,cluster0-shard-00-02.r3fs6.mongodb.net:27017/auth?authSource=admin&replicaSet=atlas-638q0p-shard-0&readPreference=primary&ssl=true"
}


