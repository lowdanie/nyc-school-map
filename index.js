"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const school_zones_json_1 = __importDefault(require("./data/school_zones.json"));
const DATA = [
    [-73.90444868986823, 40.74547541500413],
    [-73.90557924487095, 40.74539135780243],
    [-73.90641883807227, 40.74563477454062],
    [-73.90726186892596, 40.74588741851006],
    [-73.90812206080143, 40.74617890436521],
    [-73.90884696219084, 40.74677523283956],
    [-73.90955355338562, 40.74739508623172],
    [-73.90991866797204, 40.74776435515552],
    [-73.91017215659966, 40.74822702646925],
    [-73.91015860695815, 40.748501967366366],
    [-73.9098996152928, 40.749087274499296],
    [-73.90971148228617, 40.74975470841491],
    [-73.90951622659293, 40.750441659492125],
    [-73.90948267280984, 40.75056086035727],
    [-73.90945182778059, 40.75065550634621],
    [-73.90944332059593, 40.750755032486495],
    [-73.90945867295906, 40.75085521690843],
    [-73.90949713362588, 40.75095068314697],
    [-73.90955576027069, 40.75103731284387],
    [-73.90984318640167, 40.75163867983673],
    [-73.90788824556181, 40.75108596947376],
    [-73.90699995697567, 40.75085256468177],
    [-73.90611042390644, 40.75062410518634],
    [-73.9052236609573, 40.75039201198089],
    [-73.90433429751235, 40.75016151216066],
    [-73.90344701067457, 40.74993183611581],
    [-73.90255966169198, 40.749700460209176],
    [-73.90165706132244, 40.749465372196134],
    [-73.90058191649672, 40.749185958686446],
    [-73.89969247816786, 40.74895556726761],
    [-73.90071317501422, 40.74668204173893],
    [-73.90109616521089, 40.74583010962969],
    [-73.90211693435853, 40.74573085030925],
    [-73.9027044199611, 40.74568386776953],
    [-73.90338892035746, 40.74559523520791],
    [-73.90444868986823, 40.74547541500413],
];
function buildMapCoords(coords) {
    return coords.map((coord) => ({ lng: coord[0], lat: coord[1] }));
}
// Initialize and add the map
let map;
function initMap() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(school_zones_json_1.default);
        const mapCoords = buildMapCoords(DATA);
        const position = mapCoords[0];
        // Request needed libraries.
        //@ts-ignore
        const { Map } = (yield google.maps.importLibrary("maps"));
        const { AdvancedMarkerElement } = (yield google.maps.importLibrary("marker"));
        // The map, centered at Uluru
        map = new Map(document.getElementById("map"), {
            zoom: 4,
            center: position,
            mapId: "DEMO_MAP_ID",
        });
        const zone = new google.maps.Polygon({
            paths: mapCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });
        zone.setMap(map);
    });
}
initMap();
