const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();

app.use(bodyParser.json());

db.pool.query(
  `CREATE TABLE lists 
  id INTEGER AUTO_INCREMENT
  value TEXt,
  PRIMARY KEY (id)
`,
  (err, results, fields) => {
    console("results", results);
  }
);

app.get("/api/values", function (req, res) {
  db.pool.query("SELECT * FROM listsl", (err, results, fields) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

app.post("/api/value", function (req, res) {
  db.pool.query(
    `INSERT INTO lists (vaule) VALUES("${req.body.value}")`,
    (err, results, fields) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log("5000번에서 시작---!!");
});
