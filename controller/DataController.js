const DataController = {}
const DataService = require('../services/DataServices')
const {validateCVS} = require('../validation/ValidationFilesData')

DataController.getAllData = async (req, res) => {
    console.log('getData')
    try {
        let getAllDataFiles = await DataService.getAllData()
        switch(getAllDataFiles.code){
            case 'success':
                // console.log(getAllDataFiles.files)
                let filesNameList = getAllDataFiles.files
                let obtainData = filesNameList.map((fileName) => {
                    let oneFile = DataService.getOneData(fileName)
                    return oneFile
                })
                Promise.all(obtainData)
                    .then(response => {
                        //Filter arrays null o empty
                        let filterArray = response.map(array => {
                            if(array.length > 1){
                                return array
                            }
                        })
                        //Join data of the all arrays
                        let newArrayData = []
                        filterArray.forEach(array => {
                            if(array){
                                array.forEach(data => {
                                    let dataArray = data
                                    // console.log(dataArray)
                                    newArrayData.push(dataArray)
                                })
                            }
                        })

                        let dataFilter = newArrayData.filter(item => validateCVS(item) === true)
                        res.status(200).json({code:'success', files: dataFilter})
                    })
            break;
            case 'Error500':
                res.status(500).json({code: getAllDataFiles.code, msg: getAllDataFiles.msg})
                break;
            default:
                res.status(500).json({code: '500', msg: 'Service is wrong'})
        }
        
    } catch (error) {
        console.log(error)
    }
}

DataController.getOneDataFile = async (req, res) => {
    let fileName = req.query.fileName
    console.log(fileName)
    if(fileName){
        try {
            let getAllDataFiles = await DataService.getAllData()
            switch(getAllDataFiles.code){
                case 'success':
                    // console.log(getAllDataFiles.files)
                    let filesNameList = getAllDataFiles.files
                    let obtainData = filesNameList.map((fileName) => {
                        let oneFile = DataService.getOneData(fileName)
                        return oneFile
                    })
                    Promise.all(obtainData)
                        .then(response => {
                            //Filter arrays null o empty
                            let filterArray = response.map(array => {
                                if(array.length > 1){
                                    return array
                                }
                            })
                            //Join data of the all arrays
                            let newArrayData = []
                            filterArray.forEach(array => {
                                if(array){
                                    array.forEach(data => {
                                        let dataArray = data
                                        // console.log(dataArray)
                                        newArrayData.push(dataArray)
                                    })
                                }
                            })
    
                            let dataFilter = newArrayData.filter(item => validateCVS(item) === true)
                            let searchByQuery = dataFilter.filter(item => fileName === item.file)
                            res.status(200).json({code:'success', file: searchByQuery})
                        })
                break;
                case 'Error500':
                    res.status(500).json({code: getAllDataFiles.code, msg: getAllDataFiles.msg})
                    break;
                default:
                    res.status(500).json({code: '500', msg: 'Service is wrong'})
            }
            
        } catch (error) {
            console.log(error)
        }
    }else{
        res.status(500).json({code:'Error500', msg: 'Do not exist query params'})
    }
}

DataController.getAllDataList = async (req, res) => {
    try {
        let getAllDataFiles = await DataService.getAllData()
        switch(getAllDataFiles.code){
            case 'success':
                // console.log(getAllDataFiles.files)
                res.status(200).json({code: getAllDataFiles.code,  files: getAllDataFiles.files})
            break;
            case 'Error500':
                res.status(500).json({code: getAllDataFiles.code, msg: getAllDataFiles.msg})
                break;
            default:
                res.status(500).json({code: '500', msg: 'Service is wrong'})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = DataController