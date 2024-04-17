import React, { useEffect, useState } from "react";
import { fetchAllData, fetchData, fetchMedicineById } from "../../api/api";
import Pagination from "../Pagination/Pagination";
import MedicineModal from "../MedicineModal/MedicineModal";
import { sortDataByPublishedDate } from "../../utils/useSortedData";
import MedicineItem from "../MedicineItem/MedicineItem";
import MedicineModalContent from "../MedicineModal/MedicineModalContent";

interface MedicineListProps {
  searchTerm: string;
  searchType: "name" | "company";
}

interface Document {
  id: string;
  expedient: string;
  type: string;
  url: string;
}

interface ActivePrinciple {
  id: string;
  name: string;
}

export interface Medicine {
  id: string;
  name: string;
  published_at: string;
  company: string;
  documents: Document[];
  active_principles: ActivePrinciple[];
}

const MedicineList: React.FC<MedicineListProps> = ({
  searchTerm,
  searchType,
}) => {
  const [results, setResults] = useState<Medicine[]>([]);
  const [filteredResults, setFilteredResults] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Number);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchData(page);
        const sortedData = sortDataByPublishedDate(data.data);
        setTotalPages(data.pages);
        setResults(sortedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false);
    };

    getData();
  }, [page]);

  useEffect(() => {
    if (searchTerm) {
      const fetchDataAndFilter = async () => {
        const allData = await fetchAllData();
        const sortedData = sortDataByPublishedDate(allData);
        const filtered = sortedData.filter((result: Medicine) => {
          const targetString =
            searchType === "name" ? result.name : result.company;
          return targetString.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredResults(filtered);
      };

      fetchDataAndFilter();
    } else {
      setFilteredResults([]);
    }
  }, [searchTerm, searchType]);

  const handleMedicineClick = async (id: string) => {
    try {
      const response = await fetchMedicineById(id);
      setSelectedMedicine(response);
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch medicine details:", error);
    }
  };

  const translateDocType = (docType: string) => {
    const types: Record<string, string> = {
      PROFESSIONAL: "Profissional",
      PATIENT: "Paciente",
    };
    return types[docType] || docType;
  };

  const displayData = searchTerm ? filteredResults : results;

  return (
    <div className="h-min-screen">
      {loading ? (
        <p>Carregando...</p>
      ) : displayData.length > 0 ? (
        <ul>
          {displayData.map((medicine) => (
            <MedicineItem
              key={medicine.id}
              medicine={medicine}
              onClick={handleMedicineClick}
            />
          ))}
          <MedicineModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            {selectedMedicine ? (
              <MedicineModalContent
                medicine={selectedMedicine}
                translateDocType={translateDocType}
              />
            ) : (
              <p className="text-center justify-center">Carregando...</p>
            )}
          </MedicineModal>
          {displayData == results && (
            <div>
              <Pagination
                pages={totalPages}
                setPage={setPage}
                currentPage={page}
              />
            </div>
          )}
        </ul>
      ) : (
        <p className="text-center bg-slate-200 p-5 border border-slate-950">
          Não há resultados para sua pesquisa.
        </p>
      )}
    </div>
  );
};

export default MedicineList;
