<?php

namespace RachidLaasri\LaravelInstaller\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Session;
use SebastianBergmann\Environment\Console;

class LicenseController extends Controller
{

    public function __construct()
    {

    }

    /**
     * Display the permissions check page.
     *
     * @return \Illuminate\View\View
     */
    public function license()
    {
        return view('vendor.installer.license');
    }

    public function licenseCheck(Request $request) {

        $request->validate([
            'email' => 'required',
            'username' => 'required',
            'purchase_code' => 'required'
        ]);

        $itemid = 33771074;
        $itemname = 'OmniMart';


        try {
            $client = new Client();
            $response = $client->request('GET', 'https://api.envato.com/v3/market/author/sale?code='.$request->purchase_code, [
                'headers' => [
                    'content-type' => 'application/json',
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer xXQiElDjx4Eb1Ed6v7ZPi4vXeGoFgWhX'
                ]
            ]);

            $responseBody = $response->getBody()->getContents();

            $formattedRes = json_decode($responseBody, true);

            $buyerUsername = $formattedRes['buyer'];


            if ($request->username != $buyerUsername || $itemid != $formattedRes['item']['id']) {
                Session::flash('license_error', 'Username / Purchase code didn\'t match for this item!');
                return redirect()->back();
            }


            fopen("core/vendor/mockery/mockery/verified", "w");

            $mainURL = URL::to('/');

            if(strpos($mainURL, 'http://localhost') !== false || strpos($mainURL, 'http://127.0.0.1:8000') !== false || strpos($mainURL, 'https://localhost') !== false || strpos($mainURL, 'https://127.0.0.1:8000') !== false){

            }else{
                $client->request('POST', 'https://geniusdevs.com/clients/api/clients', [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Content-Type' => 'application/x-www-form-urlencoded'
                    ],
                    'form_params' => [
                        'item_name' => $itemname,
                        'item_id' => $itemid,
                        'email' => $request->email,
                        'envato_username' => $request->username,
                        'purchase_code' => $request->purchase_code,
                        'domin_url' => URL::to('/'),
                    ]
                ]);
            }


            Session::flash('license_success', 'Your license is verified successfully!');

            $gdp = new Client();
            $gdpr = $gdp->request('GET', 'https://geniusdevs.com/clients/api/clients/'.$request->purchase_code, [
                'headers' => [
                    'content-type' => 'application/json',
                    'Accept' => 'application/json'
                ]
            ]);

            $gdprd = $gdpr->getBody()->getContents();
            $gdprdjd = json_decode($gdprd, true);

            $rutl = array();

            foreach($gdprdjd['data'] as $data){
                if(URL::to('/') == $data['domin_url']){

                }elseif (URL::to('/') != $data['domin_url']){
                    array_push($rutl, $data['domin_url']);
                }

            }

            if(count($rutl) >= 1){
                Session::flash('domin_url', $rutl);
            }

            return redirect()->route('LaravelInstaller::environmentWizard');

        } catch (\Exception $e) {
            Session::flash('license_error', 'Something went wrong!');
            return redirect()->back();
        }

    }
}
