import React, { useEffect, useState } from "react";
import { fetchAllData, fetchData } from "../../api/api";
import Pagination from "../Pagination/Pagination";
import { sortDataByPublishedDate } from "../../utils/useSortedData";

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

  const displayData = searchTerm ? filteredResults : results;

  return (
    <div className="h-full">
      {loading ? (
        <p>Carregando...</p>
      ) : displayData.length > 0 ? (
        <ul>
          {displayData.map((result) => {
            return (
              <li
                className="text-center bg-slate-200 p-5 border border-slate-950"
                key={result.id}
              >
                <span className="font-bold">{result.name}</span> -{" "}
                <span className="italic">{result.company}</span>
              </li>
            );
          })}
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
