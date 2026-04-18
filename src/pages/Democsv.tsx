import Header from "../components/Header";

export default function CSVResults() {
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
              <p className="text-xl font-bold">3</p>
            </div>

            <div>
              <p className="text-cyan-300 text-sm">Processed</p>
              <p className="text-xl font-bold">3</p>
            </div>

            <div>
              <p className="text-cyan-300 text-sm">Successful</p>
              <p className="text-xl font-bold">2</p>
            </div>
          </div>
        </section>

        {/* ---------- VOYAGE 1 ---------- */}
        <section className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl p-6 shadow-lg space-y-6">
          <h3 className="text-xl font-semibold">Voyage #1</h3>

          {/* <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-cyan-300 text-sm">Route</p>
              <p className="text-lg font-semibold">
                Chennai → Singapore
              </p>
            </div>

            <div>
              <p className="text-cyan-300 text-sm">Travel Time</p>
              <p className="text-lg font-semibold">96 hrs</p>
            </div>
          </div> */}

          {/* MAP */}
          <div className="w-full h-[60vh] rounded-xl overflow-hidden border border-cyan-500/30">
            <iframe
              src="public/test.html"
              className="w-full h-full"
              style={{ border: "none" }}
              title="Voyage1"
            />
          </div>
        </section>

        {/* ---------- VOYAGE 2 ---------- */}
        <section className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl p-6 shadow-lg space-y-6">
          <h3 className="text-xl font-semibold">Voyage #2</h3>

          {/* <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-cyan-300 text-sm">Route</p>
              <p className="text-lg font-semibold">
                Mumbai → New York (via Suez Canal)
              </p>
            </div>

            <div>
              <p className="text-cyan-300 text-sm">Travel Time</p>
              <p className="text-lg font-semibold">420 hrs</p>
            </div>
          </div> */}

          {/* MAP */}
          <div className="w-full h-[60vh] rounded-xl overflow-hidden border border-cyan-500/30">
            <iframe
              src="public/test2.html"
              className="w-full h-full"
              style={{ border: "none" }}
              title="Voyage2"
            />
          </div>
        </section>

        {/* ---------- VOYAGE 3 (ERROR) ---------- */}
        <section className="bg-slate-800/40 border border-red-500/30 rounded-2xl p-6 shadow-lg space-y-6">
          <h3 className="text-xl font-semibold">Voyage #3</h3>

          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <p className="text-red-300">
              ❌ Error: Invalid source coordinates provided
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}