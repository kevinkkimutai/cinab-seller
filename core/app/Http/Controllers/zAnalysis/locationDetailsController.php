<?php

namespace App\Http\Controllers\zAnalysis;

use App\Http\Controllers\Controller;
use App\Models\webvisitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Jenssegers\Agent\Agent;

class locationDetailsController extends Controller
{
    //

    static  function getWebBrowserDetails($fullPath,$pagePath,$page,$currentUserInfo){
        $agent = new Agent();
        if (!empty($currentUserInfo)){
            $userID = "";
            if(!empty(Session::has('anonymous'))){
                $userID = Session::get('anonymous');
            }else{
                $id = rand(100,99999);
                $userID = Session::put('anonymous',$id);
                $userID = $id;
            }

            $location =$currentUserInfo->cityName;
            $longitude =$currentUserInfo->longitude;
            $latitude =$currentUserInfo->latitude;
            $countryName =$currentUserInfo->countryName;
            $ip =$currentUserInfo->ip;
            $countryCode =$currentUserInfo->countryCode;
            $browser =  $agent->browser();
            $device =  $agent->platform();
            $entrydate = date("Y-m-d H:i:s");


            try {
                $object = new webvisitor();
                $object ->ipAddress =$ip ;
                $object ->countryName =  $countryName;
                $object ->countryCode = $countryCode ;
                $object ->visitorID = $userID ;
                $object ->latitude = $latitude ;
                $object ->longitude =  $longitude;
                $object ->accessedTime = $entrydate ;
                $object ->browser = $browser ;
                $object ->pagevisited = $page ==""?"home":$page ;
                $object ->deviceUsed = $device ;
                $object ->fullPath = $fullPath ;
                $object ->pagePath = $pagePath ;
                $object -> save();
            }catch (\Exception $e){
                Log::info("Error getting user location details");
                Log::info($e->getMessage());
                Log::info("Error getting user location details");
            }

        }
    }
}
