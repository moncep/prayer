import os
import zipfile
import json
import re

MAL_ZIP_PATH = r"C:\Users\monce\Downloads\MalBackup.zip"
TARGET_DIR = r"C:\Users\monce\.gemini\antigravity\scratch\prayer-app"
DATA_DIR = os.path.join(TARGET_DIR, "src", "data")
PUBLIC_DIR = os.path.join(TARGET_DIR, "public")
IMAGES_CAT_DIR = os.path.join(PUBLIC_DIR, "images", "categories")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(IMAGES_CAT_DIR, exist_ok=True)

def clean_html_content(raw_html):
    if not raw_html:
        return ""
    
    cleaned = re.sub(r'<!DOCTYPE[^>]*>', '', raw_html, flags=re.IGNORECASE)
    cleaned = re.sub(r'<html[^>]*>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'</html>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<head>.*?</head>', '', cleaned, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r'<body[^>]*>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'</body>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<meta[^>]*>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<link[^>]*>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<audio[^>]*>.*?</audio>', '', cleaned, flags=re.IGNORECASE | re.DOTALL)
    
    # Remove hardcoded inline colors that break dark mode
    cleaned = re.sub(r'style="[^"]*(color|background)[^"]*"', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'color="[^"]*"', '', cleaned, flags=re.IGNORECASE)
    
    return cleaned.strip()

