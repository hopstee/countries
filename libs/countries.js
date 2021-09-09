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