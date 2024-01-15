<?php

// ************************************ ADMIN PANEL **********************************************

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'adminlocalize'], function () {

    Route::prefix('admin')->group(function () {

        //------------ AUTH ------------
        Route::get('/login', 'Auth\Back\LoginController@showForm')->name('back.login');
        Route::post('/login-submit', 'Auth\Back\LoginController@login')->name('back.login.submit');
        Route::get('/logout', 'Auth\Back\LoginController@logout')->name('back.logout');

        //------------ FORGOT ------------
        Route::get('/forgot', 'Auth\Back\ForgotController@showForm')->name('back.forgot');
        Route::post('/forgot-submit', 'Auth\Back\ForgotController@forgot')->name('back.forgot.submit');
        Route::get('/change-password/{token}', 'Auth\Back\ForgotController@showChangePassForm')->name('back.change.token');
        Route::post('/change-password-submit', 'Auth\Back\ForgotController@changepass')->name('back.change.password');

        //------------ DASHBOARD & PROFILE ------------
        Route::get('/', 'Back\AccountController@index')->name('back.dashboard');
        Route::get('/profile', 'Back\AccountController@profileForm')->name('back.profile');
        Route::post('/profile/update', 'Back\AccountController@updateProfile')->name('back.profile.update');
        Route::get('/password', 'Back\AccountController@passwordResetForm')->name('back.password');
        Route::post('/password/update', 'Back\AccountController@updatePassword')->name('back.password.update');

        Route::get('bulk/deletes', 'Back\BulkDeleteController@bulkDelete')->name('back.bulk.delete');


        Route::group(['middleware' => 'permissions:Manage Orders'], function () {
            //------------ ORDER ------------
            Route::get('orders', 'Back\OrderController@index')->name('back.order.index');
            Route::delete('/order/delete/{id}', 'Back\OrderController@delete')->name('back.order.delete');
            Route::get('/order/print/{id}', 'Back\OrderController@printOrder')->name('back.order.print');
            Route::get('/order/invoice/{id}', 'Back\OrderController@invoice')->name('back.order.invoice');
            Route::get('/order/status/{id}/{field}/{value}', 'Back\OrderController@status')->name('back.order.status');
        });



        //------------ NOTIFICATIONS ------------
        Route::get('/notifications', 'Back\NotificationController@notifications')->name('back.notifications');
        Route::get('/notifications/view', 'Back\NotificationController@view_notification')->name('back.view.notification');
        Route::get('/notification/delete/{id}', 'Back\NotificationController@delete')->name('back.notification.delete');
        Route::get('/notifications/clear', 'Back\NotificationController@clear_notf')->name('back.notifications.clear');



        Route::group(['middleware' => 'permissions:Manage Products'], function () {

            //------------ ITEM ------------

            Route::get('item/add', 'Back\ItemController@add')->name('back.item.add');
            Route::get('item/status/{item}/{status}', 'Back\ItemController@status')->name('back.item.status');
            Route::get('get/subcategory', 'Back\ItemController@getsubCategory')->name('back.get.subcategory');
            Route::get('get/childcategory', 'Back\ItemController@getChildCategory')->name('back.get.childcategory');
            Route::get('stock/out/product', 'Back\ItemController@stockOut')->name('back.item.stock.out');
            Route::resource('item', 'Back\ItemController', ['as' => 'back', 'except' => 'show', 'getsubCategory']);
            Route::get('item/highlight/{item}', 'Back\ItemController@highlight')->name('back.item.highlight');
            Route::post('item/highlight/update/{item}', 'Back\ItemController@highlight_update')->name('back.item.highlight.update');
            Route::get('item/galleries/{item}', 'Back\ItemController@galleries')->name('back.item.gallery');
            Route::post('item/galleries/update', 'Back\ItemController@galleriesUpdate')->name('back.item.galleries.update');
            Route::delete('item/gallery/{gallery}/delete', 'Back\ItemController@galleryDelete')->name('back.item.gallery.delete');

            // Bulk product upload
            Route::get('/product/csv/export', 'Back\CsvProductController@export')->name('back.csv.export');
            Route::get('bulk/product/index', 'Back\CsvProductController@index')->name('back.bulk.product.index');
            Route::post('csv/import', 'Back\CsvProductController@import')->name('back.csv.import');
            Route::get('transaction/csv/export', 'Back\CsvProductController@transactionExport')->name('back.csv.transaction.export');
            Route::get('order/csv/export', 'Back\CsvProductController@orderExport')->name('back.csv.order.export');


            // Campain offer.
            Route::resource('/campaign', 'Back\CampaignController', ['as' => 'back', 'except' => 'show']);
            Route::get('campaign/status/{id}/{status}/{type}', 'Back\CampaignController@status')->name('back.campaign.status');

            // --------- DIGITAL PRODUCT -----------//
            Route::get('/digital/create', 'Back\ItemController@deigitalItemCreate')->name('back.digital.item.create');
            Route::post('/digital/store', 'Back\ItemController@deigitalItemStore')->name('back.digital.item.store');
            Route::get('/digital/edit/{id}', 'Back\ItemController@deigitalItemEdit')->name('back.digital.item.edit');

            // --------- LICENSE PRODUCT -----------//
            Route::get('/license/create', 'Back\ItemController@licenseItemCreate')->name('back.license.item.create');
            Route::post('/license/store', 'Back\ItemController@licenseItemStore')->name('back.license.item.store');
            Route::get('/license/edit/{id}', 'Back\ItemController@licenseItemEdit')->name('back.license.item.edit');

            // ----------- AFFILIATE PRODUCT -----------//
            Route::resource('affiliate', 'Back\AffiliateController', ['as' => 'back']);
            // ----------- AFFILIATE PRODUCT -----------//



            Route::prefix('{item}')->group(function () {
                //------------ ATTRIBUTE ------------
                Route::resource('attribute', 'Back\AttributeController', ['as' => 'back', 'except' => 'show']);
                //------------ ATTRIBUTE OPTION ------------
                Route::resource('option', 'Back\AttributeOptionController', ['as' => 'back', 'except' => 'show']);
            });



            //------------ BRAND ------------
            Route::get('brand/status/{id}/{status}/{type}', 'Back\BrandController@status')->name('back.brand.status');
            Route::resource('brand', 'Back\BrandController', ['as' => 'back', 'except' => 'show']);

            //------------ REVIEW ----------------//
            Route::get('review/status/{id}/{status}', 'Back\ReviewController@status')->name('back.review.status');
            Route::resource('review', 'Back\ReviewController', ['as' => 'back', 'except' => ['create', 'store', 'edit', 'update']]);
        });


        Route::group(['middleware' => 'permissions:Manage Categories'], function () {
            //------------ CATEGORY ------------
            Route::get('category/status/{id}/{status}', 'Back\CategoryController@status')->name('back.category.status');
            Route::get('category/feature/{id}/{status}', 'Back\CategoryController@feature')->name('back.category.feature');
            Route::resource('category', 'Back\CategoryController', ['as' => 'back', 'except' => 'show']);

            //------------ SUB CATEGORY ------------
            Route::get('subcategory/status/{id}/{status}', 'Back\SubCategoryController@status')->name('back.subcategory.status');
            Route::resource('subcategory', 'Back\SubCategoryController', ['as' => 'back', 'except' => 'show']);

            //------------ CHILD CATEGORY ------------
            Route::get('childcategory/status/{id}/{status}', 'Back\ChieldCategoryController@status')->name('back.childcategory.status');
            Route::resource('childcategory', 'Back\ChieldCategoryController', ['as' => 'back', 'except' => 'show']);
        });


        Route::group(['middleware' => 'permissions:Customer List'], function () {
            //------------ USER ------------
            Route::resource('user', 'Back\UserController', ['as' => 'back', 'except' => ['create', 'store', 'edit']]);
        });

        Route::group(['middleware' => 'permissions:Ecommerce'], function () {
            //------------ PROMO CODE ------------
            Route::get('code/status/{id}/{status}', 'Back\PromoCodeController@status')->name('back.code.status');
            Route::resource('code', 'Back\PromoCodeController', ['as' => 'back', 'except' => 'show']);

            //------------ TAX SETTING ------------
            Route::get('tax/status/{id}/{status}', 'Back\TaxController@status')->name('back.tax.status');
            Route::resource('tax', 'Back\TaxController', ['as' => 'back', 'except' => 'show']);

            Route::get('state/status/{id}/{status}', 'Back\StateController@status')->name('back.state.status');
            Route::resource('state', 'Back\StateController', ['as' => 'back', 'except' => 'show']);

            //------------ SHIPPING SERVICE ------------
            Route::get('shipping/status/{id}/{status}', 'Back\ShippingServiceController@status')->name('back.shipping.status');
            Route::resource('shipping', 'Back\ShippingServiceController', ['as' => 'back', 'except' => 'show']);

            //------------ CURRENCY ------------
            Route::get('currency/status/{id}/{status}', 'Back\CurrencyController@status')->name('back.currency.status');
            Route::resource('currency', 'Back\CurrencyController', ['as' => 'back', 'except' => 'show']);

            //------------ PAYMENT SETTING ------------
            Route::get('/setting/payment', 'Back\PaymentSettingController@payment')->name('back.setting.payment');
            Route::post('/setting/payment/update', 'Back\PaymentSettingController@update')->name('back.setting.payment.update');
        });

        Route::group(['middleware' => 'permissions:System Backup'], function () {

            // -------------- SYSTEM BACKUP ---------------//
            Route::get('system/backup', 'Back\BackupController@systemBackup')->name('back.system.backup');
            Route::get('database/backup', 'Back\BackupController@databaseBackup')->name('back.database.backup');
        });


        Route::group(['middleware' => 'permissions:Manages Tickets'], function () {
            //------------ TICKET ------------
            Route::resource('ticket', 'Back\TicketController', ['as' => 'back', 'except' => 'show']);
            Route::get('ticket/status/{id}', 'Back\TicketController@status')->name('back.ticket.status');
        });

        Route::group(['middleware' => 'permissions:Manage Blogs'], function () {
            //------------ CATEGORY ------------
            Route::get('bcategory/status/{id}/{status}', 'Back\BcategoryController@status')->name('back.bcategory.status');
            Route::resource('bcategory', 'Back\BcategoryController', ['as' => 'back', 'except' => 'show']);

            //------------ POST ------------
            Route::resource('post', 'Back\PostController', ['as' => 'back', 'except' => 'show']);
            Route::delete('post/delete/{key}/{id}', 'Back\PostController@delete')->name('back.post.photo.delete');
        });


        Route::group(['middleware' => 'permissions:Transactions'], function () {
            //------------ TRANSACTION ----------------//
            Route::get('/transactions', 'Back\TranactionController@index')->name('back.transaction.index');
            Route::delete('/transaction/delete/{id}', 'Back\TranactionController@delete')->name('back.transaction.delete');
        });

        Route::group(['middleware' => 'permissions:Manage Faqs Contents'], function () {

            //------------ FAQ CATEGORY ------------
            Route::get('faq-category/status/{id}/{status}', 'Back\FcategoryController@status')->name('back.fcategory.status');
            Route::resource('fcategory', 'Back\FcategoryController', ['as' => 'back', 'except' => 'show']);

            //------------ FAQ ------------
            Route::resource('faq', 'Back\FaqController', ['as' => 'back', 'except' => 'show']);
        });

        Route::group(['middleware' => 'permissions:Manage System User'], function () {

            //------------ ROLE ------------
            Route::resource('role', 'Back\RoleController', ['as' => 'back', 'except' => 'show']);

            //------------ STAFF ------------
            Route::resource('staff', 'Back\StaffController', ['as' => 'back', 'except' => 'show']);
        });

        Route::group(['middleware' => 'permissions:Manages Pages'], function () {

            //------------ PAGE ------------
            Route::get('page/pos/{id}/{pos}', 'Back\PageController@pos')->name('back.page.pos');
            Route::resource('page', 'Back\PageController', ['as' => 'back', 'except' => 'show']);
        });


        Route::group(['middleware' => 'permissions:Manage Site'], function () {

            //------------ SOCIAL ------------
            Route::resource('social', 'Back\SocialController', ['as' => 'back', 'except' => 'show']);

            //------------ FEATURE ------------
            Route::get('feature/image', 'Back\FeatureController@featureImage')->name('back.feature.image');
            Route::resource('feature', 'Back\FeatureController', ['as' => 'back', 'except' => 'show']);

            //------------ SETTING ------------
            Route::get('/setting/menu', 'Back\SettingController@menu')->name('back.setting.menu');
            Route::get('/setting/social', 'Back\SettingController@social')->name('back.setting.social');
            Route::get('/setting/system', 'Back\SettingController@system')->name('back.setting.system');
            Route::post('/setting/update', 'Back\SettingController@update')->name('back.setting.update');
            Route::post('/setting/update/visiable', 'Back\SettingController@visiable')->name('back.setting.visible.update');
            Route::get('/announcement', 'Back\SettingController@announcement')->name('back.subscribers.announcement');
            Route::get('/cookie/alert', 'Back\SettingController@cookie')->name('back.cookie.alert');
            Route::get('/maintainance', 'Back\SettingController@maintainance')->name('back.setting.maintainance');

            //   Home Page Customizations
            Route::get('home-page', 'Back\HomePageController@index')->name('back.homePage');
            Route::post('home-page/hero/banner/update', 'Back\HomePageController@hero_banner_update')->name('back.hero.banner.update');
            Route::post('home-page/first/banner/update', 'Back\HomePageController@first_banner_update')->name('back.first.banner.update');
            Route::post('home-page/secend/banner/update', 'Back\HomePageController@secend_banner_update')->name('back.secend.banner.update');
            Route::post('home-page/third/banner/update', 'Back\HomePageController@third_banner_update')->name('back.third.banner.update');
            Route::post('home-page/popular/category/update', 'Back\HomePageController@popular_category_update')->name('back.popular.category.update');
            Route::post('home-page/tree/cloumn/category/update', 'Back\HomePageController@tree_column_category_update')->name('back.tree.column.category.update');
            Route::post('home-page/feature/category/category/update', 'Back\HomePageController@feature_category_update')->name('back.feature.category.update');
            Route::post('home-page4/banner/update', 'Back\HomePageController@homepage4update')->name('back.home_page4.banner.update');
            Route::post('home-page4/category/update', 'Back\HomePageController@homepage4categoryupdate')->name('back.home4.category.update');


            //----------- SECTION SETTING -----------//
            Route::get('/setting/section', 'Back\SettingController@section')->name('back.setting.section');
            //------------ EMAIL TEMPLATE ------------
            Route::get('/setting/email', 'Back\EmailSettingController@email')->name('back.setting.email');
            Route::post('/setting/email/update', 'Back\EmailSettingController@emailUpdate')->name('back.email.update');
            Route::get('email/template/{template}/edit', 'Back\EmailSettingController@edit')->name('back.template.edit');
            Route::put('email/template/update/{template}', 'Back\EmailSettingController@update')->name('back.template.update');

            // ----------- SMS SETTING ---------------//
            Route::get('/setting/configuration/sms', 'Back\SmsSettingController@sms')->name('back.setting.sms');
            Route::post('/setting/sms/update', 'Back\SmsSettingController@smsUpdate')->name('back.sms.update');
            // ----------- SMS SETTING ---------------//

            //------------ LANGUAGE SETTING ------------
            Route::resource('language', 'Back\LanguageController', ['as' => 'back']);
            Route::get('language/status/{id}/{status}', 'Back\LanguageController@status')->name('back.language.status');

            //------------ SLIDER ------------
            Route::resource('slider', 'Back\SliderController', ['as' => 'back', 'except' => 'show']);

            //------------ SERVICE ------------
            Route::resource('service', 'Back\ServiceController', ['as' => 'back', 'except' => 'show']);


            // --------- Genarate Sitemap _______
            Route::get('/sitemap', 'Back\SitemapController@index')->name('admin.sitemap.index');
            Route::get('/sitemap/add', 'Back\SitemapController@add')->name('admin.sitemap.add');
            Route::post('/sitemap/store', 'Back\SitemapController@store')->name('admin.sitemap.store');
            Route::delete('/sitemap/delete/{id}/', 'Back\SitemapController@delete')->name('admin.sitemap.delete');
            Route::post('/sitemap/download', 'Back\SitemapController@download')->name('admin.sitemap.download');
        });
    });


    Route::group(['middleware' => 'permissions:Subscribers List'], function () {
        //------------ SUBSCRIBER ------------
        Route::get('/subscribers', 'Back\SubscriberController@index')->name('back.subscribers.index');
        Route::delete('/subscriber/delete/{id}', 'Back\SubscriberController@delete')->name('back.subscriber.delete');
        Route::get('/subscribers/send-mail', 'Back\SubscriberController@sendMail')->name('back.subscribers.mail');
        Route::post('/subscribers/send-mail/submit', 'Back\SubscriberController@sendMailSubmit')->name('back.subscribers.mail.submit');
    });
});


