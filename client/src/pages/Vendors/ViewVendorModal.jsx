import React, { useState } from "react";
import { Button, Modal, Select, Table } from "flowbite-react";

function UpdateVendors({ openModal, setOpenModal, data }) {
  const [modalPlacement, setModalPlacement] = useState("center");
  console.log(data);
  return (
    <>
      <Modal
        show={openModal}
        position={modalPlacement}
        size="7xl"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Vendor Details</Modal.Header>
        <Modal.Body>
          <div className="h-[62vh] overflow-auto grid  grid-cols-1 md:grid-cols-3">
            <div className="col h-full border border-gray-200">
              <div className="h-full w-full flex items-center justify-center">
                <div className="">
                  <div className="rounded-full flex justify-center">
                    <img
                      src={
                        data.image
                          ? data.image
                          : "https://flowbite.com/docs/images/examples/image-4@2x.jpg"
                      }
                      alt="Profile"
                      className="rounded-full border-4 flex border-gray-300 md:w-56 md:h-56  w-40 h-40 object-cover"
                    />
                  </div>
                  <p className="font-semibold  justify-center flex">
                    <span className="text-gray-800 dark:text-gray-50 text-sm font-semibold">
                      {data.username ? `${data.username}` : "N/A"}
                    </span>
                  </p>
                  <p className="font-semibold block">
                    <span className="text-gray-400 dark:text-gray-50 text-sm font-semibold">
                      {data.companyEMail ? `${data.companyEMail}` : "N/A"}
                    </span>
                  </p>
                  <div className="flex justify-between mt-4 gap-4">
                    <p className="font-semibold block">
                      {" "}
                      Kra:
                      <span className="text-green-500 ms-2 dark:text-gray-50 text-sm font-semibold">
                        {data.Kra ? `${data.Kra}` : "N/A"}
                      </span>
                    </p>
                    <p className="font-semibold block capitalize ">
                      {" "}
                      Status:
                      <span className="text-green-500 text-xl ms-2 dark:text-gray-50 capitalize font-semibold">
                        {data.status ? `${data.status}` : "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                {/* <div className="grid grid-col-1 ">
                  <div className="flex justify-center">
               
                  </div>
                  <div className="flex justify-center">
                 
                  </div>

                </div> */}
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-1">
                <div className="overflow-x-auto">
                  <div className="justify-center flex text-2xl font-semibold">
                    <h3>Business Information</h3>
                  </div>
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>Passport/Id No.</Table.HeadCell>
                      <Table.HeadCell>Address</Table.HeadCell>
                      <Table.HeadCell>City/Town</Table.HeadCell>
                      <Table.HeadCell>State/Region</Table.HeadCell>
                      <Table.HeadCell>Website</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {data.secretCode ? `${data.secretCode}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.AddressOne ? `${data.AddressOne}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.city ? `${data.city}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.state ? `${data.state}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.website ? (
                            <a
                              href={data.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
                <div className="overflow-x-auto">
                  <div className="justify-center flex text-2xl font-semibold">
                    <h3>Shop Information</h3>
                  </div>
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>Business Type</Table.HeadCell>
                      <Table.HeadCell>Shop Name</Table.HeadCell>
                      <Table.HeadCell>licence</Table.HeadCell>
                      <Table.HeadCell>Shop Zone</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {data.businessType ? `${data.businessType}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.shopName ? `${data.shopName}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.licence ? `${data.licence}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.shopZone ? `${data.shopZone}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>

                <div className="overflow-x-auto">
                  <div className="justify-center flex text-2xl font-semibold">
                    <h3>Preferred payment option:</h3>
                  </div>
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>Bank Account Number</Table.HeadCell>
                      <Table.HeadCell>Bank Name</Table.HeadCell>
                      <Table.HeadCell>MPesa Number</Table.HeadCell>
                      <Table.HeadCell>Full Mpesa Name</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {data.AccountNumber ? `${data.AccountNumber}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.BankName ? `${data.BankName}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.MpesaNumber ? `${data.MpesaNumber}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell>
                          {data.MpesaName ? `${data.MpesaName}` : "N/A"}
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
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
