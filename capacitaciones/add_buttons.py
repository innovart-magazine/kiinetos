import re

files = [
    r'c:\kinetos\capacitaciones\inyectologia.html',
    r'c:\kinetos\capacitaciones\primeroAuxilios.html'
]

social_buttons = """
<div style="display: flex; gap: 16px; margin-top: 10px; font-size: 0.85rem; color: #a78bfa; align-items: center;">
    <span style="cursor: pointer; display: flex; gap: 4px; align-items: center; transition: color 0.2s;" onmouseover="this.style.color='#f43f5e'" onmouseout="this.style.color='#a78bfa'">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        Me gusta
    </span>
    <span style="cursor: pointer; display: flex; gap: 4px; align-items: center; transition: color 0.2s;" onmouseover="this.style.color='#10b981'" onmouseout="this.style.color='#a78bfa'">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4 7.58 4 4 7.58 4 12H1l4 4 4-4H6z"/></svg>
        Repostear
    </span>
</div>
"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(r'(Miembro del Equipo</p>\s*<p[^>]*>.*?</p>)(\s*</div>)', re.DOTALL)
    
    new_content = pattern.sub(rf'\g<1>\n{social_buttons}\g<2>', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'Processed {filepath}')

for f in files:
    process_file(f)
