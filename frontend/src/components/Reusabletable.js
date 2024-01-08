import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { TiTickOutline } from "react-icons/ti";
import { GrRevert } from "react-icons/gr";
import { RiChatQuoteFill, RiDeleteBinLine } from "react-icons/ri";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { BsFillEmojiDizzyFill, BsViewStacked ,BsCaretDownFill, BsCaretUpFill} from "react-icons/bs";

export default function ReusableTable({
  columns,
  data,
  itemsPerPage,
  actions,
  columnMapping,
  isLoading,
  isError,
  editProduct,
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

  const handleEditInventory=(row)=>{
    if (onEdit) {
      onEdit(row)
    }
  }

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

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
   
    

      <div className="mx-auto max-w-screen-xl px-2 lg:px-6 h-full overflow-auto scrollbar-hidden">
      
        <div className="bg-primary-50 dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          {header}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                    required=""
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto  scrollbar-hidden px-4">
          {filteredData.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-gray-500 dark:text-gray-400">
                No data found.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm text-left border border-gray-500 text-gray-500  dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((column) => (
              <th
              key={column}
              scope="col"
              className={`px-4 py-3 whitespace-nowrap${column === "name" ? " text-bold" : ""}`}
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
                    <div className="text-center py-4">
                      <Spinner animation="border" role="status" variant="blue"></Spinner>
                    </div>
                  </td>
                </tr>
              ) : (
                sortData(filteredData)
                  .slice(offset, offset + itemsPerPage)
                  .map((row) => (
                    <tr key={row.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-700 odd:bg-primary-50 odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800">
                      {/* <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row)}
                            onChange={() => handleRowSelect(row)}
                          />
                        </td> */}
                      {columns.map((column) => (
                        <td
                          key={column}
                          className={`px-4 py-2 whitespace-nowrap ${
                            column === "email"
                              ? " "
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
            </tbody>
          </table>
          )}
        </div>

     
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                {offset + 1}-
                {Math.min(offset + itemsPerPage, filteredData.length)}
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredData.length}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              {Array.from({ length: pageCount }).map((_, index) => (
                <li key={index}>
                  <span
                    onClick={() => handlePageChange(index + 1)}
                    className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                      currentPage === index
                        ? "text-primary-600 bg-yellow-400 border-1 mr-1 hover:bg-primary-100 "
                        : "text-gray-500  border-1 border-yellow-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
