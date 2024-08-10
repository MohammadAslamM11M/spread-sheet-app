"use client";

import { useState } from "react";
import useCellStore from "../stores/useCellStore";

const Spreadsheet = () => {
  const { cells, updateCell, undo, redo } = useCellStore();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [alignment, setAlignment] = useState("left");
  const [fontSize, setFontSize] = useState("text-base");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const cellsPerPage = 100;

  const filteredCells = cells.filter((cell) =>
    cell.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * cellsPerPage;
  const endIndex = startIndex + cellsPerPage;
  const paginatedCells = filteredCells.slice(startIndex, endIndex);

  const handleCellClick = (index) => {
    const actualIndex = startIndex + index;
    setEditingIndex(actualIndex);
    setEditingValue(filteredCells[actualIndex]);
  };

  const validateValue = (value, columnIndex) => {
    if (columnIndex === 0) {
      return /^[0-9]*$/.test(value);
    }
    return true;
  };

  const handleBlur = (index) => {
    if (editingIndex !== null) {
      if (validateValue(editingValue, index % 10)) {
        updateCell(editingIndex, editingValue);
      } else {
        alert(
          "Invalid input. Only numeric values are allowed in the first column."
        );
      }
      setEditingIndex(null);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage * cellsPerPage < filteredCells.length) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Spreadsheet App
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="mb-4 md:mb-0 p-2 border border-gray-300 rounded-md shadow-sm text-black"
        />
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-black">Align:</label>
            <select
              value={alignment}
              onChange={(e) => setAlignment(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-black">Font Size:</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="text-xs">Small</option>
              <option value="text-base">Medium</option>
              <option value="text-lg">Large</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-px border border-gray-300 bg-gray-100">
        {paginatedCells.map((cell, index) => (
          <input
            key={index}
            type="text"
            value={index === editingIndex ? editingValue : cell}
            onClick={() => handleCellClick(index)}
            onChange={(e) => setEditingValue(e.target.value)}
            onBlur={() => handleBlur(index)}
            className={`w-full h-12 p-2 border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-${alignment} ${fontSize} text-gray-700`}
          />
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={(page + 1) * cellsPerPage >= filteredCells.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={undo}
          className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600"
        >
          Undo
        </button>
        <button
          onClick={redo}
          className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600"
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default Spreadsheet;
