import React, { useCallback, useEffect, useState } from "react";
import { ReusableTable } from "../components";
import {
  useGetOffersMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} from "../actions/OfferAction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOffers,
  setOffer,
  updateOffer as updateOfferAction,
} from "../reducers/OfferReducer";
import { Spinner } from "react-bootstrap";


export default function Offers() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [getOffers] = useGetOffersMutation();
  const [updateOffer] = useUpdateOfferMutation();
  const [deleteOffer] = useDeleteOfferMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  // Get Offers from the store
  const offerData = useSelector(selectOffers);
  const dispatch = useDispatch();

  // FUNCTION TO FETCH DATA
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getOffers();
      console.log(res);
      if (!res.data) {
        console.log("Failed to get Offers");
      } else {
        // Dispatch the Offers to store them in the store.
        dispatch(setOffer(res.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getOffers]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // update Offer
  const handleUpdateOffer = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (selectedOffer) {
        const formData = new FormData();

        formData.append("id", selectedOffer.id);
        formData.append("productName", selectedOffer.productName);
        formData.append("stock", selectedOffer.stock);
        formData.append("price", selectedOffer.price || 0);
        formData.append("brand", selectedOffer.brand || "");
        formData.append("category", selectedOffer.category || "");
        formData.append("description", selectedOffer.description || "");
        formData.append("offerPrice", selectedOffer.offerPrice || "");
        formData.append("fromDate", selectedOffer.fromDate || "");
        formData.append("toDate", selectedOffer.toDate || "");
        formData.append("status", selectedOffer.status || "");

        // Handle the image based on its type
        if (selectedImage instanceof File) {
          formData.append("image", selectedImage);
        } else if (typeof selectedOffer.image === 'string') {
          // Assuming selectedOffer.image is a string representing the image path
          // If it's something else, adjust this part accordingly
          formData.append("image", selectedOffer.image);
        }

        const { data } = await updateOffer({
          id: selectedOffer.id,
          formData,
        });

        console.log('Offer updated successfully:');
        console.log("Updated Offer Data:", data);

        dispatch(updateOfferAction(data));

        setSelectedImage(null);
        document.getElementById("crud-modal").classList.add("hidden");
      }
    } catch (error) {
      console.error("Error updating Offer:", error);
    } finally {
      setLoading(false)
    }
  };



  // function to handle Offer deletion
  const handleDeleteOffer = async (offerId) => {
    try {
      // Call the deleteOffer mutation with the correct id parameter
      await deleteOffer(offerId);

      // Fetch the latest Offers and update the Redux store
      fetchData();
    } catch (error) {
      console.error("Error deleting Offer:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Log the selected image
      console.log("Selected Image:", file);

      // Update selectedOffer with the new image
      setSelectedOffer({
        ...selectedOffer,
        image: file,
      });
    } else {
      setSelectedImage(null); // Reset the state when no file is selected
    }
  };



  const handleModalInputChange = (e) => {
    setSelectedOffer({
      ...selectedOffer,
      [e.target.name]: e.target.value,
    });
  };



  // Filter Offers based on search query
  const filteredOffers = offerData.filter((offer) =>
    offer.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (row) => {
    console.log(row.id);
    setSelectedOffer(row)
    // // Find the selected Offer for editing
    // const OfferToEdit = row.find(
    //   (Offer) => Offer.id === OfferId
    // );
    // setSelectedOffer(OfferToEdit);

    // // Open the modal
    document.getElementById("offer-modal").classList.remove("hidden");
  };

  const handleDeleteClick = async (rowIndex, id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete Suppliers?"
    );
    if (confirmDelete) {
      const supplierId = rowIndex.id; // Renamed to avoid naming conflicts
      try {
        await deleteOffer(supplierId);

        // dispatch(deleteSupplier(res.data));
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const heading = (

    <div className="bg-orange h-10">
      <h1 className="font-bold text-xl ml-3 ">Your Offers</h1>
    </div>

  )
  return (

    <>



    <ReusableTable

      columns={[
        "productId",
        "productName",
        "category",
        "description",
        "stock",
        "Rprice",
        "offerPrice",
        "fromDate",
        "toDate",
        "status",
        
       

      ]}
      data={offerData}
      header={heading}
      itemsPerPage={10}
      isLoading={loading}
      actions={[
        {
          label: "Edit",
          onClick: handleEdit,
        },
        {
          label: "Delete",
          onClick: handleDeleteClick
          ,
        },

      ]}
      // isError={errMsg}
      onEdit={handleEdit}
      onDelete={handleDeleteClick}
      columnMapping={{
        id: "ID",
        name: "Company Name",
        status: "Status",
        Image: "Company Logo",
        email: "Company Email",
        KRA: "KRA Pin",
        contact: "Phone No.",
        location: "Address",
      }}
    />

    {/* offer modal */}
<div id="offer-modal" tabindex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Offer "Offer name"
                </h3>
                <button data-modal-hide="offer-modal" type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 text-center">
            <div class="p-2 md:p-1 text-start mb-3">
                <form class="space-y-4">
                <div>
                        <label htmlFor="offer-p" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Offer price :</label>
                        <input type="digit" name="offer-p" id="offer-p" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="3000" required />
                    </div>


                   <div className="grid grid-cols-2 gap-2">
                   <div>
                        <label htmlFor="from" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date :</label>
                        <input type="date" name="from" id="from" placeholder="01/12/2024" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="to" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End date :</label>
                        <input type="date" name="to" id="to" placeholder="12/12/2024" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                   </div>
                
                  
                </form>
            </div>
                <button data-modal-hide="offer-modal" type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-700 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-1.5 text-center me-2">
                   Submit
                </button>
                <button data-modal-hide="offer-modal" type="button" className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-1.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
            </div>
        </div>
    </div>
</div>
  </> 

  )
}
