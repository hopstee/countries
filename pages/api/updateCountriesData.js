import fs from "fs";

const apiResource = 'https://restcountries.eu/rest/v2'
const geopositionApiResource = (code) => {
    return `http://api.worldbank.org/v2/country/${code}?format=json`
}
const geopositionBorders = (code) => {
    return `https://raw.githubusercontent.com/inmagik/world-countries/master/countries/${code}.geojson`
}

const countriesFile = process.cwd() + '/data/countries.json'
const countriesCodesFile = process.cwd() + '/data/countries_codes.json'
const countriesGeopositionFile = process.cwd() + '/data/geopositions.json'
const updateDataFile = process.cwd() + '/data/update_data.json'

export default async (req, res) => {
    const countriesRes = await fetch(`${apiResource}/all`)
    const countries = await countriesRes.json()
    const countriesObject = {}
    const countriesCodes = {}
    const countriesGeoposition = {}

    for(const country of countries) {
        countriesObject[country.alpha3Code] = country

        countriesCodes[country.alpha3Code] = {
            code: country.alpha3Code
        }

        const geopositionData = await fetch(geopositionApiResource(country.alpha2Code.toLowerCase()))
        const geoposition = await geopositionData.json()
        let longitude = country.latlng[1] ? country.latlng[1] : 0
        let latitude = country.latlng[0] ? country.latlng[0] : 0

        if(!geoposition[0].message) {
            longitude = geoposition[1][0].longitude
            latitude = geoposition[1][0].latitude
        }

        countriesGeoposition[country.alpha3Code] = {
            longitude: longitude,
            latitude: latitude
        }
    }
    
    fs.writeFileSync(countriesFile, JSON.stringify(countriesObject), 'utf-8')
    fs.writeFileSync(countriesCodesFile, JSON.stringify(countriesCodes), 'utf-8')
    fs.writeFile(countriesGeopositionFile, JSON.stringify(countriesGeoposition), 'utf-8')
    const date = new Date(Date.now())
    const lastUpdate = `${date.getDay()}-${date.getMonth()}-${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    fs.writeFileSync(updateDataFile, JSON.stringify({
        last_update: lastUpdate
    }), 'utf-8')
    
    res.status(200).json({ "ok": true, "last_update": lastUpdate })
}