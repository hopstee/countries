export async function getGeoJSON(code) {
    const res = await fetch(`https://raw.githubusercontent.com/inmagik/world-countries/master/countries/${code}.geojson`)
    const geoJSON = await res.json()

    return geoJSON
}