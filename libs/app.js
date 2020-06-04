const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/../public"));
app.set("view engine", "ejs");

const jimp = require("./jimp");

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", upload.single("image"), async (req, res) => {
    jimp(req.file.buffer, req.file.originalname);
    res.redirect("/" + (await req.file.originalname));
});

app.get("/:name", (req, res) => {
    console.log(req.params);
    // if (req.params.name.substr(req.params.name.length - 4) === ".png") {
    //     res.redirect("https://res.cloudinary.com/picturesapplecustard/image/upload/v1586544159/cum_script/Ao4C8zzgSoM.png.png" + req.params.name);
    // }
    res.redirect("https://res.cloudinary.com/picturesapplecustard/image/upload/v1586543506/cum_script/" + req.params.name + ".png");
});

module.exports = app;