def extract_malayalam_prayers():
    print(f"Opening {MAL_ZIP_PATH}...")
    with zipfile.ZipFile(MAL_ZIP_PATH, 'r') as z:
        file_list = z.namelist()
        lower_map = {f.lower(): f for f in file_list}
        
        # 1. Parse PMData.json (Sections & Subsections)
        pm_data_raw = z.read("PMData.json").decode("utf-8")
        pm_data = json.loads(pm_data_raw)
        
        # 2. Parse PMFileList.json (SubSection -> Prayer List)
        pm_file_list_raw = z.read("PMFileList.json").decode("utf-8")
        pm_file_list = json.loads(pm_file_list_raw)
        
        # Extract all category images into public/images/categories/
        for fname in file_list:
            if fname.startswith("__MACOSX"):
                continue
            base = os.path.basename(fname)
            if (fname.startswith("ImageAssets/") or fname.startswith("HtmlAssets/")) and base.endswith((".jpg", ".png")):
                out_path = os.path.join(IMAGES_CAT_DIR, base)
                try:
                    with open(out_path, "wb") as out_f:
                        out_f.write(z.read(fname))
                except Exception as e:
                    pass

        def read_html_asset(filename):
            candidates = [
                f"HtmlAssets/{filename}",
                f"HtmlAssets/{filename}.html",
                f"{filename}",
                f"{filename}.html"
            ]
            for cand in candidates:
                if cand in file_list:
                    return z.read(cand).decode("utf-8", errors="ignore")
                cand_lower = cand.lower()
                if cand_lower in lower_map:
                    return z.read(lower_map[cand_lower]).decode("utf-8", errors="ignore")
            return ""

        # Read Happy, Light, Sad, Mahima for Rosary full text
        happy_text = clean_html_content(read_html_asset("Happy.html"))
        
        sections = []
        all_prayers = []
        prayer_id_counter = 1
        
        prayer_data = pm_data.get("prayerData", {})
        for sec_key, sec_val in prayer_data.items():
            sec_id = sec_val.get("sID", sec_key)
            sec_name = sec_val.get("sName", "").strip()
            
            # Map This Month to Rosary in Malayalam
            if sec_id == "SEC01" or sec_name == "ഈ മാസത്തെ പ്രാർത്ഥനകൾ":
                sec_name = "വിശുദ്ധ ജപമാല"
                
            sec_type = sec_val.get("sType", "Standard")
            
            subsections = []
            sub_dict = sec_val.get("subSections", {})
            for sub_key, sub_val in sub_dict.items():
                sub_id = sub_val.get("subID", sub_key)
                sub_title = sub_val.get("subTitle", "").strip()
                if sub_id == "SEC08SUB04" or "വിഭവങ്ങൾ" in sub_title:
                    continue
                if sec_id == "SEC01":
                    sub_title = "വിശുദ്ധ ജപമാല"
                    
                sub_image = sub_val.get("subImage", "")
                if sec_id == "SEC01":
                    sub_image = "Rosary.jpg"
                    
                prayer_type = sub_val.get("prayerType", "Basic")
                
                items = pm_file_list.get(sub_id, [])
                parsed_prayers = []
                
                for item in items:
                    f_name = item.get("fileName", "").strip()
                    d_name = item.get("displayName", f_name).strip()
                    if sec_id == "SEC01" and d_name in ["The Holy Rosary", "Welcome"]:
                        d_name = "വിശുദ്ധ ജപമാല"
                        
                    f_type = item.get("fileType", "HTML")
                    
                    prayer_id = f"ml_{prayer_id_counter}"
                    prayer_id_counter += 1
                    
                    series_days = []
                    content = ""
                    
                    if f_type in ["HTML", "VANAKKAM", "SUKRUTHAM"]:
                        raw_content = read_html_asset(f_name)
                        content = clean_html_content(raw_content)
                    elif f_type == "FIFTYTHREE":
                        # Holy Rosary in Malayalam
                        raw_content = read_html_asset(f_name)
                        if not raw_content or len(raw_content.strip()) < 20:
                            raw_content = read_html_asset("Happy.html")
                        content = clean_html_content(raw_content)
                    elif f_type == "SERIES":
                        total_days = int(item.get("totalDays", "9"))
                        for day in range(1, total_days + 1):
                            day_file = f"{f_name}{day}"
                            day_raw = read_html_asset(day_file)
                            if not day_raw:
                                day_file = f"{f_name}_{day}"
                                day_raw = read_html_asset(day_file)
                            day_clean = clean_html_content(day_raw)
                            series_days.append({
                                "day": day,
                                "title": f"ദിവസം {day}",
                                "content": day_clean
                            })
                        raw_content = read_html_asset(f_name)
                        content = clean_html_content(raw_content)
                    elif f_type == "PDF":
                        content = f"<h1>{d_name}</h1><p>ഈ പ്രാർത്ഥന ഒരു വിശുദ്ധ പുസ്തക രൂപത്തിൽ ലഭ്യമാണ്.</p>"
                    
                    prayer_obj = {
                        "id": prayer_id,
                        "fileName": f_name,
                        "title": d_name,
                        "type": f_type,
                        "sectionId": sec_id,
                        "sectionName": sec_name,
                        "subSectionId": sub_id,
                        "subSectionTitle": sub_title,
                        "content": content,
                        "seriesDays": series_days,
                        "language": "ml"
                    }
                    
                    parsed_prayers.append(prayer_obj)
                    all_prayers.append(prayer_obj)
                
                subsections.append({
                    "id": sub_id,
                    "title": sub_title,
                    "image": sub_image,
                    "prayerType": prayer_type,
                    "prayerCount": len(parsed_prayers),
                    "prayerIds": [p["id"] for p in parsed_prayers]
                })
            
            sections.append({
                "id": sec_id,
                "name": sec_name,
                "type": sec_type,
                "subsections": subsections
            })
            
        # Omit non-prayer utility sections like Preference, Other Apps, Settings, or empty sections
        sections = [
            s for s in sections 
            if s['id'] not in ['SEC09', 'SEC10', 'SEC11'] 
            and s['name'].lower() not in ['settings', 'preference', 'other apps']
            and sum(sub['prayerCount'] for sub in s['subsections']) > 0
        ]

        dataset = {
            "language": "ml",
            "appData": pm_data.get("appData", {}),
            "stats": {
                "totalSections": len(sections),
                "totalSubSections": sum(len(s["subsections"]) for s in sections),
                "totalPrayers": len(all_prayers)
            },
            "sections": sections,
            "prayers": all_prayers
        }
        
        output_file = os.path.join(DATA_DIR, "malayalam_prayers.json")
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(dataset, f, ensure_ascii=False, indent=2)
            
        print(f"Successfully extracted {len(all_prayers)} Malayalam prayers into {output_file}!")
        print(f"Stats: {dataset['stats']}")

if __name__ == "__main__":
    extract_malayalam_prayers()
