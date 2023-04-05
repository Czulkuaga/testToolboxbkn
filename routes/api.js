const {Router} = require('express');
const router = Router();
const DataController = require('../controller/DataController')
const verifyToken = require('../middlewares/verifyToken')

//Public Route
router.get('/', (req, res) => {
    res.json({message: 'Bienvenidos a Test Toolbox OTT'})
})

//Get Data Files Routes
router.get('/files/data', DataController.getAllData)
router.get('/files/list', DataController.getAllDataList)
router.get('/files/find-one/data', DataController.getOneDataFile)

module.exports = router;