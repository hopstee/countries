import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getGeoJSON } from '../libs/countries'
import mapStyles from '../styles/Map.module.css'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import * as MCG from 'react-leaflet-markercluster'

function Map({ lon, lat, country }) {
    const coordinates = [lat, lon]
    const [geoJSON, setGeoJSON] = useState(null);
    const style = (() => {
        return ({
            fillColor: "red",
            weight: 2,
            opacity: 1,
            color: "red",
            fillOpacity: 0.1
        });
    });

    const MarkerClusterGroup = MCG.default;
    const markerIcon = L.icon({
        iconUrl: '/icons/marker.webp',
        iconRetinaUrl: '/icons/marker.webp',
        iconSize: [46,46],
        iconAnchor: [23, 46],
        popupAnchor: [0, -47],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    useEffect(async () => {
        setGeoJSON(await getGeoJSON(country.alpha3Code))
    }, [])

    return (
        <MapContainer center={coordinates} zoom={6} scrollWheelZoom={false} className={mapStyles.map}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
                <Marker 
                    position={coordinates}
                    icon={markerIcon}
                >
                    <Popup>
                        {country.name}
                        <br /> 
                        Capital: {country.capital}
                        <br /> 
                        Population: {
                            !country.population ? 
                            (
                                <span className={styles.code}>
                                    --//--
                                </span>
                            ) : (
                                (country.population).toLocaleString()
                            )
                        }
                        <br /> 
                        Area: {
                            !country.area ? 
                            (
                                <span className={styles.code}>
                                    --//--
                                </span>
                            ) : (
                                <span>{(country.area).toLocaleString()} &#x33A2;</span>
                            )
                        }
                    </Popup>
                </Marker>
            </MarkerClusterGroup>
            <Marker 
                position={coordinates}
                icon={markerIcon}
            >
                <Popup>
                    {country.name} <br /> Capital: {country.capital}
                </Popup>
            </Marker>
            {geoJSON && <GeoJSON data={geoJSON} style={style} />}
        </MapContainer>
    )
}

export default Map
