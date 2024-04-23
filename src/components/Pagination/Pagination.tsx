import React from "react";

interface PaginationProps {
  pages: number;
  setPage: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  setPage,
  currentPage,
}) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center my-2">
      <div className="flex space-x-2">
        {pageNumbers.map((number) => (
          <button
            id="PaginationButton"
            key={number}
            onClick={() => setPage(number)}
            disabled={currentPage === number}
            className={`page-item px-4 py-2 border rounded ${
              currentPage === number
                ? "bg-gray-800 text-white"
                : "bg-white transition ease-in-out hover:text-white hover:bg-gray-400"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
