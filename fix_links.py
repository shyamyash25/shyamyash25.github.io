import os, glob, re

files = glob.glob('*.html') + ['sitemap.xml']

for file in files:
    if not os.path.exists(file): continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. replace href="index.html" -> href="/"
    content = re.sub(r'href="index\.html"', r'href="/"', content)
    
    # 2. replace href="page.html" -> href="page"
    # This avoids hitting external links that start with http, but handles relative paths
    content = re.sub(r'href="([^h"][^"]*?)\.html"', r'href="\1"', content)
    
    # 3. Handle specific absolute URL replacements for canonicals, social open graph, and schemas
    content = re.sub(r'(https://shyamstudios\.online/[a-zA-Z0-9_-]+)\.html', r'\1', content)
    
    with open(file, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)

print("Replacement done successfully.")
