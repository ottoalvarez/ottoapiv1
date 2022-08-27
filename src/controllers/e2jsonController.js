import fs from 'fs'
import xlsx from 'convert-excel-to-json'

const xlsx2json = (req, res) => {
    const result = xlsx({
        sourceFile: req.files.file.tempFilePath,
        sheets: ['Locales'],
        columnToKey: {
            A: 'cli_id',
            C: 'clo_id',
            D: 'clo_nom_codigo',
            E: 'clo_direccion',
            H: 'com_id'
        }
    })

    fs.unlinkSync(req.files.file.tempFilePath)
    res.json(result)
}

export {
    xlsx2json
}