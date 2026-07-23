import os
import re

dirs = ['section', 'capacitaciones', 'visitas', 'entrevista', '.']
count = 0
for d in dirs:
    if not os.path.isdir(d): continue
    for f in os.listdir(d):
        if f.endswith('.html'):
            filepath = os.path.join(d, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            def repl(match):
                base = match.group(1)
                return f'href="{base}?v=7"'
                
            new_content = re.sub(r'href="(.*?\.css)(?:\?v=\d+)?"', repl, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1
                print(f'Updated {filepath}')
print(f'Total updated for cache busting: {count}')
