const uuid = require('uuid')
const path = require('path')
const fs = require('fs');

class FileService {
    createGamesImg(img) {
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        return fileName;
    }

    removeImg(fileName) {
        console.log(fileName)
        const removeFileImg = fs.unlink(path.resolve(__dirname, '..', 'static', fileName), (err => {
            if (err) {
                console.log(err);
            }
        }))
    }
}

module.exports = new FileService();