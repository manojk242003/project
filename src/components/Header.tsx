import React from 'react';
import { Anchor } from 'lucide-react';
import Home from '../pages/Home';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    // <header className="bg-white border-b border-slate-300 px-4 py-4">
    <header className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border-b border-cyan-500/20 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")} >
          <div className="p-2 bg-blue-600 rounded-lg">
            <Anchor className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-white" >Safar AI</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;