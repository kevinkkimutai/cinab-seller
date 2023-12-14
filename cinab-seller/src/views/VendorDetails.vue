<template>
  <div class="flex justify-center mt-20">
    <form class="shadow-lg rounded-lg p-4 bg-slate-100 dark:bg-slate-800">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-7 max-w-4xl">
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Business/Company Name <span class="text-red-800">*</span></label
          >
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cinab"
            required
          />
        </div>
        <div>
          <label
            for="Kra_Pin"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >KRA PIN</label
          >
          <input
            type="text"
            id="Kra_Pin"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="CR07115544O7KE"
            required
          />
        </div>
        <div>
          <label for="licence" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Trading license No. (optional)</label
          >
          <input
            type="text"
            id="license"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="KBLC254"
            required
          />
        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Company Address</label
          >
          <input
            type="address"
            id="address"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="PO BOX. 50-20245"
            required
          />
        </div>
        <div>
          <label for="street" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Street Address</label
          >
          <input
            type="street"
            id="street"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Eastleigh Ibgaro Plaza 1 Building"
            required
          />
        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >City/Town/county</label
          >
          <input
            type="city"
            id="city"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nairobi"
            required
          />
        </div>
        <div>
          <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Phone Number</label
          >
          <input
            type="tel"
            id="contact"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="+25471888868"
            required
          />
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Company Email</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="info@cinab.co.ke"
            required
          />
        </div>
        <div>
          <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Website</label
          >
          <input
            type="url"
            id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="cinab.co.ke"
            required
          />
        </div>
        <div>
          <label for="details" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >General details of service/Goods</label
          >
          <input
            type="text"
            id="details"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="E-Commerce Company"
            required
          />
        </div>

        <div>
          <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Website</label
          >
          <input
            type="url"
            id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="cinab.co.ke"
            required
          />
        </div>
      </div>
      <!-- SUBMIT BUTTON -->
      <div>
        <button
          type="submit"
          class="text-white  mt-4 bg-blue-700 px-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

      </div>
    </form>
  </div>
</template>
