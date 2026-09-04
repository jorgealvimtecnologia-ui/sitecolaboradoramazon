<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AffiliateClick extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'product_title',
        'product_asin',
        'affiliate_tag',
        'ip_address',
        'user_agent',
        'referer'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
