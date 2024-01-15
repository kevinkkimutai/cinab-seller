<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mpesapayments', function (Blueprint $table) {
            $table->id();
            $table->string("userID",70);
            $table->string("transaction_number",70);
            $table->string("MerchantRequestID");
            $table->string("CheckoutRequestID");
            $table->string("ResultCode");
            $table->string("paidPhoneNo");
            $table->string("Amount");
            $table->string("MpesaReceiptNumber");
            $table->string("ResultDesc");
            $table->string("TransactionDate");
            $table->string("isVerified");
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mpesapayments');
    }
};
