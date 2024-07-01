import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block lg:hidden p-4 text-white bg-pink-950"
      >
        Menu
      </button>
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-green-950 border-8 border-green-700 text-white w-64 h-screen p-4`}>
        <div className="flex items-center space-x-2 mb-8">
            <img src="/vegan-fennec.png" alt="Icono" className="rounded-full w-12 h-12 object-cover flex-shrink-0" />
          <div>
            <h1 className="text-xl font-bold">VEGAN FENNEC</h1>
            <p className="text-sm">InfluxDB</p>
          </div>
        </div>
        <nav className="space-y-4">
          <Link to="/" className="block p-2 bg-black text-gray-50 border-4 border-green-700 rounded-md text-center hover:bg-gray-950 hover:border-green-800">Home</Link>
          <Link to="/table" className="block p-2 bg-black text-gray-50 border-4 border-green-700 rounded-md text-center hover:bg-gray-950 hover:border-green-800">Tabla</Link>
          <Link to="/graph" className="block p-2 bg-black text-gray-50 border-4 border-green-700 rounded-md text-center hover:bg-gray-950 hover:border-green-800">Gráfica</Link>
          <Link to="/alert" className="block p-2 bg-black text-gray-50 border-4 border-green-700 rounded-md text-center hover:bg-gray-950 hover:border-green-800">Alerta</Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;


