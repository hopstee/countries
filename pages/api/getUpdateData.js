import fs from "fs";

export default (req, res) => {
    const updateDataFile = process.cwd() + '/data/update_data.json'
    const data = fs.readFileSync(updateDataFile)
    res.status(200).json(data)
}