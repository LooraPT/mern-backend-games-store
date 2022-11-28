const ApiError = require('../exceptions/api-error')
const UserModel = require('../users/user-model')
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

    async giveRole(email, role) {
        try {
            const candidate = await UserModel.findOne({ email })
            const roles = await RoleModel.findOne({ value: role })
            if (!candidate || !role) {
                throw ApiError.BadRequest('user is not found')
            }
            candidate.roles = [...candidate.roles, role]
            candidate.save()
            return candidate

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
            const roles = await RoleModel.find()
            return roles
        } catch (e) {
            console.log(e.message)
        }
    }
}

module.exports = new RoleService();