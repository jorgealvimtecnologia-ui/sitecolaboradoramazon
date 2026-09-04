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
        Schema::create('products', function (Blueprint $table) {
            $table->string('id')->primary(); // e.g. 'prod-1' or generated
            $table->string('asin', 20)->nullable()->index();
            $table->string('title');
            $table->string('category')->index();
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->integer('discount_percentage')->nullable();
            $table->decimal('rating', 3, 1)->default(4.8);
            $table->integer('reviews_count')->default(1000);
            $table->boolean('is_prime')->default(true);
            $table->boolean('is_best_seller')->default(false);
            $table->boolean('is_choice')->default(false);
            $table->boolean('is_lightning_deal')->default(false);
            $table->integer('deal_claimed_percentage')->nullable();
            $table->string('image_url', 1000);
            $table->string('amazon_url', 1000)->nullable();
            $table->string('badge_text')->nullable();
            $table->json('features')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('clicks_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
