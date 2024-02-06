import React, { useState } from "react";
import { Button, Modal, Select } from "flowbite-react";

function UpdateVendors({ openModal, setOpenModal, data }) {
  const [modalPlacement, setModalPlacement] = useState("center");
  console.log(data);
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
              <div className="flex-1 sm:flex">
                {/* Left Column - Image */}
                <div className="mr-8">
                  <img
                    src={
                      data.images
                        ? data.image
                        : "https://flowbite.com/docs/images/examples/image-4@2x.jpg"
                    }
                    alt="Profile"
                    className="rounded-full border-4 border-gray-300 w-32 h-32 object-cover"
                  />
                </div>
                {/* Right Column - 6 Attributes */}
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800 my-4 ">
                    {data.username ? `${data.username}` : "N/A"}
                  </h2>
                  <div className="grid grid-cols-2  sm:grid-cols-3  space-x-10 space-y-3">
                    <div>
                      <p className="text-gray-600">Email:</p>
                      <p className="font-semibold">
                        {" "}
                        {data.companyEMail ? `${data.companyEMail}` : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Company Name:</p>
                      <p className="font-semibold">
                        {" "}
                        {data.companyName ? `${data.companyName}` : "N/A"}
                      </p>
                    </div>{" "}
                    <div>
                      <p className="text-gray-600">Licence:</p>
                      <p className="font-semibold">
                        {" "}
                        {data.licence ? `${data.licence}` : "N/A"}
                      </p>
                    </div>{" "}
                    <div>
                      <p className="text-gray-600">Mpesa NO:</p>
                      <p className="font-semibold">
                        {" "}
                        {data.MpesaNumber ? `${data.MpesaNumber}` : "N/A"},
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">KRA:</p>
                      <p className="font-semibold">
                        {" "}
                        {data.Kra ? `${data.Kra}` : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location:</p>
                      <p className="font-semibold">
                        {" "}
                        {data.city ? `${data.city}` : "N/A"},
                        {data.country ? `${data.country}` : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 h-1/2 grid grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-600">Account:</p>
                  <p className="font-semibold">
                    {" "}
                    {data.AccountNumber ? `${data.AccountNumber}` : "N/A"},
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Bank:</p>
                  <p className="font-semibold">
                    {data.BankName ? `${data.BankName}` : "N/A"},
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">Name:</p>
                  <p className="font-semibold">
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
