<template>
    <div class="w-full">
        <div class="title text-center">
            <h3 class="text-black dark:text-white font-bold text-md md:text-3xl underline pb-3">List Of All Products</h3>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mx-auto ">
            <div
                class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="p- rounded-t-lg w-full" src="../assets/cinab.jpg" alt="product image" />
                </a>
                <div class="mx-2 pb-1">
                    <a href="#">
                        <h5 class="text-md tracking-tight text-center text-gray-900 dark:text-white">Apple Watch Series 7
                            GPS, Alumini Case, Starlight </h5>
                    </a>
                    <div class="flex items-center mt-2.5 mb-2">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse text-gray-800 dark:text-white">
                            Stock
                        </div>
                        <span
                            class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.2 rounded dark:bg-blue-200 dark:text-blue-800 ms-1">
                            50
                        </span>
                            <span class="text-sm text-blue-500 dark:text-white ms-1"><span>Ksh:</span> 599</span>
                    </div>
                    <div class="flex items-center grid md:grid-cols-2 ">
                        <div>
                            <span class="text-sm font-semibold text-gray-900 dark:text-white ">Category</span>
                        </div>
                       <div class="grid  justify-center grid-cols-2 gap-2 mx-2 md:mx-0 pt-2 md:pt-1">
                        <button
                        data-modal-target="crud-modal" data-modal-toggle="crud-modal" 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit
                        </button>
                        <a href="#"
                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Delete
                        </a>
                       </div>
                    </div>
                </div>
            </div>

            <div
                class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="p- rounded-t-lg w-full" src="../assets/cinab.jpg" alt="product image" />
                </a>
                <div class="mx-2 pb-1">
                    <a href="#">
                        <h5 class="text-md tracking-tight text-center text-gray-900 dark:text-white">Apple Watch Series 7
                            GPS, Alumini Case, Starlight </h5>
                    </a>
                    <div class="flex items-center mt-2.5 mb-2">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse text-gray-800 dark:text-white">
                            Stock
                        </div>
                        <span
                            class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.2 rounded dark:bg-blue-200 dark:text-blue-800 ms-1">
                            50
                        </span>
                            <span class="text-sm text-blue-500 dark:text-white ms-1"><span>Ksh:</span> 599</span>
                    </div>
                    <div class="flex items-center grid md:grid-cols-2 ">
                        <div>
                            <span class="text-sm font-semibold text-gray-900 dark:text-white ">Category</span>
                        </div>
                       <div class="grid  justify-center grid-cols-2 gap-2 mx-2 md:mx-0 pt-2 md:pt-1">
                        <button
                        data-modal-target="crud-modal" data-modal-toggle="crud-modal" 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit
                        </button>
                        <a href="#"
                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Delete
                        </a>
                       </div>
                    </div>
                </div>
            </div>

            <div
                class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="p- rounded-t-lg w-full" src="../assets/cinab.jpg" alt="product image" />
                </a>
                <div class="mx-2 pb-1">
                    <a href="#">
                        <h5 class="text-md tracking-tight text-center text-gray-900 dark:text-white">Apple Watch Series 7
                            GPS, Alumini Case, Starlight </h5>
                    </a>
                    <div class="flex items-center mt-2.5 mb-2">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse text-gray-800 dark:text-white">
                            Stock
                        </div>
                        <span
                            class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.2 rounded dark:bg-blue-200 dark:text-blue-800 ms-1">
                            50
                        </span>
                            <span class="text-sm text-blue-500 dark:text-white ms-1"><span>Ksh:</span> 599</span>
                    </div>
                    <div class="flex items-center grid md:grid-cols-2 ">
                        <div>
                            <span class="text-sm font-semibold text-gray-900 dark:text-white ">Category</span>
                        </div>
                       <div class="grid  justify-center grid-cols-2 gap-2 mx-2 md:mx-0 pt-2 md:pt-1">
                        <button
                        data-modal-target="crud-modal" data-modal-toggle="crud-modal" 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit
                        </button>
                        <a href="#"
                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Delete
                        </a>
                       </div>
                    </div>
                </div>
            </div>

            <div
                class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="p- rounded-t-lg w-full" src="../assets/cinab.jpg" alt="product image" />
                </a>
                <div class="mx-2 pb-1">
                    <a href="#">
                        <h5 class="text-md tracking-tight text-center text-gray-900 dark:text-white">Apple Watch Series 7
                            GPS, Alumini Case, Starlight </h5>
                    </a>
                    <div class="flex items-center mt-2.5 mb-2">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse text-gray-800 dark:text-white">
                            Stock
                        </div>
                        <span
                            class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.2 rounded dark:bg-blue-200 dark:text-blue-800 ms-1">
                            50
                        </span>
                            <span class="text-sm text-blue-500 dark:text-white ms-1"><span>Ksh:</span> 599</span>
                    </div>
                    <div class="flex items-center grid md:grid-cols-2 ">
                        <div>
                            <span class="text-sm font-semibold text-gray-900 dark:text-white ">Category</span>
                        </div>
                       <div class="grid  justify-center grid-cols-2 gap-2 mx-2 md:mx-0 pt-2 md:pt-1">
                        <button
                        data-modal-target="crud-modal" data-modal-toggle="crud-modal" 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit
                        </button>
                        <a href="#"
                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Delete
                        </a>
                       </div>
                    </div>
                </div>
            </div>
</div>


<!-- Main modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden md:pt-12 md:ml-24 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-bold  text-gray-900 dark:text-white">
                   Update Product
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
          <div class="w-full">
            <label for="brand" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
            <input type="text" name="brand" id="brand" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product brand" required="">
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
          <div class="w-full">
            <label for="price" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price (Ksh)</label>
            <input type="number" name="price" id="price" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3000" required="">
          </div>
          <div>
            <label for="item-stock" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Stock/Quantity</label>
            <input type="number" name="item-weight" id="item-weight" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required="">
          </div>
          <div class="sm:col-span-1">
            <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
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
#popup-modal {
    background-color: rgb(255, 255, 255);
}

</style>