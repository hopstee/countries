import fs from "fs";

export default async (req, res) => {
    console.log(req.query.code)
    const updateDataFile = process.cwd() + '/data/countries.json'
    const data = fs.readFileSync(updateDataFile)
    const dataObject = JSON.parse(data)

    res.status(200).json(dataObject[req.query.code])
}