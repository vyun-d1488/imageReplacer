const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 80;

const libs = process.cwd() + "/libs/";
const app = express();

app.listen(PORT, () => {
    log.info(`Server listening on port: ${PORT}`);
});
