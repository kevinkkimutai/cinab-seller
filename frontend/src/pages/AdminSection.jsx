import React, { useCallback, useEffect, useState } from "react";
import { ReusableTable } from "../components";
import {
  useGetAdminsMutation,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} from "../actions/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdmins,
  setAdmin,
  updateAdmin,

} from "../reducers/AdminReducers";
import { toast } from "react-toastify";
import { Button, Spinner } from "flowbite-react";
import { addAdmin } from "../reducers/AdminReducers";


export default function Admins({ header }) {
  const [loading, setLoading] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [getAdmins] = useGetAdminsMutation();
  const [createAdmin] = useCreateAdminMutation();
  const [deleteAdminMutation] = useDeleteAdminMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [updateAdminMutation] = useUpdateAdminMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  const adminData = useSelector(selectAdmins);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdmins();
      console.log(res.data);
      if (!res.data) {
        console.log("Failed to get Admins");
      } else {
        dispatch(setAdmin(res.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getAdmins]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const [formData, setFormData] = useState({

    name: null,
    contact: "",
    email: "",
    password: "",
    image: null,

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("image", formData.image);
  

    console.log("formData before:", formData);

    try {
      const { data } = await createAdmin(formDataToSend);
      if (data) {
        dispatch(addAdmin(data));
        console.log("formData after:", formData);
        toast.success(`${formData.name} added to Admins successfully`);
        document.getElementById("authentication-modal").classList.add("hidden");
      } else {
        console.log(data);
        toast.error("Email Already Exists.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Admin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (e.target.name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0],
      }));
    }
  };


  const handleEdit = (row) => {
    if (row && row.hasOwnProperty('name')) {
      document.getElementById("edit-modal").classList.remove("hidden");
      setSelectedAdmin(row);
    } else {
      console.error('Invalid row data:', row);
    }
  };
  
  const handleInputChangeUpdate = (e) => {
    setSelectedAdmin({
      ...selectedAdmin,
      [e.target.name]: e.target.value,
    });
  };
  
  
    // update Admin
    const handleUpdateAdmin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (selectedAdmin) {
          const formData = new FormData();
    
        
          formData.append("name", selectedAdmin.name);
          formData.append("email", selectedAdmin.email);
          formData.append("contact", selectedAdmin.contact);
    
          // Handle the image based on its type
          if (selectedImage instanceof File) {
            formData.append("image", selectedImage);
          } else if (typeof selectedAdmin.image === "string") {
            formData.append("image", selectedAdmin.image);
          }
    
          const { data } = await updateAdminMutation({
            id: selectedAdmin.id,
            formData,
          });
    
          dispatch(updateAdmin(data));
          toast.success(`${data.name} updated successfully`);
    
          setSelectedImage(null);
        }
      } catch (error) {
        console.error("Error updating Admin:", error);
        toast.error("An error occurred while updating admin. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
  
  //   open modal
  const handleOpenModal = async (row) => {
    setSelectedAdmin(row);
    // Open the modal
    document.getElementById("popup-modal").classList.remove("hidden");
  
  };

  const handleDeleteClick = async () => {
    const id = selectedAdmin.id;
    setLoading(true);
    try {
      await deleteAdminMutation(id);
      toast.success("Admin deleted successfully");
      document.getElementById("popup-modal").classList.add("hidden");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };


  const handleAddAdmin = (e) => {
    document.getElementById("authentication-modal").classList.remove("hidden");
  }

  return (
    <>
  
        <ReusableTable
          columns={[
            "image",
            "name",
            "email",
          ]}
          data={adminData}
          header={header}
          itemsPerPage={10}
          btnFn={handleAddAdmin}
          isLoading={loading}

          onButton="Add Admin"
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
            name: "Name",
            email: "Email",
            image: "Image",
          }}
        />
      

      {/* start delete modal */}
      <div
        id="popup-modal"
        tabIndex="-1"
        className="hidden justify-center bg-gray-900/80 mx-auto flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 j items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
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
                  {selectedAdmin?.name || ""}
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

{/* <!-- Start Edit modal --> */}
<div id="edit-modal" tabindex="-1" aria-hidden="true" class="hidden justify-center bg-gray-900/80 mx-auto flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 j items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-xl max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                   Update Admin
                </h3>
                <button type="button" onClick={() =>
                document.getElementById("edit-modal").classList.add("hidden")
              } class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-4 md:p-5">
                <form class="space-y-4"  onSubmit={handleUpdateAdmin}>
                   <div className="w-full flex gap-2">
                   <div className="w-1/2">
                        <label for="name1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter FullName</label>
                        <input type="text" name="name" id="name1"  value={selectedAdmin ? selectedAdmin.name : ""} 
  onChange={handleInputChangeUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Kevin Kirui" required />
                    </div>
                    <div className="w-1/2">
                        <label for="email1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
                        <input type="email" name="email1" id="email1" value={formData.email} 
                    onChange={handleInputChangeUpdate}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="cinabonline@gmail.com" required />
                    </div>
                   </div>

                   <div className="w-full flex gap-2">
                   <div className="w-1/2">
                        <label for="contact1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Contact</label>
                        <input type="text" name="contact1" id="contact1" 
                       value={formData.contact} 
                        onChange={handleInputChange}
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Kevin Kirui" required />
                    </div>
                   <div className="w-1/2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar1">Upload image</label>
                        <input onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar1" type="file" />
                   </div>
                   </div>
                  
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    
                </form>
            </div>
        </div>
    </div>
</div> 


{/* <!-- Main modal --> */}
<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden justify-center bg-gray-900/80 mx-auto flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 j items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-xl max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Admin
                </h3>
                <button type="button" onClick={() =>
                document.getElementById("authentication-modal").classList.add("hidden")
              } class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-4 md:p-5">
                <form class="space-y-4"  onSubmit={handleSubmit}>
                   <div className="w-full flex gap-2">
                   <div className="w-1/2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter FullName</label>
                        <input type="text" name="name" id="name"  value={formData.name}
                onChange={handleInputChange}
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Kevin Kirui" required />
                    </div>
                    <div className="w-1/2">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
                        <input type="email" name="email" id="email"   value={formData.email}  onChange={handleInputChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="cinabonline@gmail.com" required />
                    </div>
                   </div>

                   <div className="w-full flex gap-2">
                   <div className="w-1/2">
                        <label for="contact" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Contact</label>
                        <input type="text" name="contact" id="contact"  value={formData.contact}
                onChange={handleInputChange}
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Kevin Kirui" required />
                    </div>
                   <div className="w-1/2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload image</label>
                        <input onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                   </div>
                   </div>
                  
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter password</label>
                        <input type="password" name="password"  value={formData.password}  onChange={handleInputChange} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    
                </form>
            </div>
        </div>
    </div>
</div> 

    </>
  );
}