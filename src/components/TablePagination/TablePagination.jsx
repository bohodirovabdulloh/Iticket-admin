import React from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

const Pagination = ({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
  changePage,
  rowsPerPage,
  handleRowsPerPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 13) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      if (currentPage > 7) {
        pages.push("...");
      }

      const start = Math.max(6, currentPage - 1);
      const end = Math.min(totalPages - 5, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 6) {
        pages.push("...");
      }

      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i > 5) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div>
      <div className="flex justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-xl bg-base-100 shadow-lg rounded-l-lg"
        >
          <GrLinkPrevious />
        </button>

        <div className="flex">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-4 py-2 mx-1 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => changePage(page)}
                  className={`px-4 py-2 mx-1 ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } rounded-lg`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-base-100 shadow-lg rounded-r-lg"
        >
          <GrLinkNext />
        </button>
      </div>

      <div className="mt-4 flex justify-end items-center">
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="px-3 py-2 w-[200px] select border border-gray-300 rounded-lg"
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
