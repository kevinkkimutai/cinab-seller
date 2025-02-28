import React, { useCallback, useEffect, useState } from "react";
import { ReusableTable } from "../../components";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Button } from "flowbite-react";
import {
  useGetVendorsMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useAcceptVendorsMutation,
} from "../../actions/VendorAction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVendors,
  setVendor,
  updateVendors,
} from "../../reducers/VendorReducer";

export default function Vendors({ header }) {
  const [loading, setLoading] = useState(false);
  const [acceptVendor] = useAcceptVendorsMutation();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [getVendorsMutation] = useGetVendorsMutation();
  const [updateVendorMutation] = useUpdateVendorMutation();
  const [deleteVendorMutation] = useDeleteVendorMutation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get Vendors from the store
  const VendorData = useSelector(selectVendors);
  const dispatch = useDispatch();

  // FUNCTION TO FETCH DATA
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getVendorsMutation();
      console.log(res);
      if (!res.data) {
        console.log("Failed to get Vendors");
      } else {
        // Filter vendors with status === 0
        const filteredVendors = res.data.filter(
          (vendor) => vendor.status === "rejected"
        );

        // Dispatch the filtered vendors to store them in the Redux store.
        dispatch(setVendor(filteredVendors));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getVendorsMutation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // update Vendor
  const handleUpdateVendor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedVendor) {
        const formData = new FormData();

        formData.append("id", selectedVendor.id);
        formData.append("name", selectedVendor.productName);
        formData.append("stock", selectedVendor.stock);
        formData.append("price", selectedVendor.price || 0);
        formData.append("brand", selectedVendor.brand || "");
        formData.append("category", selectedVendor.category || "");
        formData.append("description", selectedVendor.description || "");
        formData.append("approval", selectedVendor.approval || "");

        // Handle the image based on its type
        if (selectedImage instanceof File) {
          formData.append("image", selectedImage);
        } else if (typeof selectedVendor.image === "string") {
          // Assuming selectedVendor.image is a string representing the image path
          // If it's something else, adjust this part accordingly
          formData.append("image", selectedVendor.image);
        }

        const { data } = await updateVendorMutation({
          id: selectedVendor.id,
          formData,
        });

        console.log("Vendor updated successfully:");
        console.log("Updated Vendor Data:", data);

        dispatch(updateVendors(data));

        setSelectedImage(null);
        document.getElementById("crud-modal").classList.add("hidden");
      }
    } catch (error) {
      console.error("Error updating Vendor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (row) => {
    setSelectedVendor(row);
    try {
      if (row) {
        const res = acceptVendor(row.id);
        dispatch(setVendor(res.data));
        fetchData();
        toast.success("Vendor approved successfully");
      }
    } catch (error) {
      console.error("Error approving Vendor:", error);
      // Handle error, show an error message, etc.
      toast.error("Failed to approve Vendor");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Log the selected image
      console.log("Selected Image:", file);

      // Update selectedVendor with the new image
      setSelectedVendor({
        ...selectedVendor,
        image: file,
      });
    } else {
      setSelectedImage(null); // Reset the state when no file is selected
    }
  };

  const handleModalInputChange = (e) => {
    setSelectedVendor({
      ...selectedVendor,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (row) => {
    console.log(row.id);
    setSelectedVendor(row);
    // // Find the selected Vendor for editing
    // const VendorToEdit = row.find(
    //   (Vendor) => Vendor.id === VendorId
    // );
    // setSelectedVendor(VendorToEdit);

    // // Open the modal
    document.getElementById("crud-modal").classList.remove("hidden");
  };

  const handleDeleteClick = async (row) => {
    setSelectedVendor(row);
    // Open the modal
    document.getElementById("popup-modal").classList.remove("hidden");
  };

  // function to handle Vendor deletion
  const handleDeleteVendor = async () => {
    setIsDeleting(true);
    const id = selectedVendor.id;
    try {
      // Call the deleteVendor mutation with the correct id parameter
      const res = await deleteVendorMutation(id);
      console.log(res);
      toast.success(`Vendor deleted successfully`);
      document.getElementById("popup-modal").classList.add("hidden");
      // Fetch the latest Vendors and update the Redux store
      fetchData();
    } catch (error) {
      console.error("Error deleting Vendor:", error);
      toast.error("Failed to update Vendor");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ReusableTable
        columns={[
          "companyName",
          "status",
          "image",
          "companyEMail",
          "Kra",
          "MpesaNumber",
        ]}
        data={VendorData}
        header={header}
        itemsPerPage={10}
        // isLoading={loading}
        actions={[
          {
            label: "Edit",
            onClick: handleEdit,
          },
          {
            label: "Delete",
            onClick: handleDeleteClick,
          },
          {
            label: "Approve",
            onClick: handleDeleteClick,
          },
        ]}
        // isError={errMsg}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onApprove={handleApprove}
        columnMapping={{
          name: "Company Name",
          status: "Status",
          Image: "Company Logo",
          email: "Company Email",
          KRA: "KRA Pin",
          contact: "Phone No.",
          location: "Address",
        }}
      />
      {/* start delete modal */}
      <div
        id="popup-modal"
        tabIndex="-1"
        className="hidden justify-center bg-gray-900/80 h-full flex mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-lg max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
            <button
              type="button"
              onClick={() =>
                document.getElementById("popup-modal").classList.add("hidden")
              }
              className="absolute top-3 end-2.5 text-gray-800 bg-red-200 dark:bg-red-400 hover:bg-red-300 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-red-700 w-12 h-12 dark:text-red-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <span className="underline text-red-700 dark:text-red-500 font-bold uppercase">
                  {" "}
                  {selectedVendor?.pname || ""}
                </span>{" "}
                ?
              </h3>

              <Button
                type="button"
                onClick={() => handleDeleteVendor()}
                className="text-white bg-red-600 py-1 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 text-center me-2"
              >
                {isDeleting ? (
                  <div className="flex flex-row gap-3">
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span className="pl-3">Deleting...</span>
                  </div>
                ) : (
                  "Yes!"
                )}
              </Button>
              <button
                onClick={() =>
                  document.getElementById("popup-modal").classList.add("hidden")
                }
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Main modal --> */}
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden md:pt-12 justify-center flex mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-primary-50 rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-4 bVendor-b rounded-t dark:bVendor-gray-600">
              <h3 className="text-lg font-bold  text-gray-900 dark:text-white">
                Update{" "}
                <span className="font-bold  text-green-600 dark:text-green-400 uppercase">
                  {selectedVendor?.name || ""}
                </span>
              </h3>
              <button
                type="button"
                className="text-red-600 bg-transparent hover:bg-red-200 hover:text-red-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-red-800"
                onClick={() =>
                  document.getElementById("crud-modal").classList.add("hidden")
                }
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={handleUpdateVendor}>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-6 p-4">
                {/* <!-- Display selected files --> */}
                {selectedImage ? (
                  <img
                    className="rounded-lg"
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Img"
                  />
                ) : selectedVendor?.image &&
                  typeof selectedVendor.image === "string" ? (
                  <img
                    className="rounded-lg"
                    src={selectedVendor.image}
                    alt={selectedVendor.name}
                  />
                ) : selectedVendor?.image instanceof File ? (
                  <img
                    className="rounded-lg"
                    src={URL.createObjectURL(selectedVendor.image)}
                    alt={selectedVendor.name}
                  />
                ) : null}

                <div className="md:pt-5">
                  <label
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="multiple_files"
                  >
                    Upload image(s)
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 bVendor bVendor-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:bVendor-gray-600 dark:placeholder-gray-400"
                    id="multiple_files"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    multiple
                    onChange={handleImageChange}
                  />

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    PNG, JPG, or JPEG files (Max. 5MB each)
                  </p>
                  <div className="md:pt-6">
                    <label
                      htmlFor="name"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={selectedVendor?.name || ""}
                      onChange={handleModalInputChange}
                      className="block w-full p-2 text-gray-900 bVendor bVendor-gray-300 rounded-lg bg-gray-50 md:text-sm focus:ring-blue-500 focus:bVendor-blue-500 dark:bg-gray-700 dark:bVendor-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:bVendor-blue-500"
                      placeholder="Type Vendor name"
                      required=""
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={selectedVendor?.brand || ""}
                    onChange={handleModalInputChange}
                    className="block w-full p-2 text-gray-900 bVendor bVendor-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:bVendor-blue-500 dark:bg-gray-700 dark:bVendor-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:bVendor-blue-500"
                    placeholder="Vendor brand"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={selectedVendor?.category || ""}
                    onChange={(e) => handleModalInputChange(e)}
                    className="block w-full p-2 text-gray-900 bVendor bVendor-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:bVendor-blue-500 dark:bg-gray-700 dark:bVendor-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:bVendor-blue-500"
                  >
                    <option>Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price (Ksh)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={selectedVendor?.price || ""}
                    onChange={handleModalInputChange}
                    id="price"
                    className="block w-full p-2 text-gray-900 bVendor bVendor-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:bVendor-blue-500 dark:bg-gray-700 dark:bVendor-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:bVendor-blue-500"
                    placeholder="3000"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stock/Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={selectedVendor?.stock || ""}
                    onChange={handleModalInputChange}
                    className="block w-full p-2 text-gray-900 bVendor bVendor-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:bVendor-blue-500 dark:bg-gray-700 dark:bVendor-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:bVendor-blue-500"
                    placeholder="10"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows="4"
                    value={selectedVendor?.description || ""}
                    onChange={handleModalInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg bVendor bVendor-gray-300 focus:ring-primary-500 focus:bVendor-primary-500 dark:bg-gray-700 dark:bVendor-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:bVendor-primary-500"
                    placeholder="Your description here"
                  ></textarea>
                </div>

                <div className="mt- sm:mt- sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    {loading ? (
                      <div role="status">
                        <span className="">updating...</span>
                      </div>
                    ) : (
                      "Update Vendor"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
