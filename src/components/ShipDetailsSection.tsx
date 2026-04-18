import React from 'react';
import { Ship } from 'lucide-react';

interface ShipDetailsSectionProps {
  averageSpeed: string;
  setAverageSpeed: (value: string) => void;
  maxFuel: string;
  setmaxFuel: (value: string) => void;
}

const ShipDetailsSection: React.FC<ShipDetailsSectionProps> = ({
  averageSpeed,
  setAverageSpeed,
  maxFuel,
  setmaxFuel
}) => {
  return (
    <section className="bg-white border border-cyan-200 rounded-2xl p-6 shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-cyan-100 p-2 rounded-lg">
          <Ship className="h-5 w-5 text-cyan-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">
          Ship Details
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800 mb-2">
          Average Speed (SOG) – knots
        </label>

        <input
          type="number"
          value={averageSpeed}
          onChange={(e) => setAverageSpeed(e.target.value)}
          placeholder="0"
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-2">
          Max fuel – km
        </label>

        <input
          type="number"
          value={maxFuel}
          onChange={(e) => setmaxFuel(e.target.value)}
          placeholder="0"
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
      </div>
    </section>
  );
};

export default ShipDetailsSection;
