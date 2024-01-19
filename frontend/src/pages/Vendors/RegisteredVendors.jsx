import React, { useState } from "react";
import Reusablepath from "../../components/ReusablePath";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import {
  useCreateVendorMutation,
  useSelfRegisterMutation,
} from "../../actions/VendorAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createVendor } from "../../reducers/VendorReducer";

export default function RegisteredVendors() {
  const [vendorData, setVendorData] = useState({
    companyEmail: "",
    companyName: "",
    location: "",
    AddressOne: "",
    username: "",
    contact: "",
  });
  const [modalData, setModalData] = useState({
    companyEmail: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [creatVendorMutation] = useCreateVendorMutation();
  const [selfRegistrationMutation] = useSelfRegisterMutation();
  const dispatch = useDispatch();
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMdalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await selfRegistrationMutation(modalData);
    if (res.data) {
      toast.success("Vendor created successfull");
      dispatch(createVendor(res.data));
      setOpenModal(false);
      setOpenModal({
        companyEmail: "",
      });
    } else {
      if (res.error.status === 409) {
        toast.error(res.error.data.error);
      } else if (res.error.status === 500) {
        toast.error("Internal server Error");
        setOpenModal(true);
      } else {
        toast.error("Failed to create vendor try again");
        setOpenModal(true);
      }
    }

    try {
    } catch (error) {
      toast.error("Failed to create vendor");
      setOpenModal(true);

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await creatVendorMutation(vendorData);
    if (res.data) {
      toast.success("Vendor created successfull");
      dispatch(createVendor(res.data));
      setVendorData({
        companyEmail: "",
        companyName: "",
        location: "",
        AddressOne: "",
        username: "",
        contact: "",
      });
    } else {
      if (res.error.status === 409) {
        toast.error(res.error.data.error);
      } else if (res.error.status === 500) {
        toast.error("Internal server Error");
      } else {
        toast.error("Failed to create vendor try again");
      }
    }

    try {
    } catch (error) {
      toast.error("Failed to create vendor");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Reusablepath header="Add new vendor" />
      <div className="h-full overflow-auto m-4 pb-4 scrollbar-hidden p-2 bg-primary-50 dark:bg-gray-700 text-gray-700 dark:text-gray-50 rounded-lg shadow-lg ">
        <div className=" flex justify-end w-full">
          <Button onClick={() => setOpenModal(true)}>Self Registration</Button>
        </div>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Enter Email for self Registration</Modal.Header>
          <form className="" onSubmit={handleModalSubmit}>
            <Modal.Body>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  type="email"
                  name="companyEmail"
                  id="email"
                  value={modalData.companyEmail}
                  onChange={handleMdalChange}
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">
                {loading ? <div>Creating..</div> : <div>Submit</div>}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel{" "}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* Main Content */}
        <div>
          <form class="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Email{" "}
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  id="email"
                  value={vendorData.companyEmail}
                  onChange={handleFormChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>

              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Name{" "}
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="company name"
                  required=""
                  value={vendorData.companyName}
                  onChange={handleFormChange}
                />
              </div>

              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={vendorData.location}
                  onChange={handleFormChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="company location"
                  required=""
                />
              </div>

              <div>
                <label
                  for="address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address{" "}
                </label>
                <input
                  type="text"
                  name="AddressOne"
                  value={vendorData.AddressOne}
                  onChange={handleFormChange}
                  id="address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="company Address"
                  required=""
                />
              </div>

              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sales Agent{" "}
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={vendorData.username}
                  onChange={handleFormChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Sales Agent"
                  required=""
                />
              </div>

              <div>
                <label
                  for="contact"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact{" "}
                </label>
                <input
                  type="text"
                  name="contact"
                  value={vendorData.contact}
                  onChange={handleFormChange}
                  id="contact"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+25471295568"
                  required=""
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                class=" text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <div>Craeting...</div> : "Register"}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
