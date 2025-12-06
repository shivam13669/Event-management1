import os
import glob

replacements = {
    'Chennai Event Management': 'MPL Event Management',
    'Chennai Events Management': 'MPL Event Management',
    'info@chennaieventmanagementservice.com': 'contact@mplevent.com',
    '+91 98414 35108': '+91 9769511851',
    '+91-98414-35108': '+91-9769511851',
    '98414 35108': '9769511851',
    'Chennai': 'MPL',
    'www.chennaieventmanagementservice.com': 'www.mpleventmanagement.com',
    'Orchestrating Corporate Excellence': 'Seamless Events, Lasting Memories'
}

mpl_dir = 'Event/www.mpleventmanagement.com'

for html_file in glob.glob(f'{mpl_dir}/*.html'):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated: {os.path.basename(html_file)}")

print(f"\nTotal files updated: {len(glob.glob(f'{mpl_dir}/*.html'))}")
