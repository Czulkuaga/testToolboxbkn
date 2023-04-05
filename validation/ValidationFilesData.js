const ValidationFilesData = {}

ValidationFilesData.validateCVS = (row) => {
    //RegExpre
    if (row.file && row.text && row.number && row.hex && row._4 !== '' && row._5 !== '') {
        let docNameFormat = /^[A-Za-z0-9]+.[a-zA-Z]{3}/g
        let validText = /^[a-zA-Z]+$/g
        let validNumber = /^\d+$/g
        let hexString = /^[0-9a-fA-F]{32}$/g

        let validateFilename = row.file.match(docNameFormat)
        let validateText = row.text.match(validText)
        let validateNumber = row.number.match(validNumber)
        let validateHex = row.hex.match(hexString)

        if (validateFilename === null || validateText === null || validateNumber === null || validateHex === null) {
            return false
        } else {
            return true
        }
    }else{
        return false
    }
}

module.exports = ValidationFilesData