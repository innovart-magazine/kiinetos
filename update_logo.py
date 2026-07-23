import os
import re

dirs = ['section', 'capacitaciones', 'visitas', 'entrevista']
count = 0
for d in dirs:
    for f in os.listdir(d):
        if f.endswith('.html'):
            filepath = os.path.join(d, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            pattern = r'(<div class="nav-brand">)\s*(<span class="nav-brand-title">INNOV<span>ART</span></span>(?:.*?<span class="nav-brand-sub">UNITEC</span>)?)\s*(</div>)'
            
            def repl(match):
                inner_text = match.group(2).strip()
                return f'<div class="nav-brand">\n      <img src="../img/innovartnew.png" alt="Logo Innovart" class="nav-brand-logo">\n      <div class="nav-brand-text">\n        {inner_text}\n      </div>\n    </div>'
                
            new_content = re.sub(pattern, repl, content, flags=re.DOTALL)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1
                print(f'Updated {filepath}')
print(f'Total updated: {count}')
