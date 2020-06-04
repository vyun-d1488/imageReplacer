const jimp = require("jimp");
const cloudinary = require("cloudinary");
const path = require("path");
const log = require("./log")(module);
const Datauri = require("datauri");
const dUri = new Datauri();
cloudinary.config({
    cloud_name: "picturesapplecustard",
    api_key: "416216855519675",
    api_secret: "TkE7-xyZCqx3HDEbhPI7uK5MzvE",
});
async function createImage(image, res) {
    let secondImage;
    jimp.read(image, function (error, image) {
        if (error) {
            console.log(error);
        }
        secondImage = image.resize(200, 300);
    });
    jimp.read("https://res.cloudinary.com/picturesapplecustard/image/upload/v1586539169/layer_ertmus.png", function (error, image) {
        if (error) {
            log.info(error);
        } else {
            console.log(res);
            image
                .composite(secondImage, 210, 100, {
                    mode: jimp.BLEND_DESTINATION_OVER,
                })
                .getBase64(jimp.AUTO, (error, uri) => {
                    cloudinary.v2.uploader.upload(uri, { public_id: "cum_script/" + res });
                });
        }
    });
}

module.exports = createImage;
