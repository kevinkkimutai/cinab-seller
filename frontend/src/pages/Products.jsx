import React from 'react'

export default function Products() {
  return (
       
    <div class="w-full h-full max-h-full overflow-y-auto">
        <div class="title text-center">
            <h3 class="text-black dark:text-white font-bold text-md md:text-3xl underline pb-3">List Of All Products</h3>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4  gap-2 mx-auto custom-grid">

            <div
                class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div id="gallery" class="relative w-full" data-carousel="slide">
    {/* <!-- Carousel wrapper --> */}
    <div class="relative h-56 overflow-hidden rounded-lg">
         {/* <!-- Item 1 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 2 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 3 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 4 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 5 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
    </div>
    {/* <!-- Slider controls --> */}
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
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
                <div id="gallery" class="relative w-full" data-carousel="slide">
    {/* <!-- Carousel wrapper --> */}
    <div class="relative h-56 overflow-hidden rounded-lg">
         {/* <!-- Item 1 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 2 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 3 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 4 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 5 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
    </div>
    {/* <!-- Slider controls --> */}
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
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
                <div id="gallery" class="relative w-full" data-carousel="slide">
    {/* <!-- Carousel wrapper --> */}
    <div class="relative h-56 overflow-hidden rounded-lg">
         {/* <!-- Item 1 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 2 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 3 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 4 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 5 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
    </div>
    {/* <!-- Slider controls --> */}
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
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
                <div id="gallery" class="relative w-full" data-carousel="slide">
    {/* <!-- Carousel wrapper --> */}
    <div class="relative h-56 overflow-hidden rounded-lg">
         {/* <!-- Item 1 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 2 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 3 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 4 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 5 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
    </div>
    {/* <!-- Slider controls --> */}
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
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
                <div id="gallery" class="relative w-full" data-carousel="slide">
    {/* <!-- Carousel wrapper --> */}
    <div class="relative h-56 overflow-hidden rounded-lg">
         {/* <!-- Item 1 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 2 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 3 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 4 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        {/* <!-- Item 5 --> */}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
    </div>
    {/* <!-- Slider controls --> */}
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
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


{/* <!-- Main modal --> */}
<div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden md:pt-12 md:ml-24 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
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
            {/* <!-- Modal body --> */}
            <form >
        <div class="grid gap-2 sm:grid-cols-2 sm:gap-6 p-4">
          <div class="sm:col-span-2">
            <label for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text" name="name" id="name" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type product name" required=""/>
          </div>
          <div class="w-full">
            <label for="brand" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
            <input type="text" name="brand" id="brand" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product brand" required=""/>
          </div>
          <div>
            <label for="category" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id="category" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option >Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div class="w-full">
            <label for="price" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price (Ksh)</label>
            <input type="number" name="price" id="price" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3000" required="" />
          </div>
          <div>
            <label for="item-stock" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Stock/Quantity</label>
            <input type="number" name="item-weight" id="item-weight" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required=""/>
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
          
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, or JPEG files (Max. 5MB each)</p>
          </div>
          {/* <!-- Display selected files --> */}
          <div v-if="selectedFiles.length > 0">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-1">Selected Files:</h3>
            <ul>
              <li v-for="(file, index) in selectedFiles" >file</li>
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
  )
}
