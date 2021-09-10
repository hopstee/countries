export async function getAllCitiesCodes() {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
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
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    const countries = await res.json()
    const countriesResult = []

    if(countries.status !== null) {
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
    const res = await fetch('https://restcountries.eu/rest/v2/all')
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
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json()
    const regions = []

    for(const country of countries) {
        regions.push(country.region)
    }

    return regions;
} 