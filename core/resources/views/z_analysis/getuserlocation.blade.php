<?php
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\zAnalysis\locationDetailsController;
use Illuminate\Support\Facades\Log;
//use Stevebauman\Location\Location;
use Stevebauman\Location\Facades\Location;

$url = asset('');
$path = URL::current();
$fullPath = URL::full();
$currentPage = str_replace($url,'',$path.'/');
$pagePath = str_replace($url,'',$fullPath);

$ip = request()->ip();
//$ip = '197.155.64.193'
$ip = '8.8.4.4';
$currentUserInfo = Location::get($ip);
Log::info("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
Log::info($pagePath);
Log::info("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");

locationDetailsController::getWebBrowserDetails($fullPath,$pagePath,$currentPage,$currentUserInfo);
?>