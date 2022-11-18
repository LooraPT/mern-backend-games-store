const roleService = require('./role-service')


class RolesController {
    async createRole(req, res, next) {
        try {
            const { role } = req.body;
            const newRole = await roleService.createRole(role);
            return res.json(newRole)
        } catch (e) {
            next(e)
        }
    }

    async giveRole(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async deleteRole(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async getAllRoles(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RolesController();