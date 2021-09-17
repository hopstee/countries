import fs from "fs";

export default async (req, res) => {
    console.log(req.query.name)
    const updateDataFile = process.cwd() + '/data/countries.json'
    const data = fs.readFileSync(updateDataFile)
    const dataObject = JSON.parse(data)
    const countriesResult = []

    for(const code in dataObject) {
        if(dataObject[code].name.toLowerCase().includes(req.query.name.toLowerCase())) {
            const country = dataObject[code]
            countriesResult.push({
                name: country.name,
                link: `/countries/${country.alpha3Code}`
            })
        }
    }

    res.status(200).json(countriesResult)
}