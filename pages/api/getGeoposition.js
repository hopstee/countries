import fs from "fs";

export default async (req, res) => {
    const updateDataFile = process.cwd() + '/data/geopositions.json'
    const data = fs.readFileSync(updateDataFile)
    const dataObject = JSON.parse(data)

    if(!dataObject[req.query.code]) {
        res.status(200).json(null)
    }

    const result = [
        dataObject[req.query.code].longitude,
        dataObject[req.query.code].latitude
    ]

    res.status(200).json(result)
}