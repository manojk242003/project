import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Re-declare type locally (or move to props interface) */
interface RouteData {
  start: [number, number];
  goal: [number, number];
  travel_time_hours: number;
  route: [number, number][];
}

interface Props {
  data: RouteData;
}

const startIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
  iconSize: [32, 32],
});

const endIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
});

const RouteMap: React.FC<Props> = ({ data }) => {
  const routePositions = data.route.map(
    ([lat, lon]) => [lat, lon] as [number, number]
  );

  return (
    <MapContainer
      center={routePositions[0]}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Polyline positions={routePositions} pathOptions={{ color: "blue", weight: 4 }} />

      <Marker position={data.start} icon={startIcon}>
        <Popup>Start</Popup>
      </Marker>

      <Marker position={data.goal} icon={endIcon}>
        <Popup>Destination</Popup>
      </Marker>
    </MapContainer>
  );
};

export default RouteMap;
