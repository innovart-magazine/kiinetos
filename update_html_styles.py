import os

files = [
    r'c:\kinetos\capacitaciones\primeroAuxilios.html',
    r'c:\kinetos\capacitaciones\inyectologia.html'
]

replacements = [
    (
        'style="position: relative; overflow: hidden; border-radius: 14px; background: #0d0d1a; margin-bottom: 10px;"',
        'class="carousel-prim"'
    ),
    (
        'style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; text-align: center; backdrop-filter: blur(10px);"',
        'class="carousel-slide-inner"'
    ),
    (
        'style="font-size: 0.75rem; color: #a78bfa; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; font-weight: 600;"',
        'class="chart-title"'
    ),
    (
        'style="font-size: 0.75rem; color: #a78bfa; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 24px; font-weight: 600;"',
        'class="chart-title" style="margin-bottom: 24px;"'
    ),
    (
        'style="position: relative; height: 280px; width: 100%;"',
        'class="chart-container"'
    ),
    (
        'style="display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start; text-align: left;"',
        'class="comment-box"'
    ),
    (
        'style="display: flex; gap: 12px; align-items: flex-start; text-align: left;"',
        'class="comment-box"'
    ),
    (
        'style="width: 40px; height: 40px; min-width: 40px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #db2777); display: flex; align-items: center; justify-content: center; font-size: 1rem;"',
        'class="comment-avatar" style="background: linear-gradient(135deg, #7c3aed, #db2777);"'
    ),
    (
        'style="width: 40px; height: 40px; min-width: 40px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #ef4444); display: flex; align-items: center; justify-content: center; font-size: 1rem;"',
        'class="comment-avatar" style="background: linear-gradient(135deg, #f59e0b, #ef4444);"'
    ),
    (
        'style="width: 40px; height: 40px; min-width: 40px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 1rem;"',
        'class="comment-avatar" style="background: linear-gradient(135deg, #10b981, #3b82f6);"'
    ),
    (
        'style="width: 40px; height: 40px; min-width: 40px; border-radius: 50%; background: linear-gradient(135deg, #059669, #2563eb); display: flex; align-items: center; justify-content: center; font-size: 1rem;"',
        'class="comment-avatar" style="background: linear-gradient(135deg, #059669, #2563eb);"'
    ),
    (
        'style="width: 40px; height: 40px; min-width: 40px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 1rem;"',
        'class="comment-avatar" style="background: linear-gradient(135deg, #2563eb, #7c3aed);"'
    ),
    (
        'style="width: 40px; height: 40px; min-width: 40px; border-radius: 50%; background: linear-gradient(135deg, #d97706, #db2777); display: flex; align-items: center; justify-content: center; font-size: 1rem;"',
        'class="comment-avatar" style="background: linear-gradient(135deg, #d97706, #db2777);"'
    ),
    (
        'style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 0 12px 12px 12px; padding: 12px 14px; flex: 1;"',
        'class="comment-content"'
    ),
    (
        'style="margin: 0 0 4px; font-weight: 700; font-size: 0.85rem; color: #e9d5ff;"',
        'class="comment-author"'
    ),
    (
        'style="margin: 0; font-size: 0.88rem; line-height: 1.5; opacity: 0.9;"',
        'class="comment-text"'
    ),
    (
        'style="display: flex; gap: 16px; margin-top: 10px; font-size: 0.85rem; color: #a78bfa; align-items: center;"',
        'class="social-buttons"'
    ),
    (
        '''style="cursor: pointer; display: flex; gap: 4px; align-items: center; transition: color 0.2s;" onmouseover="this.style.color='#f43f5e'" onmouseout="this.style.color='#a78bfa'"''',
        'class="social-btn like"'
    ),
    (
        '''style="cursor: pointer; display: flex; gap: 4px; align-items: center; transition: color 0.2s;" onmouseover="this.style.color='#10b981'" onmouseout="this.style.color='#a78bfa'"''',
        'class="social-btn repost"'
    ),
    (
        'style="display: block; position: relative; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.3); cursor: pointer;"',
        'class="video-thumb-container"'
    ),
    (
        'style="width: 100%; display: block; border-radius: 12px;"',
        'class="video-thumb-img"'
    ),
    (
        'style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); border-radius: 12px;"',
        'class="video-thumb-overlay"'
    ),
    (
        'style="width: 64px; height: 64px; background: #ff0000; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.5);"',
        'class="video-thumb-icon"'
    ),
    (
        'style="position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 15px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); border-radius: 0 0 12px 12px;"',
        'class="video-thumb-title-container"'
    ),
    (
        'style="margin: 0; color: #fff; font-size: 0.9rem; font-weight: 500;"',
        'class="video-thumb-title"'
    ),
    (
        'style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center; backdrop-filter: blur(5px);"',
        'class="modal-overlay"'
    ),
    (
        'style="position: relative; width: 90%; max-width: 800px; background: #0d0d1a; border-radius: 12px; padding: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);"',
        'class="modal-content"'
    ),
    (
        'style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2.5rem; cursor: pointer;"',
        'class="modal-close"'
    )
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {filepath}')
