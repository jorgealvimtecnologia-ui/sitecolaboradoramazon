<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\AffiliateClick;
use App\Models\Setting;
use Illuminate\Http\Request;

class ClickController extends Controller
{
    /**
     * Smart Affiliate Redirect & Click Tracker (/go/{id})
     */
    public function redirect($id, Request $request)
    {
        $product = Product::where('id', $id)
            ->orWhere('asin', $id)
            ->firstOrFail();

        $tag = Setting::get('affiliate_tag', 'vitrineamz-20');

        // Register click in database
        try {
            AffiliateClick::create([
                'product_id' => $product->id,
                'product_title' => $product->title,
                'product_asin' => $product->asin,
                'affiliate_tag' => $tag,
                'ip_address' => $request->ip(),
                'user_agent' => substr($request->userAgent() ?? '', 0, 500),
                'referer' => substr($request->headers->get('referer') ?? '', 0, 1000)
            ]);

            // Increment click counter on product
            $product->increment('clicks_count');
        } catch (\Throwable $e) {
            // Log silently and continue redirect
        }

        // Build target Amazon URL
        $targetUrl = $product->affiliate_url;

        return redirect()->away($targetUrl, 302);
    }

    /**
     * Return Analytics & Click Statistics for Dashboard
     */
    public function stats()
    {
        $totalClicks = AffiliateClick::count();
        $todayClicks = AffiliateClick::whereDate('created_at', today())->count();
        
        $topProducts = Product::orderByDesc('clicks_count')
            ->where('clicks_count', '>', 0)
            ->take(5)
            ->get(['id', 'title', 'asin', 'price', 'clicks_count', 'image_url']);

        $recentClicks = AffiliateClick::latest()
            ->take(10)
            ->get(['id', 'product_title', 'product_asin', 'affiliate_tag', 'created_at']);

        return response()->json([
            'status' => 'success',
            'analytics' => [
                'total_clicks' => $totalClicks,
                'today_clicks' => $todayClicks,
                'top_products' => $topProducts,
                'recent_clicks' => $recentClicks
            ]
        ]);
    }
}
