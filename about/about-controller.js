const AboutService = require('./about-service')


class AboutController {
    async createAbout(req, res, next) {
        const { text1, text2, title } = req.body;
        const { img } = req.files;
        const { id } = req.user;
        const create = await AboutService.create(img, text1, text2, id, title);
        return res.json(create);
    }

    async updateAbout(req, res, next) {
        const { id } = req.params;
        const { text1, text2, title } = req.body;
        const { img } = req.files;
        const update = await AboutService.update(id, text1, text2, img, title);
        return res.json(update);
    }

    async deleteAbout(req, res, next) {
        const { id } = req.params;
        const deletePost = await AboutService.delete(id);
        return res.json(deletePost);
    }

    async getAllAbout(req, res, next) {
        const allPosts = await AboutService.getAll();
        return res.json(allPosts);
    }

}

module.exports = new AboutController();