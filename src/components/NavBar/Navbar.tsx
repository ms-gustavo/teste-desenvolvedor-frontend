// src/components/NavBar/NavBar.tsx
import React from "react";
import SearchBar from "../SearchBar/SearchBar";

interface NavBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchType: "name" | "company";
  setSearchType: (type: "name" | "company") => void;
}

const NavBar: React.FC<NavBarProps> = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
}) => {
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
