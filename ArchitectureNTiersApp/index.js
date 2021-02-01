const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./models");
const origin_port = 8000;
const listening_port = 8001;

var corsOptions = {
  origin: "http://localhost:8000".concat(origin_port.toString())
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse requests of content-type: application/json
app.use(bodyParser.urlencoded({extended: true})); // Parse requests of content-type: application/x-www-form-urlencoded

//db.sequelize.sync(); // Production Mode


db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});


app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.json({ message: "Hello World" });
});

app.listen(listening_port, () => {
  console.log(`Example app listening on port ${listening_port}!`)
});
