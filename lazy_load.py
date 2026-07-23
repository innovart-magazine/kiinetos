import os
import re

dirs = ['section', 'capacitaciones', 'visitas', 'entrevista', '.']
count = 0
for d in dirs:
    for f in os.listdir(d):
        if f.endswith('.html'):
            filepath = os.path.join(d, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Match <img> tags that do not have loading="lazy" and are not the nav-brand-logo
            def repl(match):
                img_tag = match.group(0)
                if 'loading=' in img_tag or 'nav-brand-logo' in img_tag or 'navbar-logo' in img_tag:
                    return img_tag
                
                # Insert loading="lazy" decoding="async" before the closing >
                return img_tag[:-1] + ' loading="lazy" decoding="async">'
                
            new_content = re.sub(r'<img\s+[^>]+>', repl, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1
                print(f'Updated {filepath}')
print(f'Total updated for lazy loading: {count}')
