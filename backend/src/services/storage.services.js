const { ImageKit } = require("@imageKit/nodejs");

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(file) {
  const result = await imageKitClient.files.upload({
    file,
    fileName: "property_" + Date.now(),
  });
  return result;
}

module.exports = { uploadFile };
