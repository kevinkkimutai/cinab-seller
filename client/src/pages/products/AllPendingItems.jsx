import React, { useCallback, useEffect, useState } from "react";
import { ReusableTable } from "../../components";
import {
  useDeleteProductMutation,
  useGetItemsMutation,
} from "../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, setItems } from "../../reducers/ProductReducers";
import { toast } from "react-toastify";
import UpdateProductsFn from "./../products/updatedProudct";
import { Button, Spinner } from "flowbite-react";

export default function PendingItems({ header }) {
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [getProducts] = useGetItemsMutation();
  const [deleteProductMutation] = useDeleteProductMutation();
  const [showUpdatePage, setShowUpdatePage] = useState(false);

  const productData = useSelector(selectItems);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      if (res.data) {
        const pendindData = res.data.filter((product) => product.status === 0);
        dispatch(setItems(pendindData));
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [dispatch, getProducts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (row) => {
    setShowUpdatePage(true);
    setSelectedProduct(row);
  };

  //   open modal

  const handleOpenModal = async (row) => {
    setSelectedProduct(row);
    // Open the modal
    document.getElementById("popup-modal").classList.remove("hidden");
  };

  const handleDeleteClick = async () => {
    const id = selectedProduct.id;
    setLoading(true);
    try {
      await deleteProductMutation(id);
      toast.success("Item deleted successfully");
      document.getElementById("popup-modal").classList.add("hidden");
      fetchData();
    } catch (error) {
      toast.error("Failed To Delete Item try Again");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (e) => {
    setShowUpdatePage(false);
  };

  return (
    <>
      {showUpdatePage ? (
        <UpdateProductsFn
          formData={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          handleClose={handleClose}
        />
      ) : (
        <ReusableTable
          columns={[
            "image",
            "name",
            "stock",
            "retail_price",
            "status",
            "wholesale_price",
          ]}
          data={productData}
          header={header}
          itemsPerPage={10}
          // isLoading={loading}
          onDelete={handleOpenModal}
          onEdit={handleEdit}
          actions={[
            {
              label: "Edit",
              onClick: handleEdit,
            },
            {
              label: "Delete",
              onClick: handleOpenModal,
            },
          ]}
          columnMapping={{
            name: "Product Name",

            retail_price: "Retail Price",
            status: "Status",
            image: "Image",
            wholesale_price: "wholesale price",
          }}
        />
      )}

      {/* start delete modal */}
      <div
        id="popup-modal"
        tabIndex="-1"
        className="hidden justify-center bg-gray-900/80 mx-auto flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 j items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative  p-4 w-full max-w-lg max-h-full">
          <div className="relative h-36 bg-white rounded-lg shadow dark:bg-gray-700 ">
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
                  {selectedProduct?.pname || ""}
                </span>{" "}
                ?
              </h3>

              <Button
                type="button"
                onClick={() => handleDeleteClick()}
                className="text-white bg-red-600 py-1 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 text-center me-2"
              >
                {loading ? (
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
    </>
  );
}
