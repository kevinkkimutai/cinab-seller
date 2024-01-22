import React, { useState, useEffect } from "react";
import { TiTickOutline } from "react-icons/ti";
import { GrRevert } from "react-icons/gr";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { BsViewStacked, BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import ReusablePath from "./ReusablePath";
import { Spinner } from "flowbite-react";
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
  btnFn,
  onApprove,
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
    if (onEdit) {
      onEdit(row);
    }
  };

  const handleView = (row) => {
    if (onView) {
      onView(row);
    }
  };

  const handleQuote = (row) => {
    if (onApprove) {
      onApprove(row);
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

  const showPagination = filteredData.length > itemsPerPage;

  const offset = currentPage * itemsPerPage;

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

  return (
    <>
      <ReusablePath header={header} />
      <div className="mx-auto max-w-screen-xl px-2 lg:px-3 ml-1 h-full overflow-auto scrollbar-hidden">
        <div className="bg-primary-50 dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <div className="relative mb- mt-">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-800 dark:text-white me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    required
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              {onButton && (
                <button
                  type="button"
                  onClick={btnFn}
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                  {onButton}{" "}
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto  scrollbar-hidden px-4">
            <table className="w-full h-full max-h-full text-sm text-left border border-gray-200 text-gray-500  dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <span>#</span>
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className={`px-4 py-3 whitespace-nowrap ${
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
              <tbody>
                {isLoading ? (
                  <tr className="bg-primary-50  border-b  dark:bg-gray-900 dark:border-gray-700">
                    <td colSpan={columns.length + (actions ? 1 : 0)}>
                      <div className="text-center py-4  ">
                        <Spinner
                          animation="border"
                          role="status"
                          variant="blue"
                          className=""
                        ></Spinner>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredData.length === 0 ? (
                      <div></div>
                    ) : (
                      sortData(filteredData)
                        .slice(offset, offset + itemsPerPage)
                        .map((row, index) => (
                          <tr
                            key={row.id}
                            className={`${
                              isLoading ? "bg-blue-500 animate-pulse" : ""
                            } border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-700 odd:bg-primary-50 odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800`}
                            // className=""
                          >
                            <td className="px-4 py-2">{offset + index + 1}.</td>

                            {columns.map((column) => (
                              <td
                                key={column}
                                className={`px-4 py-2 whitespace-nowrap dark:text-white ${
                                  column === "name"
                                    ? "font-medium text-gray-900"
                                    : ""
                                }`}
                              >
                                {editStates[row.id] ? (
                                  <input
                                    type="text"
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={
                                      editedData[row.id]?.[column] ||
                                      row[column]
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
                                    src={
                                      row[column] ||
                                      "https://flowbite.com/docs/images/examples/image-4@2x.jpg"
                                    }
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
                                    {onEdit && (
                                      <button
                                        onClick={() => handleEdit(row)}
                                        className="inline-flex items-center px-2 py-0.5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                      >
                                        Edit
                                      </button>
                                    )}
                                    {onApprove && (
                                      <button
                                        onClick={() => handleQuote(row)}
                                        className="inline-flex items-center px-1.5 py-0.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                      >
                                        Approve
                                      </button>
                                    )}
                                    {onDelete && (
                                      <button
                                        onClick={() => handleDelete(row)}
                                        className="inline-flex items-center px-1.5 py-0.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                      >
                                        Delete
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
                                  </div>
                                )}
                              </td>
                            )}
                          </tr>
                        ))
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

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
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-500 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-400 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
    </>
  );
}
