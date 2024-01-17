import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { TiTickOutline } from "react-icons/ti";
import { GrRevert } from "react-icons/gr";
import { RiChatQuoteFill, RiDeleteBinLine } from "react-icons/ri";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
  BsFillEmojiDizzyFill,
  BsViewStacked,
  BsCaretDownFill,
  BsCaretUpFill,
} from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";

export default function ReusableTable({
  columns,
  data,
  itemsPerPage,
  actions,
  columnMapping,
  isLoading,

  onEdit,
  onView,
  header,
  onDelete,
  onQuote,
  onButton,
}) {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);
  const [editStates, setEditStates] = useState({});
  const [editedData, setEditedData] = useState({});
  const [savingRows, setSavingRows] = useState(new Set()); // To track rows being saved

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter((row) =>
        columns.some((column) => {
          const cellValue = String(row[column]);
          return (
            cellValue &&
            cellValue.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      );

      setFilteredData(filtered);
    }
  }, [searchQuery, data, columns]);

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  }

  function sortData(dataToSort) {
    if (sortBy) {
      return [...dataToSort].sort((a, b) => {
        const aValue = String(a[sortBy]);
        const bValue = String(b[sortBy]);
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }
    return dataToSort;
  }

  const handleDelete = (row) => {
    if (onDelete) {
      onDelete(row);
    }
  };

  const handleEdit = (row) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [row.id]: true,
    }));
  };

  const handleView = (row) => {
    if (onView) {
      onView(row);
    }
  };

  const handleQuote = (row) => {
    if (onQuote) {
      onQuote(row);
    }
  };

  const handleEditInventory = (row) => {
    if (onEdit) {
      onEdit(row);
    }
  };

  const handleEditFieldChange = (rowId, column, value) => {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [rowId]: {
        ...prevEditedData[rowId],
        [column]: value,
      },
    }));
  };

  // Inside ReusableTable component
  const handleSaveEdit = (row) => {
    const editedRowData = editedData[row.id];
    if (onEdit) {
      // Start saving for the target row
      setSavingRows((prevSavingRows) => new Set(prevSavingRows).add(row.id));

      onEdit({ id: row.id, ...editedRowData }).then(() => {
        // Save operation completed, remove the row from the saving set
        setSavingRows((prevSavingRows) => {
          const newSavingRows = new Set(prevSavingRows);
          newSavingRows.delete(row.id);
          return newSavingRows;
        });

        // Clear the edited data and edit state for this row
        setEditStates((prevEditStates) => ({
          ...prevEditStates,
          [row.id]: false,
        }));
        setEditedData((prevEditedData) => ({
          ...prevEditedData,
          [row.id]: {},
        }));
      });
    }
  };

  const handleCancelEdit = (row) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [row.id]: false,
    }));
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [row.id]: {},
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const lastPage = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < lastPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const offset = currentPage * itemsPerPage;

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-2 lg:px-6 h-full max-h-full overflow-auto scrollbar-hidden p-2 bg-primary-50 dark:bg-gray-800 rounded-lg">
        <div className="table-header p-2 mb-3 flex justify-between shadow-lg dark:bg-gray-800 rounded-t-lg">
          <h1 className="dark:text-gray-50 text-gray-800 md:text-4xl font-serif">
            {header}{" "}
          </h1>
          <div className="flex gap-x-3">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative mb- mt-">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0-4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  required
                />
              </div>
            </form>
          </div>
        </div>

        <div className=" h-full relative shadow-md sm:rounded-lg overflow-auto scrollbar-hidden">
          <div className="overflow-x-auto  border-2 scrollbar-hidden p-2">
            <div>
              <table className="w-full text-sm text-left  text-gray-500  dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      <span>#</span>
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className={`px-4 py-3 whitespace${
                          column === "name" ? " text-bold" : ""
                        }`}
                        onClick={() => handleSort(column)}
                      >
                        <div className="flex items-center">
                          <span>{columnMapping[column] || column}</span>
                          {sortBy === column && sortOrder === "asc" ? (
                            <BsCaretUpFill className="ml-1" />
                          ) : (
                            <BsCaretDownFill className="ml-1" />
                          )}
                        </div>
                      </th>
                    ))}
                    {actions && (
                      <th scope="col" className="cursor-pointer px-2 py-3 mr-4">
                        <span className="">Actions</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className={`h-full w-full items-center ${isLoading ? '' : ''}`}>
                  {isLoading ? (
                    <td
                      colSpan={columns.length + (actions ? 1 : 0)}
                      className="text-center py-4"
                    >
                      <div className="h-72 flex items-center justify-center animate-pulse">
                        <ThreeDots className="text-blue-500" />
                      </div>
                    </td>
                  ) : (
                    sortData(filteredData)
                      .slice(offset, offset + itemsPerPage)
                      .map((row, index) => (
                        <tr
                          key={row.id}
                          className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-700 odd:bg-primary-50 odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800"
                        >
                          <td className="px-4 py-2">{offset + index + 1}</td>

                          {columns.map((column) => (
                            <td
                              key={column}
                              className={`px-4 py-2  ${
                                column === "name" ? "" : ""
                              }`}
                            >
                              {editStates[row.id] ? (
                                <input
                                  type="text"
                                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  value={
                                    editedData[row.id]?.[column] || row[column]
                                  }
                                  onChange={(e) =>
                                    handleEditFieldChange(
                                      row.id,
                                      column,
                                      e.target.value
                                    )
                                  }
                                />
                              ) : column === "image" ? (
                                <img
                                  src={row[column]}
                                  alt=""
                                  className="rounded-full w-8 h-8"
                                />
                              ) : (
                                row[column]
                              )}
                            </td>
                          ))}
                          {actions && (
                            <td className="flex-1 justify-between m-auto px-2">
                              {editStates[row.id] ? (
                                savingRows.has(row.id) ? (
                                  <div className="text-center">
                                    <Spinner
                                      animation="border"
                                      role="status"
                                    ></Spinner>
                                  </div>
                                ) : (
                                  <div className="flex justify-start items-center space-x-2">
                                    <button
                                      onClick={() => handleSaveEdit(row)}
                                      className="text-green-500"
                                    >
                                      <TooltipComponent title="Save">
                                        <TiTickOutline className="text-xl" />
                                      </TooltipComponent>
                                    </button>
                                    <button
                                      onClick={() => handleCancelEdit(row)}
                                      className="text-red-500"
                                    >
                                      <TooltipComponent title="Cancel">
                                        <GrRevert className="text-xl" />
                                      </TooltipComponent>
                                    </button>
                                  </div>
                                )
                              ) : (
                                <div className="flex justify-start items-center space-x-2">
                                  {onQuote && (
                                    <button
                                      onClick={() => handleQuote(row)}
                                      className="text"
                                    >
                                      <TooltipComponent title="Quote">
                                        <RiChatQuoteFill className="text-xl text-green-600" />
                                      </TooltipComponent>
                                    </button>
                                  )}

                                  {onEdit && (
                                    <button
                                      onClick={() => handleEditInventory(row)}
                                      className="text-blue-500"
                                    >
                                      <span>Edit</span>
                                    </button>
                                  )}

                                  {onDelete && (
                                    <button
                                      onClick={() => handleDelete(row)}
                                      className="text-orange-500"
                                    >
                                      <TooltipComponent title="Delete">
                                        <RiDeleteBinLine className="text-xl" />
                                      </TooltipComponent>
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          )}
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between me-4 px-4 p-2">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {offset + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.min(offset + itemsPerPage, filteredData.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredData.length}
              </span>{" "}
              Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={handlePrevPage}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-600 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                Prev
              </button>
              <button
                onClick={handleNextPage}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-600 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
