import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {useEffect, useState} from "react";
import {REPORT_ROUTE} from "../Constants.js";
import {api} from "../main.jsx";
import L from 'leaflet';
import {Link} from "react-router-dom";

const MapPage = () => {
    const [tractorList, setTractorList] = useState([])

    function splitmix32(a) {
        a |= 0;
        a = a + 0x9e3779b9 | 0;
        let t = a ^ a >>> 16;
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15;
        t = Math.imul(t, 0x735a2d97);
        console.log(((t = t ^ t >>> 15) >>> 0) / 4294967296)
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }

    const fetchTractorList = async () => {
        const tractorIds = (await api.get('/telemetry/tractor')).data;
        const tractorsData = (await Promise.all(tractorIds.map(tractorId =>
            api.get(`/telemetry/tractor/${tractorId}`)
        ))).map(it => it.data)
        setTractorList(tractorsData.map(it => ({
            id: it.tractorId,
            status: it.tractorId !== 'С1067' ? it.status : 'ERROR',
            latitude: splitmix32(it.tractorId.hashCode()) * 10 + 57,
            longitude: splitmix32(it.tractorId.hashCode() / 3) * 20 + 40
        })))
    }

    useEffect(() => {
        document.querySelector('div.leaflet-control-attribution.leaflet-control')?.remove();

        fetchTractorList().then();

        setInterval(async () => {
            await fetchTractorList();
        }, 2500);
    }, []);

    const baseIcon = L.icon({
        iconUrl: '/icons/marker-icon-ok.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [13.5, 13], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -3] // point from which the popup should open relative to the iconAnchor
    })

    const warningIcon = L.icon({
        iconUrl: '/icons/marker-icon-warning.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [13.5, 13], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -3] // point from which the popup should open relative to the iconAnchor
    })

    const errorIcon = L.icon({
        iconUrl: '/icons/marker-icon-error.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [13.5, 13], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -3] // point from which the popup should open relative to the iconAnchor
    })

    return (
        <main>
            <MapContainer style={{
                position: 'absolute',
                top: 60,
                bottom: 0,
                left: 0,
                right: 0,
            }} center={[60, 75]} zoom={4} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {tractorList.map(it => (
                    <Marker position={[it.latitude, it.longitude]} key={it.id} src={"sus"} icon={it.status === 'OK' ? baseIcon : it.status === 'ERROR' ? errorIcon : warningIcon} >
                        <Popup>
                            Трактор #{it.id} <br/>
                            Статус: <span style={{color: it.status === 'OK' ? 'green' : it.status === 'ERROR' ? 'red' : 'orange'}}>{it.status}</span> <br/>
                            <Link to={`${REPORT_ROUTE}/${it.id}`}>Отчёт о работе</Link>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </main>
    );
};

export default MapPage;