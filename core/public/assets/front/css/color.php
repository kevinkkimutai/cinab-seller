<?php
    header("Content-type: text/css; charset: UTF-8");
    if(isset($_GET['primary_color']))
    {
     $color = '#'.$_GET['primary_color'];
    }
    else {
    $color = '#124a98';
    }
?>

.left-category-area .category-header h4,
.section-title h2::before,
.product-card .countdown span,
.flash-deal-slider.owl-carousel .owl-nav div:hover,
.features-slider.owl-carousel .owl-nav div:hover,
.newproduct-slider.owl-carousel .owl-nav div:hover,
.bestseller-slider.owl-carousel .owl-nav div:hover,
.toprated-slider.owl-carousel .owl-nav div:hover,
.pagination li a:hover, .pagination li span:hover,
.pagination li.active span, .pagination li.active a,
.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active,
.u-d-d i,
.details-page-top-right-content .countdown span,
.mm-heading-area,
.section-title .links a::before,
.flash-sell-area.theme2 .product-card .countdown,
.menu-top-area,
.product-card .product-button-group .product-button,
.deal-of-day-section .countdown,
.bestseller-slider.owl-carousel .owl-nav div:hover, 
.brand-slider.owl-carousel .owl-nav div:hover, 
.features-slider.owl-carousel .owl-nav div:hover, 
.flash-deal-slider.owl-carousel .owl-nav div:hover, 
.home-blog-slider.owl-carousel .owl-nav div:hover, 
.newproduct-slider.owl-carousel .owl-nav div:hover, 
.popular-category-slider.owl-carousel .owl-nav div:hover, 
.toprated-slider.owl-carousel .owl-nav div:hover,
.btn,
.footer-social-links a,
.a2a_kit a
{
    background : <?php echo $color?>  !important;
}

.site-header .toolbar .toolbar-item > a > div > .compare-icon > .count-label, .site-header .toolbar .toolbar-item > a > div > .cart-icon > .count-label,
.btn-primary,
.hero-slider > .owl-carousel.dots-inside .owl-dots .owl-dot,
.widget-title::after,
.scroll-to-top-btn:hover,
a.list-group-item::before, .list-group-item-action::before
{
    background-color : <?php echo $color?> !important;
}



.hero-slider .owl-carousel .owl-nav div,
.left-category-area .category-list .navi-link:hover span.text-gray-dark,
.site-header .navbar .nav-inner .right-info i,
.h-t-social-area ul li a:hover,
.menu-top-area .login-register:hover,
.t-h-dropdown a:hover,
.t-h-dropdown a.active,
.product-card .product-price,
.genius-banner .content .content-inner p,
.navi-link:hover,
.site-header .site-menu > ul > li:hover > a,
.widget-categories ul > li.active > a,
.widget-links ul > li.active > a,
.details-page-top-right-content  a,
.widget-categories ul > li > a:hover,
.widget-links ul > li > a:hover,
.product-card .product-title > a:hover,
.product-card .product-category > a:hover,
.nav-tabs .nav-link:hover,
.post-title > a:hover,
.post-meta > li > a:hover,
.widget-featured-posts > .entry .entry-title > a:hover,
.widget-featured-products > .entry .entry-title > a:hover,
.widget-cart > .entry .entry-title > a:hover,
.entry .entry-delete a,
.steps .step.active .step-title, .steps .step.active > i,
.text-primary,
.shopping-cart .product-item .product-title > a:hover,
.wishlist-table .product-item .product-title > a:hover,
.order-table .product-item .product-title > a:hover,
.list-group-item.active,
a.list-group-item:hover,
 a.list-group-item:focus, a.list-group-item:active,
 .list-group-item-action:hover,
 .list-group-item-action:focus,
 .list-group-item-action:active,
 .progress-steps li.active .icon,
 .comparison-table .comparison-item .comparison-item-title:hover,
 .site-header .site-menu > ul > li.active > a,
 .breadcrumbs > li > a:hover,
 .faq-box:hover .link,
 .left-category-area .category-list .sub-c-box .title:hover,
 .left-category-area .category-list .sub-c-box .child-category a:hover,
 .section-title .links a:hover, 
 .section-title .links a.active,
 #quick_filter li a:hover,
 #quick_filter li a.active,
 .section-title .right_link:hover,
 .popular-category.theme3 .links a.active,
 .popular-category.theme3 .links a:hover,
 .site-header .search-box-wrap .input-group .serch-result .bottom-area a:hover,
 .shop-view>a,
 .genius-banner .inner-content p,
 .details-page-top-right-content .price-area .main-price,
 .free-shippin-aa
{
    color : <?php echo $color?> !important;
}

.product-card .product-priceDiscounted{
    color : red !important;
}

.js-cookie-consent-agree{
    background : <?php echo $color?> !important;
}

.site-header .toolbar .toolbar-item > a > div > .compare-icon > .count-label,
.btn-primary:hover,
.scroll-to-top-btn:hover,
.pagination li a:hover,
.pagination li span:hover,
.pagination li.active span,
.pagination li.active a,
.nav-tabs .nav-link.active:hover,
.btn
{
    color : #fff !important;
}

.shop-view>a.active{
    color: #fff !important;
}

.category-scroll::-webkit-scrollbar-thumb {
    background-color:  <?php echo $color?>;
}

.category-scroll {
    scrollbar-color:  <?php echo $color?> #e4e4e4;
    scrollbar-width: thin;
}

.btn-outline-primary {
    border-color: <?php echo $color?>;
    color: <?php echo $color?>;
    background: none;
}
.btn-outline-primary:hover {
    background-color: <?php echo $color?>;
    color: #fff !important;
}
.t-h-dropdown .t-h-dropdown-menu {
    border-top: 2px solid <?php echo $color?>;
}
.product-card:hover,
.brand-slider .slider-item a:hover,
.genius-banner:hover
{
    border-color: <?php echo $color?>;
}
.form-control:focus {
    border-color: <?php echo $color?>;
}
.input-group .form-control:focus ~ .input-group-addon {
    color: <?php echo $color?>;
}
.shop-view > a.active {
    border-color: <?php echo $color?>;
    background-color: <?php echo $color?>;
}
.custom-control .custom-control-input:checked ~ .custom-control-label::before {
    border-color: <?php echo $color?>;
    background-color: <?php echo $color?>;
}
.product-gallery .product-thumbnails > li.active > a,
.steps .step.active
{
    border-color: <?php echo $color?>;
}

.quickFilter .quickFilter-title:hover {
    border-color: <?php echo $color?> !important;
}
#quick_filter {
    border-color: <?php echo $color?>;
}
