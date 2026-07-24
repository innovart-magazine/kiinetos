import re
import os

file_path = r'c:\kinetos\capacitaciones\inyectologia.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace JS query selectors
html = html.replace("querySelectorAll('.accordion-card')", "querySelectorAll('.accordion-item')")

def replace_accordion(match):
    # Extract the title
    header_title_match = re.search(r'<h4 class="accordion-title">(.*?)</h4>', match.group(0))
    if not header_title_match:
        return match.group(0)
    title = header_title_match.group(1).strip()
    
    # Extract the inner content
    # The content is inside <div class="accordion-body"> ... <div class="accordion-content"> ... </div> ... </div>
    # Using regex to find everything inside accordion-content
    content_match = re.search(r'<div class="accordion-body">\s*<div class="accordion-content">(.*?)\s*</div>\s*</div>\s*</div>', match.group(0), re.DOTALL)
    if not content_match:
        # Some items might have nested divs, so let's be careful.
        content_match = re.search(r'<div class="accordion-content">(.*?)</div>\s*</div>\s*</div>', match.group(0), re.DOTALL)
        if not content_match:
            return match.group(0)
            
    inner_content = content_match.group(1).strip()
    
    item_id_match = re.search(r'id="(sec-[^"]+)"', match.group(0))
    item_id = f' id="{item_id_match.group(1)}"' if item_id_match else ''
    
    return f'''<div class="accordion-item"{item_id}>
                                <button class="accordion-header">
                                    <span class="accordion-title">{title}</span>
                                    <span class="accordion-icon">▼</span>
                                </button>
                                <div class="accordion-content">
                                    <div class="accordion-inner">
                                        <div class="accordion-text">
                                            {inner_content}
                                        </div>
                                    </div>
                                </div>
                            </div>'''

# This regex matches the whole accordion card. Since they can contain nested divs, we use a greedy approach carefully,
# or we match from <div class="accordion-card" up to the final </div> that closes it.
# Actually, the cards are well separated by HTML comments like <!-- 2. SISTEMAS -->
# Let's match from <div class="accordion-card" to the nearest </div>\s*</div>\s*</div>
html = re.sub(r'<div class="accordion-card".*?</div>\s*</div>\s*</div>', replace_accordion, html, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('Done!')
