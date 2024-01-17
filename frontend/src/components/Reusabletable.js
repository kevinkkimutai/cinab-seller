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
import ReusablePath from "./reusablePath";
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

  const showPagination = filteredData.length > itemsPerPage;

  const visibleData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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
      <div className="h-full">
        <ReusablePath header={header} />
        <div className="max-h-full h-full bg-primary-50 shadow-lg rounded-lg overflow-auto ">
          <div class="sm:flex">
            <div class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
              <form class="lg:pr-3" action="#" method="GET">
                <label for="users-search" class="sr-only">
                  Search
                </label>
                <div class="relative mt-1 lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
              <button
                type="button"
                data-modal-toggle="add-user-modal"
                class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  class="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Add user
              </button>
              <a
                href="#"
                class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                <svg
                  class="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Export
              </a>
            </div>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tbody
                className={`h-full w-full items-center ${isLoading ? "" : ""}`}
              >
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
                              column === "name"
                                ? "font-medium text-gray-900 "
                                : ""
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
              </tbody>{" "}
            </table>

            {showPagination && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
