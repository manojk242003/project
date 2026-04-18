import Header from "../components/Header";
import { useLocation } from "react-router-dom";

export default function Map() {
  const location = useLocation();
  const routeData = location.state?.routeData;
  const userInput = location.state?.userInput;

  if (!routeData?.map_url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
        <p>No route data found. Please generate a route first.</p>
      </div>
    );
  }

  const {
    map_url,
    travel_time_hours,
    num_waypoints,
    // max_storm_risk,
    // avg_storm_risk,
  } = routeData;

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      <Header />

      <main className="px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[85vh]">

          {/* ---------------- MAP SECTION ---------------- */}
          <div className="col-span-8 rounded-xl overflow-hidden border border-blue-800 shadow-lg">
            <iframe
              src={map_url}
              title="Voyage Route Map"
              className="w-full h-full"
              style={{ border: "none" }}
            />
          </div>

          {/* ---------------- SIDE PANEL ---------------- */}
          <div className="col-span-4 bg-blue-900/40 border border-blue-800 rounded-xl p-6 shadow-lg overflow-y-auto">

            <h2 className="text-xl font-semibold mb-6">
              Voyage Details
            </h2>

            {/* Vessel Info */}
            <div className="space-y-3 text-sm">
              <p><span className="text-blue-300">Average Speed:</span> {userInput?.averageSpeed} knots</p>
              <p><span className="text-blue-300">Start:</span> {userInput?.startPort || `${userInput?.startLatitude}, ${userInput?.startLongitude}`}</p>
              <p><span className="text-blue-300">Destination:</span> {userInput?.destPort || `${userInput?.destLatitude}, ${userInput?.destLongitude}`}</p>
            </div>

            <hr className="my-6 border-blue-800" />

            {/* Computed Stats */}
            <h3 className="text-lg font-semibold mb-4">
              Route Statistics
            </h3>

            <div className="space-y-4 text-sm">

              {/* <div className="bg-blue-950/60 p-4 rounded-lg">
                <p className="text-blue-300">Estimated Travel Time</p>
                <p className="text-xl font-bold">{travel_time_hours} hrs</p>
              </div> */}

              <div className="bg-blue-950/60 p-4 rounded-lg">
                <p className="text-blue-300">Waypoints</p>
                <p className="text-xl font-bold">{num_waypoints}</p>
              </div>

              {/* <div className="bg-blue-950/60 p-4 rounded-lg">
                <p className="text-blue-300">Max Storm Risk</p>
                <p className="text-xl font-bold">{max_storm_risk}</p>
              </div>

              <div className="bg-blue-950/60 p-4 rounded-lg">
                <p className="text-blue-300">Average Storm Risk</p>
                <p className="text-xl font-bold">{avg_storm_risk}</p>
              </div> */}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
