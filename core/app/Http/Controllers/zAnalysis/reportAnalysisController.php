<?php

namespace App\Http\Controllers\zAnalysis;

use App\Http\Controllers\Controller;
use App\Models\webvisitor;
use Illuminate\Http\Request;

class reportAnalysisController extends Controller
{
    //

    static  function jsonConvertor($json){
        return json_decode(json_encode($json),true);
    }

    public function getLocationData(Request $request){
        $startDate = $request->get("startDate");
        $endDate = $request->get("endDate");

        if ($startDate !="" && $endDate !=""){
            return  self::jsonConvertor(\DB::select("SELECT longitude as lng,latitude as lat,concat(countryName,' from ', browser) as title, concat(' Accessed at ',' ', accessedTime) as description FROM `webvisitors` where created_at >= '$startDate' and created_at <= '$endDate'  group by visitorID; "));
        }else{
            return  self::jsonConvertor(\DB::select("SELECT longitude as lng,latitude as lat,concat(countryName,' from ', browser) as title, concat(' Accessed at ',' ', accessedTime) as description FROM `webvisitors` group by visitorID; "));
        }

    }
    public function getuserLocationData(Request $request){
        $id = $request->get('id');
        return  self::jsonConvertor(\DB::select("SELECT longitude as lng,latitude as lat,concat(countryName,' from ', browser) as title, concat(' Accessed at ',' ', accessedTime) as description FROM `webvisitors` where id ='$id' group by visitorID; "));

    }

    public function reportdashboard(){

        $currentDate = date("Y-m-d");
        $pagesAccessed =  \DB::select("SELECT * FROM `webvisitors` where created_at >= '$currentDate' group by visitorID order by id desc;");

        return view("z_analysis.reportdashboard",["pagesAccessed"=>self::jsonConvertor($pagesAccessed)]);
    }
    public function stateaccess(){
        $startDate = "";
        $endDate = "";
        $stateAccessed =  \DB::select("SELECT count(*) as total,countryName FROM `webvisitors`   group by countryName order by id desc;");

        return view("z_analysis.stateaccess",["stateAccessed"=>self::jsonConvertor($stateAccessed),"startDate"=>$startDate,"endDate"=>$endDate]);
    }
    public function stateaccessDates($startDate,$endDate){
        $stateAccessed =  \DB::select("SELECT count(*) as total,countryName FROM `webvisitors`   group by countryName order by id desc;");
        return view("z_analysis.stateaccess",["stateAccessed"=>self::jsonConvertor($stateAccessed),"startDate"=>$startDate,"endDate"=>$endDate]);
    }
    public function pagesvisited(){
        $startDate = "";
        $endDate = "";
        $pageVisited =  \DB::select("SELECT pagevisited FROM `webvisitors`   group by pagevisited order by id desc;");

        return view("z_analysis.pagesvisited",["pageVisited"=>self::jsonConvertor($pageVisited),"startDate"=>$startDate,"endDate"=>$endDate]);
    }

    public function pagesvisitedDates($startDate,$endDate){
        $pageVisited =  \DB::select("SELECT pagevisited FROM `webvisitors`   group by pagevisited order by id desc;");
        return view("z_analysis.pagesvisited",["pageVisited"=>self::jsonConvertor($pageVisited),"startDate"=>$startDate,"endDate"=>$endDate]);
    }

    public function reportMaps(){
        //$currentDate = date("Y-m-d");
        $startDate = "";
        $endDate = "";
        $pagesAccessed =  self::jsonConvertor(\DB::select("SELECT * FROM `webvisitors` group by visitorID order by id desc;"));
        return view("z_analysis.reportmap",["pagesAccessed"=>$pagesAccessed,"startDate"=>$startDate,"endDate"=>$endDate,]);
    }
    public function reportMapsDates($startDate,$endDate){
        $pagesAccessed =  self::jsonConvertor(\DB::select("SELECT longitude as lng,latitude as lat,concat(countryName,' from ', browser) as title, concat(' Accessed at ',' ', accessedTime) as description FROM `webvisitors` where created_at >= '$startDate' and created_at <= '$endDate' group by visitorID; "));
        return view("z_analysis.reportmap",["pagesAccessed"=>$pagesAccessed,"startDate"=>$startDate,"endDate"=>$endDate,]);
    }
    public function reportUserMaps($webVisitID){
        //$pagesAccessed =  webvisitor::all();
        //return view("z_analysis.reportusermap",["pagesAccessed"=>$pagesAccessed]);

        $visitors = webvisitor::where("id","=",$webVisitID)->first();
        $visitorID = $visitors ->visitorID;
        $lng = $visitors ->longitude;
        $lat = $visitors ->latitude;
        $pagesAccessed =  self::jsonConvertor(\DB::select("SELECT * FROM `webvisitors` where visitorID = '$visitorID'  order by id desc;"));
        return view("z_analysis.reportusermap",["pagesAccessed"=>$pagesAccessed,"accessID"=>$webVisitID,"lng"=>$lng,"lat"=>$lat]);
    }
    public function trackUser($webVisitID){
        $visitorID = webvisitor::where("id","=",$webVisitID)->max("visitorID");
        $pagesAccessed =  self::jsonConvertor(\DB::select("SELECT * FROM `webvisitors` where visitorID = '$visitorID'  order by id desc;"));
        return view("z_analysis.track",["pagesAccessed"=>$pagesAccessed]);
    }
}
