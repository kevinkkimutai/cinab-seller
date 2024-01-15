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
        Schema::create('webvisitors', function (Blueprint $table) {
            $table->id();
            $table->string("ipAddress");
            $table->string("countryName");
            $table->string("countryCode");
            $table->string("visitorID");
            $table->string("latitude");
            $table->string("longitude");
            $table->string("accessedTime");
            $table->string("deviceUsed");
            $table->string("browser");
            $table->string("pagevisited");
            $table->text("fullPath");
            $table->text("pagePath");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webvisitors');
    }
};
