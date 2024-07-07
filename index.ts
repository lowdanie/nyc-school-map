import zoneData from "./data/school_zones_with_staff_pick.json";
import schoolData from "./data/schools.json";

const CENTER = { lat: 40.74547541500413, lng: -73.90444868986823 };

interface School {
  dbn: string;
  name: string;
  lat: number;
  lng: number;
  is_unzoned: boolean;
  is_staff_pick: boolean;
}

// Initialize and add the map
let map;
async function initMap(): Promise<void> {
  console.log(zoneData);
  console.log(schoolData);
  // Request needed libraries.
  //@ts-ignore
  const { Map, InfoWindow } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  const { AdvancedMarkerElement, PinElement } =
    (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

  map = new Map(document.getElementById("map") as HTMLElement, {
    zoom: 11,
    center: CENTER,
    mapId: "DEMO_MAP_ID",
  });

  // Add school zones.
  map.data.addGeoJson(zoneData);

  map.data.setStyle((feature) => {
    let color = "gray";

    if (feature.getProperty("is_staff_pick")) {
      color = "blue";
    }
    return /** @type {!google.maps.Data.StyleOptions} */ {
      fillColor: color,
      strokeColor: "black",
      strokeWeight: 2,
    };
  });

  // Add markers.
  const infoWindow = new InfoWindow();

  const pinBackgroundColor = {
    default: "gray",
    zonedStaffPick: "blue",
    unzonedStaffPick: "green",
  };

  function getSchoolPinBackgroundColor(school: School): string {
    if (school.is_unzoned && school.is_staff_pick) {
      return pinBackgroundColor.unzonedStaffPick;
    } else if (!school.is_unzoned && school.is_staff_pick) {
      return pinBackgroundColor.zonedStaffPick;
    } else {
      return pinBackgroundColor.default;
    }
  }

  function getSchoolInfoContent(school: School): string {
    let properties: string[] = [];
    if (school.is_staff_pick) {
      properties.push("Staff Pick");
    }

    if (school.is_unzoned) {
      properties.push("Unzoned");
    }

    return `
    <div>
    <a href="http://insideschools.org/school/${school.dbn}">${school.dbn}</a>
    </div>
    <div>
    ${properties.join(", ")}
    </div>
    `;
  }
  let schoolMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
  for (const school of schoolData.schools) {
    if (!school.is_staff_pick) {
      continue;
    }
    const pinBackground = new PinElement({
      scale: 1,
      background: getSchoolPinBackgroundColor(school),
    });

    const marker = new AdvancedMarkerElement({
      map: null,
      position: { lat: school.lat, lng: school.lng },
      title: school.name,
      content: pinBackground.element,
      gmpClickable: true,
    });
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setHeaderContent(school.name);
      infoWindow.setContent(getSchoolInfoContent(school));
      infoWindow.open(marker.map, marker);
    });
    schoolMarkers.push(marker);
  }

  map.addListener("zoom_changed", () => {
    const zoom = map.getZoom();
    if (zoom) {
      // Only show each marker above a certain zoom level.
      for (const marker of schoolMarkers) {
        marker.map = zoom > 13 ? map : null;
      }
    }
  });
}

initMap();
