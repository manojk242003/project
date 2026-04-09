import React, { useState } from 'react';
import { Route } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import ShipDetailsSection from '../components/ShipDetailsSection';
import VoyageDetailsSection from '../components/VoyageDetailsSection';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  /* ---------------- INPUT MODE ---------------- */
  const [inputMode, setInputMode] = useState<'manual' | 'csv'>('manual');
  const [csvFile, setCsvFile] = useState<File | null>(null);

  /* ---------------- SHIP DETAILS ---------------- */
  const [averageSpeed, setAverageSpeed] = useState('');

  /* ---------------- VOYAGE DETAILS ---------------- */
  const [startInputType, setStartInputType] = useState<'coordinates' | 'port'>('coordinates');
  const [startLatitude, setStartLatitude] = useState('');
  const [startLongitude, setStartLongitude] = useState('');
  const [startPort, setStartPort] = useState('');

  const [destInputType, setDestInputType] = useState<'coordinates' | 'port'>('coordinates');
  const [destLatitude, setDestLatitude] = useState('');
  const [destLongitude, setDestLongitude] = useState('');
  const [destPort, setDestPort] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);

  /* ---------------- GENERATE ROUTE ---------------- */
  const handleGenerateRoute = async () => {
    if (inputMode === "csv") {
      if (!csvFile) {
        toast.error("Please upload a CSV file");
        return;
      }

      setIsGenerating(true);

      try {
        const formData = new FormData();
        formData.append("file", csvFile);

        const response = await fetch("http://localhost:8000/api/upload-csv", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to process CSV");
        }

        const data = await response.json();
        setIsGenerating(false);

        navigate("/csv", {
          state: { csvResults: data },
        });

      } catch (error) {
        setIsGenerating(false);
        toast.error("CSV processing failed");
        console.error(error);
      }

      return;
    }

    setIsGenerating(true);

    try {
      const payload: any = {
        averageSpeed: Number(averageSpeed),
      };

      if (startInputType === "coordinates") {
        payload.start = [
          parseFloat(startLatitude),
          parseFloat(startLongitude),
        ];
      } else {
        payload.startCity = startPort;
      }

      if (destInputType === "coordinates") {
        payload.goal = [
          parseFloat(destLatitude),
          parseFloat(destLongitude),
        ];
      } else {
        payload.goalCity = destPort;
      }

      const response = await fetch("http://localhost:8000/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setIsGenerating(false);

      navigate("/map", {
        state: {
          routeData: data,
          userInput: {
            averageSpeed,
            startPort,
            startLatitude,
            startLongitude,
            destPort,
            destLatitude,
            destLongitude,
          },
        },
      });

    } catch (error) {
      setIsGenerating(false);
      toast.error("Failed to generate route");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-cyan-200 to-blue-100 text-slate-800">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* ---------- PAGE INTRO ---------- */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-3">
            Ship Route Optimization
          </h1>
          <p className="text-slate-600">
            Enter your vessel details manually or upload a CSV file.
          </p>
        </div>

        {/* ---------- INPUT MODE TOGGLE ---------- */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white border border-cyan-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setInputMode('manual')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                inputMode === 'manual'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-cyan-600'
              }`}
            >
              Manual Input
            </button>

            <button
              onClick={() => setInputMode('csv')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                inputMode === 'csv'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-cyan-600'
              }`}
            >
              Upload CSV
            </button>
          </div>
        </div>

        <div className="space-y-10">

          {/* ---------- CSV UPLOAD ---------- */}
          {inputMode === 'csv' && (
            <div className="bg-white border border-cyan-200 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Upload Voyage CSV
              </h2>

              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-slate-700
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:bg-cyan-100 file:text-cyan-700
                  hover:file:bg-cyan-200
                  cursor-pointer"
              />

              {csvFile && (
                <p className="mt-3 text-sm text-teal-600">
                  Selected file: <span className="font-medium">{csvFile.name}</span>
                </p>
              )}
            </div>
          )}

          {/* ---------- MANUAL FORM ---------- */}
          {inputMode === 'manual' && (
            <>
              <ShipDetailsSection
                averageSpeed={averageSpeed}
                setAverageSpeed={setAverageSpeed}
              />

              <VoyageDetailsSection
                startInputType={startInputType}
                setStartInputType={setStartInputType}
                startLatitude={startLatitude}
                setStartLatitude={setStartLatitude}
                startLongitude={startLongitude}
                setStartLongitude={setStartLongitude}
                startPort={startPort}
                setStartPort={setStartPort}
                destInputType={destInputType}
                setDestInputType={setDestInputType}
                destLatitude={destLatitude}
                setDestLatitude={setDestLatitude}
                destLongitude={destLongitude}
                setDestLongitude={setDestLongitude}
                destPort={destPort}
                setDestPort={setDestPort}
              />
            </>
          )}

          {/* ---------- SUBMIT BUTTON ---------- */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleGenerateRoute}
              disabled={isGenerating}
              className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-medium rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Route className="h-5 w-5" />
              <span>
                {isGenerating ? 'Generating Route...' : 'Generate Probable Route'}
              </span>
            </button>
          </div>

        </div>
      </main>

      <footer className="text-center py-6 text-sm text-slate-500">
        © 2026 Safar AI – Maritime Route Optimization System
      </footer>
    </div>
  );
}
