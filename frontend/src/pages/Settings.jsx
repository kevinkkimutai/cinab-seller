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
                        <p class="text-sm font-medium text-gray-700">Company name:</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white">[Company name Prop]</p>
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
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="business-info" role="tabpanel" aria-labelledby="business-info-tab">
                    {/* Business iNFO div */}
                    <form class="p-2">
                        <div class="py-5">
                            <h1 class="text-semibold text-gray-700 dark:text-gray-50 text-xl">Business Information</h1>
                            <p class="mt-1 text-sm text-gray-800 dark:text-gray-50" id="user_avatar_help">Please provide the following details:</p>
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-7 ">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                                <input type="text" id="name" name="companyName" value="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cinab" required />
                            </div>
                            <div>
                                <label for="Kra_Pin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">KRA PIN</label>
                                <input type="text" name="Kra" value="" id="Kra_Pin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CR07115544O7KE" required />
                            </div>
                            <div>
                                <label for="licence" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trading license No. (optional)</label>
                                <input type="text" id="licence" name="licence" value="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="KBLC254" />
                            </div>
                            <div>
                                <label for="addressOne" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 1</label>
                                <input type="address_line_one" id="addressOne" name="AddressOne" value="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PO BOX. 50-20245" />
                            </div>
                            <div>
                                <label for="AddressTwo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 2</label>
                                <input type="address_line_two" id="AddressTwo" name="AddressTwo" value="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Eastleigh Ibgaro Plaza 1 Building" required />
                            </div>
                            <div>
                                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City/Town</label>
                                <input type="city" id="city" name="city" value="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nairobi" required />
                            </div>
                            <div>
                                <label for="state" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State/Region</label>
                                <input type="state" id="state" value="" name="state" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="state" required />
                            </div>
                            <div>
                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                                <input type="url" id="website" name="website" value="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="cinab.co.ke" required />
                            </div>
                            <div>
                            <label for="services" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">General details of service/Goods</label>
                                <input type="textarea" id="services" name="services" value="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-Commerce Company" required />
                            </div>
                        </div>
                    </form>
                </div> 

                {/* Payment Details */}
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="payment-info" role="tabpanel" aria-labelledby="payment-info-tab">
                    <div className="py-5">
                        <h1 className="text-semibold text-gray-700 dark:text-gray-50 text-xl">
                            Preferred payment option:
                        </h1>
                        <p
                        className="mt-1 text-sm text-gray-800 dark:text-gray-50"
                        id="user_avatar_help"
                        >
                            Select the payment method, if applicable, of your choice, and ensure to provide all required details. We'll review the validity of your documents upon submission.
                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="border-b border-gray-300 mb-4">
                            <h2 className="text-gray-500 font-medium dark:text-gray-50">
                                Bank Account Details
                            </h2>
                        </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2  gap-4 gap-y-7 ">
                        <div>
                            <label
                            htmlFor="AccountNumber"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Bank Account Number{" "}
                            </label>
                            <input
                            type="text"
                            id="AccountNumber"
                            min="0"
                            name="AccountNumber"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            laceholder="02275656597565"
                            required 
                            />
                        </div>
                        <div>
                            <label
                            htmlFor="BankName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Bank Name{" "}
                            </label>
                            <input
                            type="text"
                            id="BankName"
                            name="BankName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Equity"
                            required
                            />
                        </div>
                    </div>
                    <div className="border-b border-gray-300 mb-4 mt-4 md:mt-11">
                        <h2 className="text-gray-500 font-medium dark:text-gray-50">
                            Mpesa Details
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2  gap-4 gap-y-7 ">
                        <div>
                            <label
                            htmlFor="MpesaNumber"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                            MPesa Number{" "}
                            </label>
                            <input
                            type="number"
                            min="0"
                            max="9999999999999"
                            id="MpesaNumber"
                            name="MpesaNumber"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="+254782588855"
                            required
                            />
                        </div>
                        <div>
                            <label
                            htmlFor="MpesaName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                            Full Mpesa Name{" "}
                            </label>
                            <input
                            type="text"
                            id="MpesaName"
                            name="MpesaName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John Doe"
                            required
                            />
                        </div>
                    </div>
                </div>
                    <div className="flex justify-between py-6">
                        <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                        Submit{" "}
                        </button>
                    </div>
                </div>
                {/* Shipping iNFO */}
                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="shipping-info" role="tabpanel" aria-labelledby="shipping-info-tab">
                    <form className="p-2">
                        <div className="py-5">
                            <h1 className="text-semibold text-gray-700 dark:text-gray-50 text-xl">
                                Shipping Address{" "}
                            </h1>
                            <p
                            className="mt-1 text-sm text-gray-800 dark:text-gray-50"
                            id="user_avatar_help"
                            >
                                Please provide the address you prefer to ship your products{" "}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-7 ">
                        {/* Your form input fields go here */}
                        </div>
                        <div className="flex justify-between py-6">
                        <button
                            type="button"
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Submit{" "}
                        </button>
                        </div>
                    </form>
                </div>


                <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="shopping-info" role="tabpanel" aria-labelledby="shopping-info-tab">
                    <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Shopping Info tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
            </div>
        </div>
    )
}