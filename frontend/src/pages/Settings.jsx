import React from "react";


export default function Settings () {
    return(
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col md:flex-row">
                    {/* Leftmost column */}
                    <div class="md:w-1/3 flex items-center justify-center">
                        <img class="w-50 h-50 mb-3 rounded-full pt-2 pb-2"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                            alt="Profile"/>
                    </div>

                    {/* Center column */}
                    <div class="md:w-1/3 mx-2 my-4">
                    <div class="bg-gray-100 p-4 rounded-lg mb-4">
                        <p class="text-sm font-medium text-gray-700">Username:</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white">[Username Prop]</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <p class="text-sm font-medium text-gray-700">Email:</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white">[Email Prop]</p>
                    </div>
                    </div>

                    {/*  Rightmost column */}
                    <div class="md:w-1/3 mx-2 my-4">
                    <div class="bg-gray-100 p-4 rounded-lg mb-4">
                        <p class="text-sm font-medium text-gray-700">Phone No:</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white">[Phone Prop]</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <p class="text-sm font-medium text-gray-700">Business Type:</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white">[Business-type Prop]</p>
                    </div>
                    </div>
                </div>
            </div>

            <div class="w-full border-b border-gray-200 dark:border-gray-700">
                <ul class="w-full flex flex-wrap -mb-px text-lg font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                    <li class="me-2 flex-grow" role="presentation">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg" id="user-profile-tab" data-tabs-target="#user-profile" type="button" role="tab" aria-controls="user-profile" aria-selected="false"> User Profile</button>
                    </li>
                    <li class="me-2 flex-grow" role="presentation">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="business-info-tab" data-tabs-target="#business-info" type="button" role="tab" aria-controls="business-info" aria-selected="false">Business Information</button>
                    </li>
                    <li class="me-2 flex-grow" role="presentation">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="payment-info-tab" data-tabs-target="#payment-info" type="button" role="tab" aria-controls="payment-info" aria-selected="false">Payment Details</button>
                    </li>
                    <li class="me-2 flex-grow" role="presentation">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="shipping-info-tab" data-tabs-target="#shipping-info" type="button" role="tab" aria-controls="shipping-info" aria-selected="false">Shipping Information</button>
                    </li>
                    <li class="me-2 flex-grow" role="presentation">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="shopping-info-tab" data-tabs-target="#shopping-info" type="button" role="tab" aria-controls="shpping-info" aria-selected="false">Shopping Information</button>
                    </li>
                </ul>
            </div>
            <div id="default-tab-content">
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="user-profile" role="tabpanel" aria-labelledby="user-profile-tab">
                    <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">User Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                {/* <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="business-info" role="tabpanel" aria-labelledby="business-info-tab">
                    <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Business-Info tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div> */}
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="business-info" role="tabpanel" aria-labelledby="business-info-tab">
                    <div class="text-center">
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Business Information</h2>

                        <div class="mb-4">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Company Name:</label>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">[companyName Value]</p>
                        </div>

                        <div class="mb-4">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-400">KRA:</label>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">[Kra Value]</p>
                        </div>

                        <div class="mb-4">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-400">License:</label>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">[licence Value]</p>
                        </div>

                        <div class="mb-4">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Address:</label>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">[AddressOne Value]</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">[AddressTwo Value]</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">[city, state Value]</p>
                        </div>

                        <div class="mb-4">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Website:</label>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">[Website name]</p>
                        </div>

                        <div>
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Services:</label>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">[services Value]</p>
                        </div>
                    </div>
                </div>
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="payment-info" role="tabpanel" aria-labelledby="payment-info-tab">
                    <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Payment-Info tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="shipping-info" role="tabpanel" aria-labelledby="shipping-info-tab">
                    <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Shipping-Info tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="shopping-info" role="tabpanel" aria-labelledby="shopping-info-tab">
                    <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Shopping Info tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
            </div>

        </div>
    )
}