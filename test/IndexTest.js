const assert = require('chai').assert
const DataController = require('../controller/DataController')

//results

const FileDataInfo = DataController.getAllData

describe('DataController Test', () => {
    it('Recive data successfully', () => {
        assert.isFunction(FileDataInfo)
    })
})