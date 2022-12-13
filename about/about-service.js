const ApiError = require("../exceptions/api-error");
const AboutModel = require('./about-model');
const FileService = require('../file/file-service');



class AboutService {
    async create(img, text1, text2, id, title) {
        try {
            const postAbout = await AboutModel.findOne({ title });
            if (postAbout) {
                throw ApiError.BadRequest('post already exist')
            }
            const filename = FileService.createGamesImg(img);
            const createPost = await AboutModel.create({ img: filename, userId: id, text1, text2, title });
            return createPost;
        } catch (e) {
            throw ApiError.BadRequest('Create about is error')
        }
    }

    async update(id, text1, text2, img, title) {
        try {
            const findPost = await AboutModel.findById(id)
            if (!findPost) {
                throw ApiError.BadRequest('post is not found')
            }
            FileService.removeImg(findPost.img);
            const filename = FileService.createGamesImg(img);
            findPost.title = title;
            findPost.text1 = text1;
            findPost.text2 = text2;
            findPost.img = filename;
            findPost.save();
            return findPost;
        } catch (e) {
            throw ApiError.BadRequest('Error catch')
        }
    }

    async delete(id) {
        try {
            const postAbout = await AboutModel.findById(id);
            if (!postAbout) {
                throw ApiError.BadRequest('post is not exist');
            }
            FileService.removeImg(postAbout.img);
            const deletePost = await AboutModel.findByIdAndDelete(id);
            return deletePost.title;
        } catch (e) {
            throw ApiError.BadRequest('Error catch')
        }
    }

    async getAll() {
        try {
            const getPosts = await AboutModel.find()
            return getPosts;
        } catch (e) {
            throw ApiError.BadRequest('Error catch')
        }
    }
}

module.exports = new AboutService();