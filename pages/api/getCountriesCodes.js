import fs from "fs";

export default async (req, res) => {
    const updateDataFile = process.cwd() + '/data/countries_codes.json'
    const data = JSON.parse(fs.readFileSync(updateDataFile))

    res.status(200).json(data)
}