import fs from "fs";

export default (req, res) => {
    const updateDataFile = process.cwd() + '/data/countries.json'
    const data = fs.readFileSync(updateDataFile)
    res.status(200).json(data)
}