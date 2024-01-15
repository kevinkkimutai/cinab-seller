<?php

namespace App\Http\Controllers\zAnalysis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class generalController extends Controller
{
    //

    static function countSate($stateName,$date,$endDate){
        if ($date=="" && $endDate ==""){
            $data =  reportAnalysisController::jsonConvertor(\DB::select("SELECT count(*) as total,countryName FROM `webvisitors` where countryName ='$stateName' group by countryName order by id desc;"));
            return count($data);
        }else{
            $data =  reportAnalysisController::jsonConvertor(\DB::select("SELECT count(*) as total,countryName FROM `webvisitors` where countryName ='$stateName' and created_at >= '$date' and created_at <= '$endDate' group by countryName order by id desc;"));
            return count($data);
        }
    }

    static function countPageVisited($pagevisited,$date,$endDate){
        if ($date=="" && $endDate ==""){
            $data =  reportAnalysisController::jsonConvertor(\DB::select("SELECT pagevisited FROM `webvisitors` where pagevisited ='$pagevisited' order by id desc;"));
            return count($data);
        }else{
            $data =  reportAnalysisController::jsonConvertor(\DB::select("SELECT countryName FROM `webvisitors` where pagevisited ='$pagevisited' and created_at >= '$date' and created_at <= '$endDate' order by id desc;"));
            return count($data);
        }
    }
}
