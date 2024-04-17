// src/components/NavBar/NavBar.tsx
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

const NavBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");

  return (
    <nav className="bg-gray-800 text-black p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center space-y-4 md:space-y-0">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onTypeChange={setSearchType}
            searchType={searchType}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
