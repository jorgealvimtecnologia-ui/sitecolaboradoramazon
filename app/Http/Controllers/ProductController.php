<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * List products with search, category and filters
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // Search filter
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('asin', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($category = $request->input('category')) {
            if ($category === 'achadinhos-99') {
                $query->where('price', '<=', 99.00);
            } elseif ($category !== 'all') {
                $query->where('category', $category);
            }
        }

        // Prime filter
        if ($request->boolean('prime_only')) {
            $query->where('is_prime', true);
        }

        // Deals filter
        if ($request->boolean('deals_only')) {
            $query->where(function ($q) {
                $q->where('is_lightning_deal', true)
                  ->orWhere('discount_percentage', '>=', 15);
            });
        }

        // Best Sellers only
        if ($request->boolean('bestsellers_only')) {
            $query->where('is_best_seller', true);
        }

        // Sort
        $sort = $request->input('sort', 'featured');
        match ($sort) {
            'price-asc' => $query->orderBy('price', 'asc'),
            'price-desc' => $query->orderBy('price', 'desc'),
            'discount' => $query->orderByDesc('discount_percentage'),
            'rating' => $query->orderByDesc('rating'),
            'clicks' => $query->orderByDesc('clicks_count'),
            default => $query->orderByDesc('is_lightning_deal')
                             ->orderByDesc('is_best_seller')
                             ->orderByDesc('created_at')
        };

        $products = $query->get();

        // Append calculated attributes
        $products->each(function ($p) {
            $p->affiliate_url = $p->affiliate_url;
            $p->tracked_url = $p->tracked_url;
        });

        return response()->json([
            'status' => 'success',
            'count' => $products->count(),
            'products' => $products
        ]);
    }

    /**
     * Show single product
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        $product->affiliate_url = $product->affiliate_url;
        $product->tracked_url = $product->tracked_url;

        return response()->json([
            'status' => 'success',
            'product' => $product
        ]);
    }

    /**
     * Create new product (with automatic ASIN extraction and discount calculation)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:500',
            'category' => 'required|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'image_url' => 'required|string|max:1000',
            'amazon_url' => 'nullable|string|max:1000',
            'asin' => 'nullable|string|max:20',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews_count' => 'nullable|integer|min:0',
            'is_prime' => 'boolean',
            'is_best_seller' => 'boolean',
            'is_choice' => 'boolean',
            'is_lightning_deal' => 'boolean',
            'badge_text' => 'nullable|string|max:100',
            'features' => 'nullable|array',
            'description' => 'nullable|string'
        ]);

        // Auto-extract ASIN from URL if not given
        if (empty($validated['asin']) && !empty($validated['amazon_url'])) {
            if (preg_match('/(?:dp|gp\/product|exec\/obidos\/ASIN|product)\/([A-Z0-9]{10})/i', $validated['amazon_url'], $matches) ||
                preg_match('/\/([A-Z0-9]{10})(?:[\/?]|$)/i', $validated['amazon_url'], $matches)) {
                $validated['asin'] = strtoupper($matches[1]);
            }
        }

        // Auto-calculate discount percentage if original price is set
        if (!empty($validated['original_price']) && $validated['original_price'] > $validated['price']) {
            $validated['discount_percentage'] = round((($validated['original_price'] - $validated['price']) / $validated['original_price']) * 100);
        }

        $validated['id'] = 'prod-' . Str::lower(Str::random(8));

        $product = Product::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Produto cadastrado com sucesso no banco de dados!',
            'product' => $product
        ], 201);
    }

    /**
     * Update product
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:500',
            'category' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'image_url' => 'sometimes|string|max:1000',
            'amazon_url' => 'nullable|string|max:1000',
            'asin' => 'nullable|string|max:20',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews_count' => 'nullable|integer|min:0',
            'is_prime' => 'boolean',
            'is_best_seller' => 'boolean',
            'is_choice' => 'boolean',
            'is_lightning_deal' => 'boolean',
            'badge_text' => 'nullable|string|max:100',
            'features' => 'nullable|array',
            'description' => 'nullable|string'
        ]);

        if (isset($validated['original_price']) && $validated['original_price'] > ($validated['price'] ?? $product->price)) {
            $price = $validated['price'] ?? $product->price;
            $validated['discount_percentage'] = round((($validated['original_price'] - $price) / $validated['original_price']) * 100);
        }

        $product->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Produto atualizado com sucesso!',
            'product' => $product
        ]);
    }

    /**
     * Delete product
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Produto removido com sucesso!'
        ]);
    }
}
