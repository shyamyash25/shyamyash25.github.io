$utf8NoBom = New-Object System.Text.UTF8Encoding($False)
Get-ChildItem -Filter *.html | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom)
    
    # 1. replace href="index.html" -> href="/"
    $content = $content -replace 'href="index\.html"', 'href="/"'
    
    # 2. replace href="...html" for relative URLs excluding https://
    $content = [regex]::Replace($content, 'href="([^h"][^"]*?)\.html"', 'href="$1"')

    # 3. replace canonical links/schemas
    $content = [regex]::Replace($content, '(https://shyamstudios\.online/[a-zA-Z0-9_-]+)\.html', '$1')
    
    # 4. replace href="index" to "/" just in case
    $content = $content -replace 'href="index"', 'href="/"'

    [System.IO.File]::WriteAllText($_.FullName, $content, $utf8NoBom)
}

# Also do it for sitemap.xml
$sitemap = "sitemap.xml"
if (Test-Path $sitemap) {
    $content = [System.IO.File]::ReadAllText($sitemap, $utf8NoBom)
    $content = [regex]::Replace($content, '(https://shyamstudios\.online/[a-zA-Z0-9_-]+)\.html', '$1')
    [System.IO.File]::WriteAllText($sitemap, $content, $utf8NoBom)
}
