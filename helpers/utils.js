const CircularJSON = require('circular-json');

// =============================================== gets fields and values from sql query

const extractDataFromTokens = (query, tokens, searchWord, isExtractingFields) => {
    const keyWordIdx = tokens.findIndex(word => word.toLowerCase() === searchWord.toLowerCase()) + (isExtractingFields ? 1 : 0);
    const keyWord = tokens[keyWordIdx];

    const keyWordEndIdx = query.search(keyWord) + keyWord.length;
    const dataEndIdx = query.indexOf(")", keyWordEndIdx);

    const dataStr = query.slice(keyWordEndIdx, dataEndIdx + 1).replace("(", "").replace(")", "");

    let dataArr =  dataStr.split(',');
    dataArr = dataArr.map(word => { 
        word = word.replace(/'/g,""); 
        if (word[0] === ' ')
            word = word.replace(" ", '');
        return word;
    });

    return dataArr;
}

// =============================================== load collections to mongodb

const loadDocuments = async (db) => {
    const { CUSTOMERS, ORDERS, ORDER_ITEMS } = require('./data');

    await db.dropDatabase();
    await db.collection("customers").insertMany(CUSTOMERS);
    await db.collection("orders").insertMany(ORDERS);
    await db.collection("orderItems").insertMany(ORDER_ITEMS);
}

// ===============================================  validates insert query syntax

const isInsertQueryValid = (fields, values) => {
    if (values.length !== fields.length 
        || values.some(value => value.length < 1) 
            || fields.some(value => value.length < 1)) 
        return false;
    
    return true;
};

// =============================================== checks in db if collection already exists

const isCollectionExists = async (db, collectionName) => {
    const collectionsObj = await db.listCollections().toArray();

    for (const collection of collectionsObj) {
        if (collection.name === collectionName) 
            return true;
    }
    return false;
}


// =============================================== format query results 

const formatDbResults = (query, result) => {
    if (query.toLowerCase().includes('create'))
        return CircularJSON.stringify(result);
    else
        return JSON.stringify(result, null, 4);
}

// ===============================================

module.exports = { 
    extractDataFromTokens, 
    loadDocuments,
    isInsertQueryValid,
    isCollectionExists,
    formatDbResults
};