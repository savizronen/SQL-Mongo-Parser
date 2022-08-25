const { MongoClient } = require('mongodb');

const controller = require('./queryController');
const utils = require('./utils');

// ===============================================

const queriesObj = {
    1: "select * from customers",
    2: "select *, quantity from orderItems order by quantity",
    3: "select max(quantity) as max from orderItems group by oid",
    4: "select avg(age) as avg from customers group by city",
    5: "select min(age) as min from customers group by city",
    6: "select * from orders where orderDate like '25-03-2021'",
    7: "select * from customers where city in ('rehovot', 'modiin')",
    8: "select * from customers as customer join orders as orders on customer.cid = orders.cid",
    9: "update customers set city = 'rishon-lezion' where cid = 1",
    10: "insert into orders (oid, cid, orderDate) values (885, 3, '24-03-2022')",
    11: "insert into customers (cid, name, age, city) values (6, 'Itzik', 45, 'eilat')",
    12: "create table stores (storeId int, name varchar(255))",
    13: "delete from orders where orderDate = '12-02-2020'",
    14: "delete from orders where oid = 154",
};

// =============================================== opens connection to mongodb and lods collections

const dbInit = async () => {
    try {
        client = new MongoClient('mongodb://127.0.0.1:27017');
        await client.connect();
        
        const db = client.db("db");
        await utils.loadDocuments(db);
        
        return await db;
    } catch (err) {
        console.log(err);
    }
};

// =============================================== handles select sql queries and fetches data from mongodb

const handleSelectQuery = async (db, mongoQuery) => {
    let res;
    if (mongoQuery.queryType === 'query') {
        res = await db
            .collection(mongoQuery.collection)
            .find(mongoQuery.query, mongoQuery.projection)
            .limit(mongoQuery.limit)
            .toArray();
    } else if (mongoQuery.queryType === 'aggregate') {
        res = await db
            .collection(mongoQuery.collection)
            .aggregate(mongoQuery.pipeline)
            .toArray();
    }
    return res;
};

// =============================================== create config for mongo query

const getQueryConfig = (query) => {
    const tokens = query.split(' ');
    const crudAction = tokens[0].toLowerCase();

    switch(crudAction) {
        case 'create':
            return controller.makeCreateConfig(tokens);
        case 'select':
            return controller.makeSelectConfig(query);
        case 'insert':
            return controller.makeInsertConfig(query);
        case 'update':
            return controller.makeUpdateConfig(tokens);
        case 'delete':
            return controller.makeDeleteConfig(tokens);
        default:
            throw new Error("Invalid Query!");
    }
};

// =============================================== communicates with database

const updateDBdata = async (db, mongoQuery) => {
    switch(mongoQuery.type) {
        case 'select':
            return await handleSelectQuery(db, mongoQuery);
        case 'update':
            return await db.collection(mongoQuery.collection).updateMany(mongoQuery.filter, mongoQuery.update);
        case 'delete':
            return await db.collection(mongoQuery.collection).deleteMany(mongoQuery.condition);
        case 'insert':
            return await db.collection(mongoQuery.collection).insertOne(mongoQuery.insertData);
        case 'create':
            if (await utils.isCollectionExists(db, mongoQuery.collection))
                return 'Collection Exists!';
            return await db.createCollection(mongoQuery.collection);
    }
};

// =============================================== endpoint function for fetching query

const handleDbQuery = async (queryId, db) => {
    if (!isNaN(parseInt(queryId)))
        strQuery = queriesObj[queryId];
    else 
        strQuery = queryId;

    const mongoJson = getQueryConfig(strQuery);
    const result = await updateDBdata(db, mongoJson);

    return utils.formatDbResults(strQuery, result);
};

// ===============================================

module.exports = { dbInit, handleDbQuery, queriesObj };
