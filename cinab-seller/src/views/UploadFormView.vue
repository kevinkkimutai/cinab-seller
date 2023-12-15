<template>
  

    <div class="flex flex-col w-full justify-center aligns-center items-center">
      <div class="relative max-w-2xl border  rounded-lg shadow-lg ">
     <div class="bg-gray-200 rounded-t">
      <h2 class="mb-3 p-2 text-2xl font-bold text-gray-900 dark:text-white text-center ">Add a new product</h2>
     </div>
      <form @submit.prevent="submitForm" class="mx-2">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-2">
          <div class="sm:col-span-2">
            <label for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
          </div>
          <div class="w-full">
            <label for="brand" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
            <input type="text" name="brand" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="">
          </div>
          <div>
            <label for="category" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              <option :selected="true">Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div class="w-full">
            <label for="price" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price (Ksh)</label>
            <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="3000" required="">
          </div>
          <div>
            <label for="item-stock" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Stock/Quantity</label>
            <input type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10" required="">
          </div>
          <div class="sm:col-span-2">
            <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="description" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
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
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">Selected Files:</h3>
            <ul>
              <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</li>
            </ul>
          </div>
          <div class="mt-4 sm:mt-6">
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </div>
        </div>
      </form>
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
    
</style>