import React from 'react'

export default function DashboardPanels() {
  return (
    <div class="grid gap-4">

  
    <div class="grid md:grid-cols-4 grid-cols-2 gap-4">

<a href="/inventory">
      <div class="max-w-sm max-h-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
        <div class="flex-1 flex items-center justify-center bg-purple">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-10 h-10">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

        </div>
        <div class="flex-1 p-4">
          <div>
            <span class="text-lg font-bold">10</span>
          </div>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">Inventory</p>
        </div>
      </div>
    </a>

    <a href="/offers">
      <div class="max-w-sm max-h-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
        <div class="flex-1 flex items-center justify-center bg-orange">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

        </div>
        <div class="flex-1 p-4">
          <div>
            <span class="text-lg font-bold">10</span>
          </div>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">Offers</p>
        </div>
      </div>
    </a>


    <a href="/orders">
      <div class="max-w-sm max-h-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
        <div class="flex-1 flex items-center justify-center bg-blue">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

        </div>
        <div class="flex-1 p-4">
          <div>
            <span class="text-lg font-bold">10</span>
          </div>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">Orders</p>
        </div>
      </div>
    </a>

      <div class="max-w-sm max-h-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
        <div class="flex-1 flex items-center justify-center bg-green">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

        </div>
        <div class="flex-1 p-4">
          <div>
            <span class="text-lg font-bold">10</span>
          </div>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">Products</p>
        </div>
      </div>

    </div>
  </div>
  )
}
