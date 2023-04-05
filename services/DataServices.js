const DataService = {}
// const path = require('path');
// const fs = require('fs');
const fetch = require('node-fetch')
const csv = require('csv-parser')

const GET_ALL_FILE_DATA = 'https://echo-serv.tbxnet.com/v1/secret/files'

DataService.getAllData = async () => {
    // console.log('service data works!')
    const getAllFilesData = await fetch(GET_ALL_FILE_DATA, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer aSuperSecretKey' }
    });
    if (!getAllFilesData.ok) {
        let response = {
            code: 'Error500',
            msg: 'Something went wrong with get all data files'
        }

        return response
    }
    const data = await getAllFilesData.json();
    let response = {
        code: 'success',
        files: data.files
    }
    return response
}

DataService.getOneData = async (fileName) => {
    const getOneDataFile = await fetch(`https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer aSuperSecretKey' }
    })
        .then((res) => {
            // Convertir la respuesta en un stream de lectura
            const stream = res.body;

            const results = [];
            return new Promise((resolve, reject) => {
                stream
                    .pipe(csv())
                    .on('data', (data) => {
                        results.push(data);
                    })
                    .on('end', () => {
                        resolve(results);
                    })
                    .on('error', (error) => {
                        reject(error);
                    });
            });
        })
    let data = await getOneDataFile
    return data
    // console.log(getOneDataFile)
}

module.exports = DataService