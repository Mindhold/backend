const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = new express();

var corsOptions = {
    options: "http://localhost:8081"
};

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Connect mongoose to MongoDB, create Role Documents */
const db = require("./app/models/index.js");
const dbConfig = require("./app/config/db.config.js");

var uri = null;
db.mongoose
    .connect(uri || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the Database.");
    })
    .catch(err => {
        console.log("Couldn't connect to the Database");
        console.log(err);
        process.exit();
    });

require('./app/routes/closet.routes')(app);
require('./app/routes/test')(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});






