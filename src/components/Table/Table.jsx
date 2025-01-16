import React, { useState } from "react";
import TablePagination from "../TablePagination/TablePagination";

const Table = ({ data, loading, error, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center loading loading-spinner loading-lg"></div>
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {data.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  {columns.map((column, index) => (
                    <th key={index} className="py-2 px-4 border-b">
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="text-center border-b hover:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="py-2 px-4">
                        {typeof column.accessor === "function"
                          ? column.accessor(row)
                          : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            changePage={changePage}
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      ) : (
        !loading && <p className="text-center text-gray-500">No data found.</p>
      )}
    </div>
  );
};

export default Table;
