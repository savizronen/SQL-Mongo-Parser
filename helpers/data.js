const CUSTOMERS = [
    {
        "cid": 1,
        "name": "paz",
        "age": 25,
        "city": "tel-aviv"
    },
    {
        "cid": 2,
        "name": "ronen",
        "age": 27,
        "city": "hod-hasharon"
    },
    {
        "cid": 3,
        "name": "jacob",
        "age": 22,
        "city": "kfar-tapuh"
    },
    {
        "cid": 4,
        "name": "nevo",
        "age": 32,
        "city": "rehovot"
    },
    {
        "cid": 5,
        "name": "doron",
        "age": 21,
        "city": "modiin"
    }
];

// ===============================================

const ORDERS = [
    {
        "oid": 154,
        "cid": 2,
        "orderDate": "22-05-2021"
    },
    {
        "oid": 581,
        "cid": 3,
        "orderDate": "13-01-2022"
    },
    {
        "oid": 657,
        "cid": 4,
        "orderDate": "12-02-2020"
    },
    {
        "oid": 945,
        "cid": 1,
        "orderDate": "25-03-2021"
    },
    {
        "oid": 436,
        "cid": 3,
        "orderDate": "18-09-2022"
    }
];

// ===============================================

const ORDER_ITEMS = [
    {
        "oid": 154,
        "items": [
            { "name": "computer"},
            { "name": "tv" },
            { "name": "xbox" }
        ],
        "quantity": 3
    },
    {
        "oid": 657,
        "items": [
            { "name": "lamp"},
            { "name": "ipad" },
        ],
        "quantity": 2
    },
    {
        "oid": 945,
        "items": [
            { "name": "chair"},
            { "name": "desk" },
            { "name": "window" },
            { "name": "door" }

        ],
        "quantity": 4
    },
    {
        "oid": 436,
        "items": [
            { "name": "camera"},
            { "name": "car" },
            { "name": "house" },
            { "name": "kitchen"},
            { "name": "bed" },
            { "name": "shower" }
        ],
        "quantity": 6
    },
    {
        "oid": 581,
        "items": [
            { "name": "pillow"},
            { "name": "clothes" },
        ],
        "quantity": 2
    },
];

// ===============================================

module.exports = {
    CUSTOMERS,
    ORDERS,
    ORDER_ITEMS
}