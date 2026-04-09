import { useEffect, useState } from "react";
import RouteMap from "../components/RouteMap";

/* =======================
   Types (defined locally)
   ======================= */

interface RouteData {
  start: [number, number];
  goal: [number, number];
  travel_time_hours: number;
  route: [number, number][];
}

/* =======================
   App Component
   ======================= */

const RouteMapPage: React.FC = () => {
  const [data, setData] = useState<RouteData | null>(null);

  useEffect(() => {
    fetch("/route.json")
      .then((res) => res.json())
      .then((json: RouteData) => setData(json))
      .catch((err) => console.error("Failed to load route:", err));
  }, []);

  if (!data) {
    return (
      <div style={{ padding: "1rem", color: "white" }}>
        Loading route...
      </div>
    );
  }

  return <RouteMap data={data} />;
};

export default RouteMapPage;
