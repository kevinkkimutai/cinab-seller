import React from 'react'

export default function UploadForm() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 w-full h-full max-h-full overflow-y-auto">
     <div className="flex flex-col w-full  justify-center aligns-center items-center">
      <div className="relative max-w-2xl border  rounded-lg shadow-lg ">
     <div className="bg-gray-200 rounded-t">
      <h2 className="mb-3 p-2 text-2xl font-bold text-gray-900 dark:text-white text-center ">Add a new product</h2>
     </div>
      <form className="mx-2">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-2">
          <div className="sm:col-span-2">
            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
          </div>
          <div className="w-full">
            <label for="brand" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
            <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required=""/>
          </div>
          <div>
            <label for="category" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              <option >Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div className="w-full">
            <label for="price" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price (Ksh)</label>
            <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="3000" required=""/>
          </div>
          <div>
            <label for="item-stock" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Stock/Quantity</label>
            <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10" required=""/>
          </div>
          <div className="sm:col-span-2">
            <label for="description" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="description" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload file(s)</label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              accept=".png, .jpg, .jpeg"
              multiple
            
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, or JPEG files (Max. 5MB each)</p>
          </div>
          {/* <!-- Display selected files --> */}
          <div v-if="selectedFiles.length > 0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">Selected Files:</h3>
            <ul>
              <li v-for="(file, index) in selectedFiles" >file</li>
            </ul>
          </div>
          <div className="mt-4 sm:mt-6">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
   </section>
  )
}
