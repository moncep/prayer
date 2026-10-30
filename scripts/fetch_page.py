import urllib.request
import re

url = 'https://valappy.blogspot.com/p/japamala.html'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Search for post-body
match = re.search(r'<div[^>]*class=["\'][^"\']*(?:post-body|entry-content)[^"\']*["\'][^>]*>(.*?)<div style=["\']clear: both', html, re.DOTALL)
if match:
    body = match.group(1)
    # replace br and p
    body = re.sub(r'<br\s*/?>', '\n', body)
    body = re.sub(r'</p>', '\n\n', body)
    body = re.sub(r'<[^>]+>', '', body)
    with open('scraped_japamala.txt', 'w', encoding='utf-8') as f:
        f.write(body.strip())
    print('Found and saved post-body! Length:', len(body))
else:
    print('Could not find post-body pattern directly.')
    with open('raw_page.html', 'w', encoding='utf-8') as f:
        f.write(html)
