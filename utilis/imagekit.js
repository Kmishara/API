var ImageKit = require("imagekit");

exports.initImageKit = function(){
    var imagekit = new ImageKit({
        publicKey :process.env.PUBICKEY_IMAGELIT,
        privateKey :process.env.PRIVATEKEY_IMAGELIT,
        urlEndpoint :process.env.ENDPOINTURL_IMAGELIT,
        });
    return imagekit;
};
