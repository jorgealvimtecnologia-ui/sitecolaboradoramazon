<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Amazon Storefront | Achadinhos & Melhores Ofertas (Laravel + React)</title>
    <!-- Google Fonts for Amazon look -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
    <meta name="description" content="Minha Vitrine Oficial Amazon com achadinhos selecionados, ofertas relâmpago, cupons exclusivos e produtos mais vendidos com frete grátis Prime." />

    @php
        $manifestPath = public_path('build/.vite/manifest.json');
        $legacyManifestPath = public_path('build/manifest.json');
        $manifest = [];
        if (file_exists($manifestPath)) {
            $manifest = json_decode(file_get_contents($manifestPath), true) ?: [];
        } elseif (file_exists($legacyManifestPath)) {
            $manifest = json_decode(file_get_contents($legacyManifestPath), true) ?: [];
        }
        $entry = $manifest['src/main.jsx'] ?? null;
    @endphp

    @if ($entry)
        @if (isset($entry['css']))
            @foreach ($entry['css'] as $cssFile)
                <link rel="stylesheet" href="{{ asset('build/' . $cssFile) }}">
            @endforeach
        @endif
        <script type="module" src="{{ asset('build/' . $entry['file']) }}"></script>
    @else
        <!-- Fallback if manifest not ready -->
        <script type="module" src="http://localhost:3000/src/main.jsx"></script>
    @endif
  </head>
  <body class="bg-[#eaeded] text-[#0F1111] antialiased min-h-screen">
    <div id="root"></div>
  </body>
</html>
