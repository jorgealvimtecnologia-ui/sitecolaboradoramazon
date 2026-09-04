<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Get site settings
     */
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'settings' => [
                'affiliate_tag' => Setting::get('affiliate_tag', 'vitrineamz-20'),
                'store_name' => Setting::get('store_name', 'Achadinhos & Recomendações Amazon'),
                'store_handle' => Setting::get('store_handle', '@vitrine.achadinhos')
            ]
        ]);
    }

    /**
     * Update settings
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'affiliate_tag' => 'sometimes|string|max:50',
            'store_name' => 'sometimes|string|max:100',
            'store_handle' => 'sometimes|string|max:50'
        ]);

        foreach ($validated as $key => $val) {
            Setting::set($key, trim($val));
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Configurações atualizadas com sucesso!',
            'settings' => [
                'affiliate_tag' => Setting::get('affiliate_tag', 'vitrineamz-20'),
                'store_name' => Setting::get('store_name', 'Achadinhos & Recomendações Amazon'),
                'store_handle' => Setting::get('store_handle', '@vitrine.achadinhos')
            ]
        ]);
    }
}
