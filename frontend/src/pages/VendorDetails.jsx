import React from 'react'

export default function VendorDetails() {
  return (
    <div className="flex flex-col w-full justify-center aligns-center items-center ">
    <div className="relative max-w-2xl border  rounded-lg shadow-lg ">
      <div className="bg-gray-200 rounded-t">
      <h2 className="mb-3 p-2 text-2xl font-bold text-gray-900 dark:text-white text-center ">Create a Seller Account</h2>
     </div>
    <form className="p-2">
     
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-7 max-w-4xl">
        <div>
          <label
            for="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Business/Company Name </label
          >
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cinab"
            required
          />
        </div>
        <div>
          <label
            for="Kra_Pin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >KRA PIN</label
          >
          <input
            type="text"
            id="Kra_Pin"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="CR07115544O7KE"
            required
          />
        </div>
        <div>
          <label for="licence" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Trading license No. (optional)</label
          >
          <input
            type="text"
            id="license"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="KBLC254"
            required
          />
        </div>
        <div>
          <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Company Address</label
          >
          <input
            type="address"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="PO BOX. 50-20245"
            required
          />
        </div>
        <div>
          <label for="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Street Address</label
          >
          <input
            type="street"
            id="street"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Eastleigh Ibgaro Plaza 1 Building"
            required
          />
        </div>
        <div>
          <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >City/Town/county</label
          >
          <input
            type="city"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nairobi"
            required
          />
        </div>
        <div>
          <label for="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Phone Number</label
          >
          <input
            type="tel"
            id="contact"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="+25471888868"
            required
          />
        </div>
        <div>
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Company Email</label
          >
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="info@cinab.co.ke"
            required
          />
        </div>
        <div>
          <label for="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Website</label
          >
          <input
            type="url"
            id="website"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="cinab.co.ke"
            required
          />
        </div>

        <div>
          <label for="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Website</label
          >
          <input
            type="url"
            id="website"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="cinab.co.ke"
            required
          />
        </div>
        <div>
          <label for="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >General details of service/Goods</label
          >
          <input
            type="text"
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="E-Commerce Company"
            required
          />
        </div>

      </div>

      <div>
        <button
          type="submit"
          className="text-white float-right mb-2 mt-4 bg-blue-700 px-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

      </div>
    </form>
    </div>
  </div>
  
  )
}
