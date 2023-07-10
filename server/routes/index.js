const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const baseRouter = require('./baseRouter')
const dataRouter = require('./dataRouter')

router.use('/user', userRouter)
router.use('/base', baseRouter)
router.use('/data', dataRouter)

module.exports = router