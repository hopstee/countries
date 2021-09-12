const apiResource = 'https://restcountries.eu/rest/v2'

const geopositionApiResource = (code) => {
    return `http://api.worldbank.org/v2/country/${code}?format=json`
}

export async function getAllCountries() {
    return await fetch(`${apiResource}/all`)
}

export async function getSingleCountry(code) {
    return await fetch(`${apiResource}/alpha/${code}`)
}

export async function getAllCitiesCodes() {
    const res = await getAllCountries()
    const countries = await res.json()
    const countriesCodes = []

    for(const country of countries) {
        countriesCodes.push({
            params: {
                code: country.alpha3Code.toLowerCase()
            }
        })
    }

    return countriesCodes;
}

export async function getCitiesByQuery(query) {
    const res = await fetch(`${apiResource}/name/${query}`)
    const countries = await res.json()
    const countriesResult = []

    if(!countries.status) {
        for(const country of countries) {
            countriesResult.push({
                name: country.name,
                link: `/countries/${country.alpha3Code.toLowerCase()}`
            })
        }
    }

    return countriesResult;
}

export async function getAllRegionalBlocks() {
    const res = await getAllCountries()
    const countries = await res.json()
    const regionalBlocs = []

    for(const country of countries) {
        if(country.regionalBlocs.length > 0) {
            country.regionalBlocs.map(block => {
                if(!(regionalBlocs.includes(block.name))) {
                    regionalBlocs.push(block.name)
                }
            })
        }
    }

    return regionalBlocs;
} 

export async function getAllRegions() {
    const res = await getAllCountries()
    const countries = await res.json()
    const regions = []

    for(const country of countries) {
        regions.push(country.region)
    }

    return regions;
}

export async function getGeoposition(code) {
    const res = await fetch(geopositionApiResource(code))
    const geoposition = await res.json()

    return [geoposition[1][0].longitude, geoposition[1][0].latitude]
}

export async function getGeoJSON(code) {
    const res = await fetch(`https://raw.githubusercontent.com/inmagik/world-countries/master/countries/${code}.geojson`)
    const geoJSON = await res.json()

    return geoJSON
}