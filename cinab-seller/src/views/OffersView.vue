<template>
    <div>



        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 justify-center">
          <div class="bg-orange h-10">
        <h1 class="font-bold text-xl ml-3 ">Your Current Offers</h1>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
   

        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>

                <th scope="col" class="px-6 py-3">
                    Description
                </th>
               
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                
                <th scope="col" class="px-6 py-3">
                    In-Stock
                </th>
                <th scope="col" class="px-6 py-3">
                    Previous Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Offer Price
                </th>
                <th scope="col" class="px-6 py-3">
                    End Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>

            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    Yes
                </td>
              
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    $2500
                </td>
                <td class="px-6 py-4">
                    15-7-23
                </td>
                <td class="flex items-center px-6 py-4">
                    <a href="#" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               
                
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    No
                </td>
               
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    $2500
                </td>
                <td class="px-6 py-4">
                    15-7-23
                </td>
               
                <td class="flex items-center px-6 py-4">
                    <a href="#" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    Yes
                </td>
              
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4">
                    $2500
                </td>
                <td class="px-6 py-4">
                    15-7-23
                </td>
              
                <td class="flex items-center px-6 py-4">
                    <a href="#" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple Watch
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Watches
                </td>
                <td class="px-6 py-4">
                    Yes
                </td>
               
                <td class="px-6 py-4">
                    $199
                </td>
                <td class="px-6 py-4">
                    $2500
                </td>
                <td class="px-6 py-4">
                    15-7-23
                </td>
               
                <td class="flex items-center px-6 py-4">
                    <a href="#" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
         
        </tbody>
    </table>
</div>

<div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden md:pt-12 md:ml-24 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-bold  text-gray-900 dark:text-white">
                   Update Offers
                </h3>
                <button type="button" class="text-red-600 bg-transparent hover:bg-red-200 hover:text-red-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-red-800" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form @submit.prevent="submitForm">
        <div class="grid gap-2 sm:grid-cols-2 sm:gap-6 p-4">
          <div class="sm:col-span-2">
            <label for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text" name="name" id="name" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type product name" required="">
          </div>
         
          <div>
            <label for="category" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id="category" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option :selected="true">Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div>
            <label for="category" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">In-Stock</label>
            <select id="category" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option :selected="true">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              
            </select>
          </div>
       
          <div class="sm:col-span-1">
            <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
          </div>
          <div>
            <label for="end-date" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">End date</label>
            <input type="number" name="item-weight" id="item-weight" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10-12-23" required="">
          </div>
          <div>
            <label for="previous-price" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Previous price</label>
            <input type="number" name="item-weight" id="item-weight" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required="">
          </div>
          <div>
            <label for="offer-price" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Offer price</label>
            <input type="number" name="item-weight" id="item-weight" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required="">
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload file(s)</label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              accept=".png, .jpg, .jpeg"
              multiple
              @change="handleFileChange"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, or JPEG files (Max. 5MB each)</p>
          </div>
          <!-- Display selected files -->
          <div v-if="selectedFiles.length > 0">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-1">Selected Files:</h3>
            <ul>
              <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</li>
            </ul>
          </div>
          <div class="mt-4 sm:mt- sm:col-span-2">
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
        </div>
    </div>
</div> 

    </div>
</template>




 
<script>
export default {
  data() {
    return {
      selectedFiles: [],
    };
  },
  methods: {
    submitForm() {
      // The form is handling the submission logic here:
    },
    handleFileChange(event) {
      const files = event.target.files;

      // Check the number of files, there should be a maximum of three
      if (files.length > 3) {
        alert('Please upload a maximum of 3 files.');
        event.target.value = ''; // Clear the file input
        return;
      }

      // Checking the file types uploaded
      for (const file of files) {
        const fileType = file.type.split('/')[0]; // Get the file type (e.g., 'image')

        if (fileType !== 'image') {
          alert('Please upload only image files (PNG, JPG, JPEG).');
          event.target.value = ''; // Clear the file input
          return;
        }
      }

      // Store the selected files
      this.selectedFiles = Array.from(files);

      console.log('File validation passed');
    },
  },
};
</script>


<style scoped>
    .bg-green{
  background-color: #A3C86D;
}

.bg-yellow{
  background-color: #FDD761;
}
.bg-orange{
  background-color: #FF7857;
}

.bg-purple{
	background-color: #b17897;
}
.bg-blue{
	background-color: #7a83ee;
}
</style>