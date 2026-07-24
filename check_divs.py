import re
with open(r'c:\kinetos\capacitaciones\inyectologia.html', 'r', encoding='utf-8') as f: html = f.read()
matches = list(re.finditer(r'<div class="accordion-item"', html))
for i in range(len(matches)):
    start = matches[i].start()
    end = matches[i+1].start() if i+1 < len(matches) else html.find('<!-- 2. ACTUACIÓN -->') # wait, that's specific to item 1
    # let's just do it for all chunks
    if i+1 < len(matches):
        chunk = html[start:end]
        opens = len(re.findall(r'<div\b', chunk))
        closes = len(re.findall(r'</div\b', chunk))
        print(f'Item {i+1}: open={opens} close={closes}')
