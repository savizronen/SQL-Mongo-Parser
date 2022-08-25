const express = require("express");
const bodyParser = require("body-parser");

const { dbInit, handleDbQuery, queriesObj } = require("./helpers/program");

const app = express();
const PORT = 3000;

var db;
(async () => db = await dbInit())();

// =============================================== middleware

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// =============================================== routes

// when page loads
app.get("/", async (req, res) => {
    res.render('queries', { queries: queriesObj });
});

// when input query is empty
app.get("/fetch/", async (req, res) => {
    res.send({ error: "Invalid query!" });
});

// when clicking on a query button
app.get("/fetch/:id", async (req, res) => {
    try {
        const dbResult = await handleDbQuery(req.params.id, db);
        res.send(dbResult)
    } catch (err) {
        res.send({ error: "Invalid query!" })
    }
});

// ===============================================

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
});

