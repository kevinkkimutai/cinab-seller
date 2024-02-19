import React, { useState } from "react";
import { Button, Modal, Select } from "flowbite-react";

function UpdateVendors({ openModal, setOpenModal, data }) {
  const [modalPlacement, setModalPlacement] = useState("center");
 
  return (
    <>
      <Modal
        show={openModal}
        position={modalPlacement}
        size="3xl"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Vendor Details</Modal.Header>
        <Modal.Body>
          <div className="h-[62vh] overflow-auto">
            <div class=" h-full">
              {/* Top Div */}

              <div className="flex-1 sm:flex w-full">
                {/* Left Column - Image */}
                <div className="w-4/12">
                  <img
                    src={
                      data.images
                        ? data.image
                        : "https://flowbite.com/docs/images/examples/image-4@2x.jpg"
                    }
                    alt="Profile"
                    className="rounded-full border-4 border-gray-300 rounded w-32 h-32 object-cover"
                  />
                </div>
                {/* Right Column - 6 Attributes */}
                <div className="w-8/12">
              
                <div className="">
                  <div className="grid grid-cols-2  gap-2 rounded ">
                  <div className="bg-blue-50 border border-gray-300 rounded">
                <p className="text-gray-600 ms-1">CompanyName:</p>
                      <p className="font-semibold ms-1">
                      {data.username ? `${data.username}` : "N/A"}
                      </p>
                </div>
                    <div className="bg-blue-50 border border-gray-300 rounded">
                      <p className="text-gray-600 ms-1">Email:</p>
                      <p className="font-semibold ms-1">

                        {" "}
                        {data.companyEMail ? `${data.companyEMail}` : "N/A"}
                      </p>
                    </div>

                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 rounded ">
                    <div className="bg-blue-50 border border-gray-300 rounded">
                      <p className="text-gray-600 ms-1">Mpesa NO:</p>
                      <p className="font-semibold ms-1">
                        {" "}
                        {data.MpesaNumber ? `${data.MpesaNumber}` : "N/A"},
                      </p>
                    </div>


                    <div className="bg-blue-50 border border-gray-300 rounded">
                      <p className="text-gray-600 ms-1">KRA:</p>
                      <p className="font-semibold ms-1">
                        {" "}
                        {data.Kra ? `${data.Kra}` : "N/A"}
                      </p>
                    </div>

                </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2">
            
                    <div className="bg-blue-50 border border-gray-300 rounded">
                      <p className="text-gray-600 ms-1">Location:</p>
                      <p className="font-semibold ms-1">
                        {" "}
                        {data.city ? `${data.city}` : "N/A"},
                        {data.country ? `${data.country}` : "N/A"}
                      </p>
                    </div>

              <div className="bg-blue-50 border border-gray-300 rounded">
                      <p className="text-gray-600 ms-1">Licence:</p>
                      <p className="font-semibold ms-1">
                        {" "}
                        {data.licence ? `${data.licence}` : "N/A"}
                      </p>
                    </div>{" "}
                <div className="bg-blue-50 border border-gray-300 rounded">
                  <p className="text-gray-600 ms-1">Account:</p>
                  <p className="font-semibold ms-1">
                    {" "}
                    {data.AccountNumber ? `${data.AccountNumber}` : "N/A"},
                  </p>
                </div>

                <div className="bg-blue-50 border border-gray-300 rounded">
                  <p className="text-gray-600 ms-1">Bank:</p>
                  <p className="font-semibold ms-1">
                    {data.BankName ? `${data.BankName}` : "N/A"},
                  </p>
                </div>

                <div className="bg-blue-50 border border-gray-300 rounded">
                  <p className="text-gray-600 ms-1">Name:</p>
                  <p className="font-semibold ms-1">
                    {" "}
                    {data.MpesaName ? `${data.MpesaName}` : "N/A"},
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateVendors;
