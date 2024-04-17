import React, { useState } from "react";
import NavBar from "./components/NavBar/Navbar";
import MedicineList from "./components/MedicineList/MedicineList";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "company">("name");

  return (
    <div>
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <MedicineList searchTerm={searchTerm} searchType={searchType} />
    </div>
  );
};

export default App;
