import os
import shutil
from PIL import Image

def unwrap_sprite(filename, cols, rows, cell_w=168, cell_h=168):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    assets_dir = os.path.join(base_dir, 'src', 'assets')
    path = os.path.join(assets_dir, filename)
    backup_dir = os.path.join(base_dir, 'raw-assets', 'sprites')
    os.makedirs(backup_dir, exist_ok=True)
    backup_path = os.path.join(backup_dir, filename.replace('.png', '_original_grid.png'))
    
    if not os.path.exists(path):
        print(f'File not found: {path}')
        return
        
    if not os.path.exists(backup_path):
        shutil.copyfile(path, backup_path)
        print(f'Backed up {path} -> {backup_path}')
    else:
        print(f'Backup already exists: {backup_path}')
    
    im = Image.open(backup_path).convert('RGBA')
    frames = []
    
    for r in range(rows):
        for c in range(cols):
            box = (c * cell_w, r * cell_h, (c + 1) * cell_w, (r + 1) * cell_h)
            cell = im.crop(box)
            if cell.getbbox():
                frames.append(cell)
    
    frame_count = len(frames)
    strip = Image.new('RGBA', (frame_count * cell_w, cell_h), (0, 0, 0, 0))
    for i, frame in enumerate(frames):
        strip.paste(frame, (i * cell_w, 0))
    
    strip.save(path)
    print(f'Generated horizontal strip for {filename}: {frame_count} frames, size={strip.size}')

def auto_unwrap(filename, cell_w=168, cell_h=168, force_backup=False):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    assets_dir = os.path.join(base_dir, 'src', 'assets')
    path = os.path.join(assets_dir, filename)
    backup_dir = os.path.join(base_dir, 'raw-assets', 'sprites')
    os.makedirs(backup_dir, exist_ok=True)
    backup_path = os.path.join(backup_dir, filename.replace('.png', '_original_grid.png'))
    
    if not os.path.exists(path):
        print(f'File not found: {path}')
        return
        
    curr_im = Image.open(path).convert('RGBA')
    # If the file at path is multi-row grid, it's a new or raw grid sheet
    if curr_im.height > cell_h or not os.path.exists(backup_path) or force_backup:
        shutil.copyfile(path, backup_path)
        print(f'Backed up grid {path} -> {backup_path}')
    else:
        print(f'Using existing backup: {backup_path}')
        
    im = Image.open(backup_path).convert('RGBA')
    cols = im.width // cell_w
    rows = im.height // cell_h
    print(f'{filename}: size={im.size}, cols={cols}, rows={rows}')
    
    frames = []
    for r in range(rows):
        for c in range(cols):
            box = (c * cell_w, r * cell_h, (c + 1) * cell_w, (r + 1) * cell_h)
            cell = im.crop(box)
            bbox = cell.getbbox()
            idx = r * cols + c
            if bbox:
                frames.append(cell)
                print(f'  Frame {idx} (r={r}, c={c}): bbox={bbox}')
            else:
                print(f'  Frame {idx} (r={r}, c={c}): EMPTY')
                
    frame_count = len(frames)
    strip = Image.new('RGBA', (frame_count * cell_w, cell_h), (0, 0, 0, 0))
    for i, frame in enumerate(frames):
        strip.paste(frame, (i * cell_w, 0))
        
    strip.save(path)
    print(f'SUCCESS: {filename} -> {frame_count} frames, strip size={strip.size}\n')

if __name__ == '__main__':
    auto_unwrap('hurtwerewolf.png')
    auto_unwrap('deathwerewolf.png')
    auto_unwrap('attackwerewolf.png')
    auto_unwrap('idlecannibal.png')
    auto_unwrap('attackcannibal.png')
    auto_unwrap('hurtcannibal.png')
    auto_unwrap('deathcannibal.png')
    auto_unwrap('attackdarksorcerer.png')
    auto_unwrap('hurtdarksorcerer.png')
    auto_unwrap('deathdarksorcerer.png')
    auto_unwrap('parrydarksorcerer.png')

