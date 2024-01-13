<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\mpesapayment;
use App\Models\Order;
use App\Models\TrackOrder;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MpesaPaymentController extends Controller
{
    //
    public function generateMpesaAccessToken(){
        $curl_Tranfer = curl_init();
        curl_setopt($curl_Tranfer, CURLOPT_URL, env('TOKEN_URL'));
        $credentials = base64_encode(env('SAFARICOM_CONSUMER_KEY') . ':' . env('SAFARICOM_SECRET_KEY'));
        curl_setopt($curl_Tranfer, CURLOPT_HTTPHEADER, array('Authorization: Basic ' . $credentials));
        curl_setopt($curl_Tranfer, CURLOPT_HEADER, false);
        curl_setopt($curl_Tranfer, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl_Tranfer, CURLOPT_SSL_VERIFYPEER, false);
        $curl_Tranfer_response = curl_exec($curl_Tranfer);


        $token = json_decode($curl_Tranfer_response)->access_token;
        return $token;
    }

    static  function MakeSTKPushPayment($phoneNo,$Amount,$userID,$transaction_number){
        $accountPhoneNo = $phoneNo;
        $TimeStamp = date("Ymdhis");
        $password = base64_encode(env('SAFARICOM_BUSINESS_STORE_NO') . env('SAFARICOM_PASSKEY') . $TimeStamp);

        $token = (new self())->generateMpesaAccessToken();

        $curl_Tranfer2 = curl_init();
        curl_setopt($curl_Tranfer2, CURLOPT_URL, env('ONLINEPAYMENT'));
        curl_setopt($curl_Tranfer2, CURLOPT_HTTPHEADER, array('Content-Type:application/json', 'Authorization:Bearer ' . $token));

        $transactionNoUserID = $userID."-".$transaction_number;
        $transferMpesaPostData = [
            'BusinessShortCode' => env('SAFARICOM_BUSINESS_STORE_NO'),
            'Password' => $password,
            'Timestamp' => $TimeStamp,
            'TransactionType' => env('TYPE_OF_TRANSACTION'),
            'Amount' => $Amount,
            'PartyA' => $accountPhoneNo ,//,$transactionNoUserID
            'PartyB' => env('SAFARICOM_BUSINESS_TILL_NO'),
            //'PartyB' => env('SAFARICOM_PARTYB'),
            'PhoneNumber' => $phoneNo,
            'CallBackURL' => env('CALLBACKURL'),
            'AccountReference' => env('SAFARICOM_ACCOUNTREFERENCE'),
            'TransactionDesc' => env('SAFARICOM_TRANSACTION_DESC'),
        ];

        $encodedData = json_encode($transferMpesaPostData);

        curl_setopt($curl_Tranfer2, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl_Tranfer2, CURLOPT_POST, true);
        curl_setopt($curl_Tranfer2, CURLOPT_POSTFIELDS, $encodedData);
        curl_setopt($curl_Tranfer2, CURLOPT_HEADER, false);
        curl_setopt($curl_Tranfer2, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl_Tranfer2, CURLOPT_SSL_VERIFYHOST, 0);
        $safaricomResponse = json_decode(curl_exec($curl_Tranfer2));
        $curentDate = date('Y-m-d H:i:s');


        $collectionData = collect(self::jsonConverter($safaricomResponse));


        if ($collectionData->has("ResponseCode") && $collectionData['ResponseCode'] == 0) {
            $paymentObj = new mpesapayment();
            $paymentObj->userID =$userID ;
            $paymentObj->transaction_number =$transaction_number ;
            $paymentObj->MerchantRequestID = "";
            $paymentObj->CheckoutRequestID ="" ;
            $paymentObj->ResultCode = "";
            $paymentObj->paidPhoneNo =$phoneNo ;
            $paymentObj->Amount = $Amount;
            $paymentObj->MpesaReceiptNumber = "";
            $paymentObj->ResultDesc = "";
            $paymentObj->TransactionDate = $curentDate;
            $paymentObj->isVerified ="no" ;

            if ($paymentObj->save()){
                return true;
            }else{
                return false;
            }
        } else {
           return false;
        }
    }


    static function jsonConverter($jsonObject){
        return json_decode(json_encode($jsonObject),true);
    }

    public function mpesaCallback(Request $request){
        $Body = $request->get("Body");
        $stkCallback = $Body["stkCallback"];
        Log::info($stkCallback);
        if ($stkCallback["ResultCode"]==0) {
            $metadata = $stkCallback["CallbackMetadata"];
            $CallbackMetadata = $metadata["Item"];

            $MerchantRequestID = $stkCallback['MerchantRequestID'];
            $CheckoutRequestID = $stkCallback['CheckoutRequestID'];
            $ResultCode = $stkCallback['ResultCode'];
            $ResultDesc = $stkCallback['ResultDesc'];
            $Amount = $CallbackMetadata[0]['Value'];
            $MpesaReceiptNumber = $CallbackMetadata[1]['Value'];
            $TransactionDate =$CallbackMetadata[3]['Value'];
            $PhoneNumber = $CallbackMetadata[4]['Value'];

            $maxID = mpesapayment::where('paidPhoneNo','=',$PhoneNumber)->where('isVerified','=',"no")->max('id');

            \DB::update("update mpesapayments set 
                         MerchantRequestID='$MerchantRequestID',
                         CheckoutRequestID='$CheckoutRequestID',
                         ResultCode='$ResultCode',
                         Amount='$Amount',
                         MpesaReceiptNumber='$MpesaReceiptNumber', 
                         TransactionDate='$TransactionDate',
                         ResultDesc='$ResultDesc'
                         where id='$maxID' and paidPhoneNo='$PhoneNumber' ");

            $paymentDetailsCaptured = mpesapayment::where("id","=",$maxID)->first();
            $transactionsNumber =   $paymentDetailsCaptured -> transaction_number;

            //get order number
            $transactionTableDetails = Transaction::where("txn_id ","=",$transactionsNumber)->max("order_id");

            //Update order table
            $orderTable = Order::where("id","=",$transactionTableDetails)->first();
            $orderTable->payment_status ="Paid";
            $orderTable->save();

        }

    }

    public function airtelCallback(Request $request){
        Log::info("===================================================================================");
        Log::info("===================================================================================");
        Log::info("");
        Log::info("");
        Log::info("");
        Log::info("");
        Log::info("AIRTEL PAYMENT CALL BACK RESPONSE");
        Log::info($request->all());
        Log::info("AIRTEL PAYMENT CALL BACK RESPONSE");
        Log::info("");
        Log::info("");
        Log::info("");
        Log::info("");
        Log::info("===================================================================================");
        Log::info("===================================================================================");
    }
}
