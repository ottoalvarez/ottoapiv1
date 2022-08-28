import fs from 'fs'
import xlsx from 'convert-excel-to-json'

const xlsx2json = (req, res) => {
    const columnToKey = (req.body.typeStructure ? getStructureJson(req.body.typeStructure) : undefined)
    const result = xlsx({
        sourceFile: req.files.fileToJson.tempFilePath,
        sheets: ['Locales'],
        columnToKey
    })

    fs.unlinkSync(req.files.fileToJson.tempFilePath)
    res.json(result)
}

function getStructureJson(typeStructure) {
    if (typeStructure == 'locales') return getStructLocales();
    else return undefined
}

function getStructLocales() {
    return {
        A: 'cli_id',
        C: 'clo_id',
        D: 'clo_nom_codigo',
        E: 'clo_direccion',
        H: 'com_id'
    }
}

export {
    xlsx2json
}