import React from "react";
import SearchInput from "../SearchBar/SearchBar";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row flex-grow">
            <SearchInput placeholder="Procurar por remédio..." />
            <SearchInput placeholder="Procurar por empresa..." />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
