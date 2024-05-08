var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
res.send('In articles')})

module.exports = router

