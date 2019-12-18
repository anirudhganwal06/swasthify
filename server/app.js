const express = require("express");

const keys = require("./config/devKeys");

const app = express();

const port = keys.PORT;
app.listen(port, () => {
    console.log(`Server running @${port}`);
});