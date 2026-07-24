import re
import os

file_path = r'c:\kinetos\capacitaciones\inyectologia.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove STICKY FILTER CHIPS block
# From <!-- STICKY FILTER CHIPS --> to </div> before <!-- ACCORDION CONTAINER -->
html = re.sub(r'<!-- STICKY FILTER CHIPS -->.*?</div>\s*<!-- ACCORDION CONTAINER -->', '<!-- ACCORDION CONTAINER -->', html, flags=re.DOTALL)

# 2. Remove the custom ACCORDION AND STICKY FILTER CHIPS LOGIC script
html = re.sub(r'<!-- ACCORDION AND STICKY FILTER CHIPS LOGIC -->\s*<script>.*?</script>', '', html, flags=re.DOTALL)

# 3. Add <script src="../js/articulo.js" defer></script> before </body>
# But wait, inyectologia.html might have its own theme logic in the `<head>` or at the end?
# Let's check if we just need to append it before </body>.
if '../js/articulo.js' not in html:
    html = html.replace('</body>', '    <script src="../js/articulo.js" defer></script>\n</body>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('Done!')
