const Jimp = require("jimp");

async function adjustingAvatar(path) {
   console.log("1.2 - adjustingAvatar"); 
  if (path === undefined) return;
  const image = await Jimp.read(path);
  return await image.resize(250, 250).writeAsync(path);
}

module.exports = {
  adjustingAvatar,
};