import Header from "../components/Header";
import { useLocation } from "react-router-dom";

interface VoyageResult {
  row: number;
  map_url?: string;
  travel_time_hours?: number;
  error?: string;
}

export default function CSVResults() {
  const location = useLocation();
  const csvResults = location.state?.csvResults;

  if (!csvResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
        <p>No CSV results found. Please upload a file first.</p>
      </div>
    );
  }

  const { total_rows, processed, results } = csvResults;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* ---------- SUMMARY ---------- */}
        <section className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            CSV Processing Summary
          </h2>

          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-cyan-300 text-sm">Total Rows</p>
              <p className="text-xl font-bold">{total_rows}</p>
            </div>

            <div>
              <p className="text-cyan-300 text-sm">Processed</p>
              <p className="text-xl font-bold">{processed}</p>
            </div>

            <div>
              <p className="text-cyan-300 text-sm">Successful</p>
              <p className="text-xl font-bold">
                {results.filter((r: VoyageResult) => !r.error).length}
              </p>
            </div>
          </div>
        </section>

        {/* ---------- VOYAGE CARDS ---------- */}
        {results.map((item: VoyageResult, index: number) => (
          <section
            key={index}
            className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl p-6 shadow-lg space-y-6"
          >
            <h3 className="text-xl font-semibold">
              Voyage #{item.row}
            </h3>

            {item.error ? (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
                <p className="text-red-300">
                  ❌ Error: {item.error}
                </p>
              </div>
            ) : (
              <>
                {/* -------- DETAILS -------- */}
                <div className="grid grid-cols-2 gap-6">
                  {/* <div>
                    <p className="text-cyan-300 text-sm">
                      Travel Time (hrs)
                    </p>
                    <p className="text-lg font-semibold">
                      {item.travel_time_hours}
                    </p>
                  </div>

                  <div>
                    <p className="text-cyan-300 text-sm">
                      Map Reference
                    </p>
                    <p className="text-sm truncate text-teal-300">
                      {item.map_url}
                    </p>
                  </div> */}
                </div>

                {/* -------- MAP -------- */}
                <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-cyan-500/30 shadow-md">
                  <iframe
                    src={item.map_url}
                    title={`Map-${index}`}
                    className="w-full h-full"
                    style={{ border: "none" }}
                  />
                </div>
              </>
            )}
          </section>
        ))}

      </main>
    </div>
  );
}