// ************************************ ADMIN PANEL ENDS**********************************************


// ************************************ GLOBAL LOCALIZATION **********************************************

Route::group(['middleware' => 'maintainance'], function () {
    Route::group(['middleware' => 'localize'], function () {

        // ************************************ USER PANEL **********************************************

        Route::prefix('user')->group(function () {

            //------------ AUTH ------------
            Route::get('/login', 'Auth\User\LoginController@showForm')->name('user.login');
            Route::post('/login-submit', 'Auth\User\LoginController@login')->name('user.login.submit');
            Route::get('/logout', 'Auth\User\LoginController@logout')->name('user.logout');
            Route::get('/remove/account', 'User\AccountController@removeAccount')->name('user.account.remove');

            //------------ REGISTER ------------
            Route::get('/register', 'Auth\User\RegisterController@showForm')->name('user.register');
            Route::post('/register-submit', 'Auth\User\RegisterController@register')->name('user.register.submit');
            Route::get('/verify-link/{token}', 'Auth\User\RegisterController@verify')->name('user.account.verify');

            //------------ FORGOT ------------
            Route::get('/forgot', 'Auth\User\ForgotController@showForm')->name('user.forgot');
            Route::post('/forgot-submit', 'Auth\User\ForgotController@forgot')->name('user.forgot.submit');
            Route::get('/change-password/{token}', 'Auth\User\ForgotController@showChangePassForm')->name('user.change.token');
            Route::post('/change-password-submit', 'Auth\User\ForgotController@changepass')->name('user.change.password');

            //------------ DASHBOARD ------------
            Route::get('/dashboard', 'User\AccountController@index')->name('user.dashboard');
            Route::get('/profile', 'User\AccountController@profile')->name('user.profile');

            // ----------- TICKET ---------------//
            Route::get('/ticket', 'User\TicketController@ticket')->name('user.ticket');
            Route::get('/ticket/new', 'User\TicketController@ticketNew')->name('user.ticket.create');
            Route::post('/ticket/store', 'User\TicketController@ticketStore')->name('user.ticket.store');
            Route::get('/ticket/view/{id}', 'User\TicketController@ticketView')->name('user.ticket.view');
            Route::post('/ticket/reply/store', 'User\TicketController@ticketReply')->name('user.ticket.reply');
            Route::get('/ticket/delete/{id}', 'User\TicketController@ticketDelete')->name('user.ticket.delete');

            //------------ SETTING ------------
            Route::post('/profile/update', 'User\AccountController@profileUpdate')->name('user.profile.update');
            Route::get('/addresses', 'User\AccountController@addresses')->name('user.address');
            Route::post('/billing/addresses', 'User\AccountController@billingSubmit')->name('user.billing.submit');
            Route::post('/shipping/addresses', 'User\AccountController@shippingSubmit')->name('user.shipping.submit');

            //------------ ORDER ------------
            Route::get('/orders', 'User\OrderController@index')->name('user.order.index');
            Route::get('/order/print/{id}', 'User\OrderController@printOrder')->name('user.order.print');
            Route::get('/order/invoice/{id}', 'User\OrderController@details')->name('user.order.invoice');
            //------------ WISHLIST ------------
            Route::get('/wishlists', 'User\WishlistController@index')->name('user.wishlist.index');
            Route::get('/wishlist/store/{id}', 'User\WishlistController@store')->name('user.wishlist.store');
            Route::get('/wishlist/delete/{id}', 'User\WishlistController@delete')->name('user.wishlist.delete');
            Route::get('/wishlista/delete/all', 'User\WishlistController@alldelete')->name('user.wishlist.delete.all');
        });


        Route::get('auth/{provider}', 'User\SocialLoginController@redirectToProvider')->name('social.provider');
        Route::get('auth/{provider}/callback', 'User\SocialLoginController@handleProviderCallback');

        // ************************************ USER PANEL ENDS**********************************************





        // ************************************ FRONTEND **********************************************

        //------------ FRONT ------------
        Route::get('/', 'Front\FrontendController@index')->name('front.index');
        Route::get('/extra-index', 'Front\FrontendController@extraIndex')->name('front.extraindex');
        Route::get('/product/{slug}', 'Front\FrontendController@product')->name('front.product');
        Route::get('/campaign/products', 'Front\FrontendController@compaignProduct')->name('front.campaign');
        Route::get('/blog', 'Front\FrontendController@blog')->name('front.blog');
        Route::get('/brands', 'Front\FrontendController@brands')->name('front.brand');
        Route::get('/blog/{slug}', 'Front\FrontendController@blogDetails')->name('front.blog.details');
        Route::get('/faq', 'Front\FrontendController@faq')->name('front.faq');
        Route::get('/faq/{slug}', 'Front\FrontendController@show')->name('front.faq.details');
        Route::get('/contact', 'Front\FrontendController@contact')->name('front.contact');
        Route::post('/contact/submit', 'Front\FrontendController@contactEmail')->name('front.contact.submit');
        Route::get('/reviews', 'Front\FrontendController@reviews')->name('front.reviews');
        Route::get('/review/page', 'Front\FrontendController@review_submit')->name('front.rev.page');
        Route::get('/review/sub', 'Front\FrontendController@slider_o_update')->name('front.rev.subbmit');
        Route::get('/top-reviews', 'Front\FrontendController@topReviews')->name('front.top.reviews');
        Route::post('/review/submit', 'Front\FrontendController@reviewSubmit')->name('front.review.submit');
        Route::post('/subscriber/submit', 'Front\FrontendController@subscribeSubmit')->name('front.subscriber.submit');
        Route::get('set/currency/{id}', 'Front\FrontendController@currency')->name('front.currency.setup');
        Route::get('set/language/{id}', 'Front\FrontendController@language')->name('front.language.setup');

        // ---------- EXTRA INDEX ROUTE ----------//
        Route::get('popular/category/get/{slug}/{type}/{check}', 'Front\HomeCustomizeController@CategoryGet')->name('front.popular.category');
        Route::get('product/get/type/{type}', 'Front\HomeCustomizeController@productGet')->name('front.get.product');
        //------------ COMPARE PRODUCT ------------//

        Route::get('compare/product/{id}', 'Front\CompareController@compare')->name('fornt.compare.product');
        Route::get('compare/remove/{id}', 'Front\CompareController@compareRemove')->name('front.compare.remove');
        Route::get('compare/products/', 'Front\CompareController@compare_product')->name('fornt.compare.index');

        //------------ CART ------------
        Route::get('/cart', 'Front\CartController@index')->name('front.cart');
        Route::get('/front/cart/clear', 'Front\CartController@cartClear')->name('front.cart.clear');
        Route::get('/header/cart/load', 'Front\CartController@headerCartLoad')->name('front.header.cart');
        Route::get('/main/cart/load', 'Front\CartController@CartLoad')->name('cart.get.load');
        Route::post('/cart/submit', 'Front\CartController@store')->name('front.cart.submit');
        Route::get('product/add/cart', 'Front\CartController@addToCart')->name('product.addcart');
        Route::get('/product/cart/update/{id}', 'Front\CartController@update')->name('product.update.single');

        Route::post('/promo/submit', 'Front\CartController@promoStore')->name('front.promo.submit');
        Route::get('/cart/destroy/{id}', 'Front\CartController@destroy')->name('front.cart.destroy');
        Route::post('/shipping/submit', 'Front\CartController@shippingStore')->name('front.shipping.submit');
        Route::post('/shipping/charge/get', 'Front\CartController@shippingCharge')->name('front.shipping.charge');

        //------------ CATALOG ------------
        Route::get('/catalog', 'Front\CatalogController@index')->name('front.catalog');
        Route::get('/search/suggest', 'Front\CatalogController@suggestSearch')->name('front.search.suggest');
        Route::get('/catalog/view/{type}', 'Front\CatalogController@viewType')->name('front.catalog.view');


        //------------ CHECKOUT ------------
        Route::get('/checkout/billing/address', 'Front\CheckoutController@ship_address')->name('front.checkout.billing');
        Route::post('/checkout/billing/store', 'Front\CheckoutController@billingStore')->name('front.checkout.store');
        Route::get('/checkout/shpping/address', 'Front\CheckoutController@shipping')->name('front.checkout.shipping');
        Route::post('/checkout/shpping/store', 'Front\CheckoutController@shippingStore')->name('front.checkout.shipping.store');
        Route::get('/checkout/review/payment', 'Front\CheckoutController@payment')->name('front.checkout.payment');
        Route::get('/checkout/state/setup/{state_id}', 'Front\CheckoutController@stateSetUp')->name('front.state.setup');
        Route::post('/checkout-submit', 'Front\CheckoutController@checkout')->name('front.checkout.submit');
        Route::get('/checkout/success', 'Front\CheckoutController@paymentSuccess')->name('front.checkout.success');
        Route::get('/checkout/cancle', 'Front\CheckoutController@paymentCancle')->name('front.checkout.cancle');
        Route::get('/paypal/checkout/redirect', 'Front\CheckoutController@paymentRedirect')->name('front.checkout.redirect');
        Route::get('/checkout/mollie/notify', 'Front\CheckoutController@mollieRedirect')->name('front.checkout.mollie.redirect');
        Route::post('/paytm/notify', 'Payment\PaytmController@notify')->name('front.paytm.notify');
        Route::post('/paytm/submit', 'Payment\PaytmController@store')->name('front.paytm.submit');
        Route::post('/razorpay/notify', 'Payment\RazorpayController@notify')->name('front.razorpay.notify');
        Route::post('/razorpay/submit', 'Payment\RazorpayController@store')->name('front.razorpay.submit');
        Route::post('/flutterwave/notify', 'Payment\FlutterwaveController@notify')->name('front.flutterwave.notify');
        Route::post('/flutterwave/submit', 'Payment\FlutterwaveController@store')->name('front.flutterwave.submit');
        Route::post('/mercadopago/submit', 'Payment\MercadopagoController@store')->name('front.mercadopago.submit');
        Route::post('/authorize/submit', 'Payment\AuthorizeController@store')->name('front.authorize.submit');

        Route::post('/sslcommerz/notify', 'Payment\SslCommerzController@notify')->name('front.sslcommerz.notify');
        Route::post('/sslcommerz/submit', 'Payment\SslCommerzController@store')->name('front.sslcommerz.submit');

        // ----------- TRACK ORDER ----------//
        Route::get('/track/order', 'Front\FrontendController@trackOrder')->name('front.order.track');
        Route::get('/order/track/submit', 'Front\FrontendController@track')->name('front.order.track.submit');

        Route::get('/cache/clear', function () {
            Artisan::call('cache:clear');
            Artisan::call('config:clear');
            Artisan::call('route:clear');
            Artisan::call('view:clear');
            return redirect()->route('back.dashboard')->withSuccess(__('System Cache Has Been Removed.'));
        })->name('front.cache.clear');

        //------------ PAGE ------------
        Route::get('/{slug}', 'Front\FrontendController@page')->name('front.page');

        // ************************************ FRONTEND ENDS**********************************************

        // ************************************ GLOBAL LOCALIZATION ENDS **********************************************

    });
});
Route::get('/website/maintainance', 'Front\FrontendController@maintainance')->name('front.maintainance');
