const fs = require("fs");
const path = require("path");

function deletePetImages(petImages) {
  petImages.forEach((image) => {
    let imagePath = path.join('public', 'img', 'pets', image)

      fs.unlinkSync(imagePath)
  });
}

module.exports = deletePetImages;
