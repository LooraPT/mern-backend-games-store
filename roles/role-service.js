const RoleModel = require('./role-model')

class RoleService {
    async createRole(role) {
        try {
            const checkRole = await RoleModel.findOne({ value: role })
            if (checkRole) {
                throw ApiError.BadRequest(`this role ${role} already exists`)
            }
            const newRole = await RoleModel.create({ value: role })
            return newRole.value
        } catch (e) {
            console.log(e.message)
        }
    }

    async giveRole(userId, role) {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    async deleteRole(userId, role) {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    async getAllRoles() {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }
}

module.exports = new RoleService();