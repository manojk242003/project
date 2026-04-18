import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface VoyageDetailsSectionProps {
  startInputType: 'coordinates' | 'port';
  setStartInputType: (type: 'coordinates' | 'port') => void;
  startLatitude: string;
  setStartLatitude: (value: string) => void;
  startLongitude: string;
  setStartLongitude: (value: string) => void;
  startPort: string;
  setStartPort: (value: string) => void;
  destInputType: 'coordinates' | 'port';
  setDestInputType: (type: 'coordinates' | 'port') => void;
  destLatitude: string;
  setDestLatitude: (value: string) => void;
  destLongitude: string;
  setDestLongitude: (value: string) => void;
  destPort: string;
  setDestPort: (value: string) => void;
}

const VoyageDetailsSection: React.FC<VoyageDetailsSectionProps> = ({
  startInputType,
  setStartInputType,
  startLatitude,
  setStartLatitude,
  startLongitude,
  setStartLongitude,
  startPort,
  setStartPort,
  destInputType,
  setDestInputType,
  destLatitude,
  setDestLatitude,
  destLongitude,
  setDestLongitude,
  destPort,
  setDestPort,
}) => {
  return (
    <section className="bg-white border border-cyan-200 rounded-2xl p-6 shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Navigation className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">
          Voyage Details
        </h2>
      </div>

      <div className="space-y-8">

        {/* START LOCATION */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-4 w-4 text-cyan-600" />
            <h3 className="text-sm font-medium text-slate-800">
              Start Location
            </h3>
          </div>

          <div className="flex space-x-6 mb-4">
          <label className="flex items-center cursor-pointer text-sm text-slate-600">
              <input
                type="radio"
                checked={startInputType === 'port'}
                onChange={() => setStartInputType('port')}
                className="mr-2 accent-cyan-600"
              />
              Port Name
            </label>
            <label className="flex items-center cursor-pointer text-sm text-slate-600">
              <input
                type="radio"
                checked={startInputType === 'coordinates'}
                onChange={() => setStartInputType('coordinates')}
                className="mr-2 accent-cyan-600"
              />
              Coordinates
            </label>

            
          </div>

          {startInputType === 'coordinates' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                value={startLatitude}
                onChange={(e) => setStartLatitude(e.target.value)}
                placeholder="Latitude"
                step="any"
                className="px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <input
                type="number"
                value={startLongitude}
                onChange={(e) => setStartLongitude(e.target.value)}
                placeholder="Longitude"
                step="any"
                className="px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          ) : (
            <input
              type="text"
              value={startPort}
              onChange={(e) => setStartPort(e.target.value)}
              placeholder="Enter port name"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          )}
        </div>

        {/* DESTINATION LOCATION */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-4 w-4 text-orange-500" />
            <h3 className="text-sm font-medium text-slate-800">
              Destination Location
            </h3>
          </div>

          <div className="flex space-x-6 mb-4">
          <label className="flex items-center cursor-pointer text-sm text-slate-600">
              <input
                type="radio"
                checked={destInputType === 'port'}
                onChange={() => setDestInputType('port')}
                className="mr-2 accent-orange-500"
              />
              Port Name
            </label>
            <label className="flex items-center cursor-pointer text-sm text-slate-600">
              <input
                type="radio"
                checked={destInputType === 'coordinates'}
                onChange={() => setDestInputType('coordinates')}
                className="mr-2 accent-orange-500"
              />
              Coordinates
            </label>

            
          </div>

          {destInputType === 'coordinates' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                value={destLatitude}
                onChange={(e) => setDestLatitude(e.target.value)}
                placeholder="Latitude"
                step="any"
                className="px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="number"
                value={destLongitude}
                onChange={(e) => setDestLongitude(e.target.value)}
                placeholder="Longitude"
                step="any"
                className="px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          ) : (
            <input
              type="text"
              value={destPort}
              onChange={(e) => setDestPort(e.target.value)}
              placeholder="Enter port name"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
        </div>

      </div>
    </section>
  );
};

export default VoyageDetailsSection;
