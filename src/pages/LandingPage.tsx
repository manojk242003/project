import React from "react";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-cyan-200 to-blue-100 text-slate-800">
      <Header />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Safar AI – Intelligent Ship Route Optimization
        </h1>

        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Safar AI is an intelligent maritime navigation system designed to compute
          safe and efficient ship routes using geospatial analysis, bathymetry
          constraints, and optimized path planning algorithms.
          The system ensures realistic ocean navigation by avoiding landmasses
          and shallow waters while generating smooth, practical voyage routes.
        </p>

        <div className="mt-10">
          <a
            href="/home"
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition"
          >
            Start Route Planning
          </a>
        </div>
      </section>

      {/* IMAGE SHOWCASE */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-cyan-200">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Ocean Route"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                Ocean Navigation
              </h3>
              <p className="text-sm text-slate-600">
                Intelligent routing across international waters.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-cyan-200">
            <img
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
              alt="Cargo Ship"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                Maritime Safety
              </h3>
              <p className="text-sm text-slate-600">
                Avoid land and shallow waters using bathymetry data.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-cyan-200">
            <img
              src="https://images.unsplash.com/photo-1494415859740-21e878dd929d"
              alt="Global Shipping"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                Optimized Routes
              </h3>
              <p className="text-sm text-slate-600">
                Efficient pathfinding powered by A* algorithm.
              </p>
            </div>
          </div>

        </div>
      </section>

        {/* TEAM SECTION */}
<section className="max-w-6xl mx-auto px-6 pb-24">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold">
      Project Team
    </h2>
    <p className="text-slate-600 mt-2">
      The minds behind Safar AI
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-10">

    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-cyan-200 p-8 text-center hover:shadow-lg transition">
      {/* <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
        YN
      </div> */}
      <h3 className="font-semibold text-lg mb-1">Tejas Pratap</h3>
      <p className="text-sm text-slate-600">
        221IT072
      </p>
    </div>

    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-cyan-200 p-8 text-center hover:shadow-lg transition">
      {/* <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
        T1
      </div> */}
      <h3 className="font-semibold text-lg mb-1">P Meher Shireen</h3>
      <p className="text-sm text-slate-600">
        221IT049
      </p>
    </div>

    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-cyan-200 p-8 text-center hover:shadow-lg transition">
      {/* <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
        T2
      </div> */}
      <h3 className="font-semibold text-lg mb-1">K Jaggarao</h3>
      <p className="text-sm text-slate-600">
        221IT037
      </p>
    </div>

  </div>
</section>


      {/* FOOTER NOTE */}
      <footer className="text-center py-6 text-sm text-slate-500">
        © 2026 Safar AI – Maritime Route Optimization System
      </footer>
    </div>
  );
};

export default LandingPage;
