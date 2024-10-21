import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import {validatIp, addTileLayer, getAdress,addOffset} from './helpers';
import L from 'leaflet';
import icon from '../images/icon-location.svg'


const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');



btn.addEventListener('click',getData);
ipInput.addEventListener('keydown',handelKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    //iconAnchor: [22, 94],
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center:[51.505, -0.09],
    zoom: 13,
    zoomControl: false,
})

addTileLayer(map);

L.marker([51.5, -0.09], {icon:markerIcon}).addTo(map);

function getData() {
    if(validatIp(ipInput.value)) {
        getAdress(ipInput.value)
            .then(setInfo);
    }
}
function handelKey(e) {
    if(e.key === 'Enter') {
        getData();
    }
}
function setInfo(mapData) {
    console.log(mapData)
    const {country, timezone, connection, latitude, longitude,} = mapData;

    ipInfo.innerText = mapData.ip_address;
    locationInfo.innerText = `${country} ${timezone.name}`;
    timezoneInfo.innerText = timezone.gmt_offset;
    ispInfo.innerText = connection.isp_name;


    map.setView([latitude, longitude], 13);
    L.marker([latitude, longitude], {icon:markerIcon}).addTo(map);
    if(matchMedia("(max-width: 1023px)").matches) {
        addOffset(map);
    }



}
document.addEventListener('DOMContentLoaded', ()=> {
    getAdress('102.22.22.1').then(setInfo)
});
