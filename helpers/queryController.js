const SQLParser = require('@synatic/sql-to-mongo');

const utils = require('./utils');

// ===============================================

const makeCreateConfig = (tokens) => {
    const collection = tokens[2];
    
    return {
        type: 'create',
        collection: collection
    }
};

// ===============================================

const makeSelectConfig = (query) => {
    const parsedSQL = SQLParser.parseSQL(query);
    let _collection;

    if (parsedSQL.type === 'query')
        _collection = parsedSQL.collection;
    else if (parsedSQL.type === 'aggregate')
        _collection = parsedSQL.collections[0];

    return {
        type: 'select',
        queryType: parsedSQL.type,
        collection: _collection,
        query: parsedSQL.query || {},
        projection:  parsedSQL.projection || {},
        limit: parsedSQL.limit || 50,
        pipeline: parsedSQL.pipeline
    }
};

// ===============================================

const makeInsertConfig = (query) => {
    const tokens = query.split(' ');

    const fieldsArr = utils.extractDataFromTokens(query, tokens, "INTO", true);
    const valuesArr = utils.extractDataFromTokens(query, tokens, "VALUES", false);

    if (!utils.isInsertQueryValid(fieldsArr, valuesArr)) {
        console.log("your query is invalid");
        return;
    }

    const insertData = fieldsArr.map((field, idx) => { 
        let value = valuesArr[idx];
        const isNumber = !isNaN(value);
        
        if (isNumber)
            value = Number(value);

        return [field, value]
    });

    const map = new Map(insertData);

    return {
        type: 'insert',
        collection: tokens[2],
        insertData: Object.fromEntries(map)
    }
};

// ===============================================

const makeUpdateConfig = (tokens) => {
    const setIdx = tokens.findIndex(token => token === 'set');
    const whereIdx = tokens.findIndex(token => token.toLowerCase() === 'where');
    const conditionEqualIdx = tokens.findIndex((token, idx) => token === "=" && idx > whereIdx);
    const setEqualIdx = tokens.findIndex((token, idx) => token === "=" && idx > setIdx && idx < whereIdx);

    let setStr = '';
    for (let i = setEqualIdx + 1; i < whereIdx; i++) 
        setStr += tokens[i] + ' ';
    
    let filterStr = tokens[conditionEqualIdx+1].replace(/'/g,"");
    const filterValue = isNaN(filterStr) ? filterStr : Number(filterStr);

    return {
        type: 'update',
        collection: tokens[1],
        filter: { [tokens[conditionEqualIdx-1]]: filterValue },
        update: { $set: { [tokens[setEqualIdx-1]]: setStr.replace(/'/g,"").slice(0, -1) }},
    }
};

// ===============================================

const makeDeleteConfig = (tokens) => {
    const conditionIdx = tokens.findIndex(token => token.toLowerCase() === 'where') + 1;
    const conditionEqualIdx = tokens.findIndex(token => token === '=');

    let conditionStr = '';
    for (let i = conditionEqualIdx + 1; i < tokens.length; i++) 
        conditionStr += tokens[i] + ' ';
    
    conditionStr = conditionStr.replace(/'/g,"");
    conditionStr = conditionStr.slice(0, -1);
    
    const conditionValue = isNaN(conditionStr) ? conditionStr : Number(conditionStr);

    return {
        type: 'delete',
        collection: tokens[2],
        condition: { [tokens[conditionIdx]]: conditionValue },
    }
};

// ===============================================

module.exports = {
    makeCreateConfig,
    makeSelectConfig,
    makeDeleteConfig,
    makeInsertConfig,
    makeUpdateConfig
};
