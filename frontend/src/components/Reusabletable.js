import React, { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { TiTickOutline } from "react-icons/ti";
import { GrRevert } from "react-icons/gr";
import { RiChatQuoteFill, RiDeleteBinLine } from "react-icons/ri";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { BsFillEmojiDizzyFill, BsViewStacked } from "react-icons/bs";

export default function ReusableTable({
  columns,
  data,
  itemsPerPage,
  actions,
  columnMapping,
  isLoading,
  isError,
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
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editStates, setEditStates] = useState({});
  const [editedData, setEditedData] = useState({});
  const [savingRows, setSavingRows] = useState(new Set()); // To track rows being saved

  useEffect(() => {
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
  }, [searchQuery, data, columns]);

  useEffect(() => {
    if (selectAll) {
      setSelectedRows(filteredData);
    } else {
      setSelectedRows([]);
    }
  }, [selectAll, filteredData]);

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

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handleRowSelect = (row) => {
    if (selectedRows.includes(row)) {
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow !== row)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

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

  return (
    <>
      <div className=" dark:bg-slate-800 bg-slate-200 mt">
        <div className="table-header flex justify-between pt-4">
          <h1 className="dark:text-gray-50 text-gray-800 md:text-4xl font-serif">
            {header}
          </h1>
          <div className="flex gap-x-3">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative mb-2 mt-2">
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
            <div className="justify-center mr-2">
              {onButton && (
                <button
                  onClick={onButton}
                  className="py-auto text-base md:text-sm md:py-2 rounded-lg bg-blue-700 hover:bg-blue-600 px-4 items-center mt-2 "
                  type="button"
                >
                  Add Admin
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          {isError && (
            <Alert variant="danger" className="mt-2 text-red-700">
              {isError}
            </Alert>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className={`cursor-pointer px-2 py-3 mr-4${
                    column === "name" ? " text-bold" : ""
                  }`}
                  style={{ width: "300px" }}
                  onClick={() => handleSort(column)}
                >
                  {columnMapping[column] || column}{" "}
                  <span className="ml-1">
                    {sortBy === column && sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
              ))}
              {actions && (
                <th scope="col" className="cursor-pointer px-2 py-3 mr-4">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="bg-primary-50 border-b dark:bg-gray-900 dark:border-gray-700">
                <td colSpan={columns.length + (actions ? 1 : 0)}>
                  <div className="text-center py-4">
                    <Spinner animation="border" role="status"></Spinner>
                  </div>
                </td>
              </tr>
            ) : (
              sortData(filteredData)
                .slice(offset, offset + itemsPerPage)
                .map((row) => (
                  <tr
                    key={row.id}
                    className="border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={() => handleRowSelect(row)}
                      />
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column}
                        className={`px-2 py-2${
                          column === "dueDate" ? " text-xs text-semibold" : ""
                        }`}
                        style={{ width: "250px" }}
                      >
                        {editStates[row.id] ? (
                          <input
                            type="text"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={editedData[row.id]?.[column] || row[column]}
                            onChange={(e) =>
                              handleEditFieldChange(
                                row.id,
                                column,
                                e.target.value
                              )
                            }
                          />
                        ) : column === "Image" ? (
                          <img
                            src={row[column]}
                            alt=""
                            className="rounded-full w-12 h-12"
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
                            {onView && (
                              <button
                                onClick={() => handleView(row)}
                                className="text-yellow-500"
                              >
                                <TooltipComponent title="View">
                                  <BsViewStacked className=" text-xl" />
                                </TooltipComponent>
                              </button>
                            )}
                            {onEdit && (
                              <button
                                onClick={() => handleEdit(row)}
                                className="text-yellow-500"
                              >
                                <TooltipComponent title="Edit">
                                  <BsFillEmojiDizzyFill className="text-xl" />
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
        <nav
          className="flex items-center dark:bg-slate-800 justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {offset + 1}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(offset + itemsPerPage, filteredData.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredData.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <button
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-primary-50 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
                }
                disabled={currentPage === 0}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: pageCount }).map((_, page) => (
              <li key={page}>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-primary-50 border border-gray-300 ${
                    page === currentPage
                      ? "text-blue-600 bg-blue-50"
                      : "hover:bg-gray-100 hover:text-gray-700"
                  } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-primary-50 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, pageCount - 1)
                  )
                }
                disabled={currentPage === pageCount - 1}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>{" "}
      </div>
    </>
  );
}
