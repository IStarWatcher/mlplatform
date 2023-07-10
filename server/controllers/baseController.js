const { Base } = require('../models/models')
const ApiError = require('../error/ApiError')

class BaseController {
    async create(req, res, next) {
        try {
            const { id_base } = req.query
            const base = await Base.create({ id_base })
            return res.json(base)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }     
    }

    async getOne(req, res) {
        const {id} = req.params
        const base = await Base.findOne({
            where: {id}
            // include: [{model: Base}]
        })
        return res.json(base)
    }
}

module.exports = new BaseController()