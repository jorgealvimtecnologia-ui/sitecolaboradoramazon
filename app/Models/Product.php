<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'asin',
        'title',
        'category',
        'price',
        'original_price',
        'discount_percentage',
        'rating',
        'reviews_count',
        'is_prime',
        'is_best_seller',
        'is_choice',
        'is_lightning_deal',
        'deal_claimed_percentage',
        'image_url',
        'amazon_url',
        'badge_text',
        'features',
        'description',
        'clicks_count'
    ];

    protected $casts = [
        'price' => 'float',
        'original_price' => 'float',
        'rating' => 'float',
        'reviews_count' => 'integer',
        'discount_percentage' => 'integer',
        'deal_claimed_percentage' => 'integer',
        'is_prime' => 'boolean',
        'is_best_seller' => 'boolean',
        'is_choice' => 'boolean',
        'is_lightning_deal' => 'boolean',
        'features' => 'array',
        'clicks_count' => 'integer'
    ];

    /**
     * Get the formatted Amazon affiliate link
     */
    public function getAffiliateUrlAttribute(): string
    {
        $tag = Setting::get('affiliate_tag', 'vitrineamz-20');
        if ($this->asin) {
            return "https://www.amazon.com.br/dp/{$this->asin}?tag={$tag}&linkCode=ll1";
        }
        if ($this->amazon_url) {
            $sep = str_contains($this->amazon_url, '?') ? '&' : '?';
            return "{$this->amazon_url}{$sep}tag={$tag}&linkCode=ll1";
        }
        return "https://www.amazon.com.br/?tag={$tag}";
    }

    /**
     * Get the clean redirect tracker URL
     */
    public function getTrackedUrlAttribute(): string
    {
        return url("/go/{$this->id}");
    }
}
