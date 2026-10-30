import os
import zipfile
import json
import re

ENG_ZIP_PATH = r"C:\Users\monce\Downloads\EngBackup.zip"
TARGET_DIR = r"C:\Users\monce\.gemini\antigravity\scratch\prayer-app"
DATA_DIR = os.path.join(TARGET_DIR, "src", "data")
PUBLIC_DIR = os.path.join(TARGET_DIR, "public")
IMAGES_ROSARY_DIR = os.path.join(PUBLIC_DIR, "images", "rosary")
IMAGES_CAT_DIR = os.path.join(PUBLIC_DIR, "images", "categories")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(IMAGES_ROSARY_DIR, exist_ok=True)
os.makedirs(IMAGES_CAT_DIR, exist_ok=True)

def clean_html_content(raw_html):
    if not raw_html:
        return ""
    
    # Remove DOCTYPE, html, head, body tags
    cleaned = re.sub(r'<!DOCTYPE[^>]*>', '', raw_html, flags=re.IGNORECASE)
    cleaned = re.sub(r'<html[^>]*>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'</html>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<head>.*?</head>', '', cleaned, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r'<body[^>]*>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'</body>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<meta[^>]*>', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'<link[^>]*>', '', cleaned, flags=re.IGNORECASE)
    
    # Clean inline font color or hardcoded background colors that ruin dark mode
    cleaned = re.sub(r'style="[^"]*(color|background)[^"]*"', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'color="[^"]*"', '', cleaned, flags=re.IGNORECASE)
    
    # Remove extraneous whitespace
    cleaned = cleaned.strip()
    return cleaned

def extract_english_prayers():
    print(f"Opening {ENG_ZIP_PATH}...")
    with zipfile.ZipFile(ENG_ZIP_PATH, 'r') as z:
        file_list = z.namelist()
        lower_map = {f.lower(): f for f in file_list}
        
        # 1. Parse PMData.json (Sections & Subsections)
        pm_data_raw = z.read("PMData.json").decode("utf-8")
        pm_data = json.loads(pm_data_raw)
        
        # 2. Parse PMFileList.json (SubSection -> Prayer List)
        pm_file_list_raw = z.read("PMFileList.json").decode("utf-8")
        pm_file_list = json.loads(pm_file_list_raw)
        
        # 3. Extract Rosary and Category Images
        for fname in file_list:
            if fname.startswith("__MACOSX"):
                continue
            base = os.path.basename(fname)
            if not base:
                continue
            
            # Rosary images: joy*.jpg, lite*.jpg, sorrow*.jpg, glori*.jpg
            if any(base.startswith(pfx) for pfx in ["joy", "lite", "sorrow", "glori"]) and base.endswith((".jpg", ".png")):
                out_path = os.path.join(IMAGES_ROSARY_DIR, base)
                with open(out_path, "wb") as out_f:
                    out_f.write(z.read(fname))
                    
            # Category images
            elif fname.startswith("ImageAssets/") and base.endswith((".jpg", ".png")):
                out_path = os.path.join(IMAGES_CAT_DIR, base)
                with open(out_path, "wb") as out_f:
                    out_f.write(z.read(fname))
                    
        # Helper to find file in HtmlAssets
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

        # 4. Build Structured Dataset
        sections = []
        all_prayers = []
        prayer_id_counter = 1
        
        prayer_data = pm_data.get("prayerData", {})
        for sec_key, sec_val in prayer_data.items():
            sec_id = sec_val.get("sID", sec_key)
            sec_name = sec_val.get("sName", "").strip()
            if sec_name == "This Month" or sec_id == "SEC01":
                sec_name = "Rosary"
            sec_type = sec_val.get("sType", "Standard")
            
            subsections = []
            sub_dict = sec_val.get("subSections", {})
            for sub_key, sub_val in sub_dict.items():
                sub_id = sub_val.get("subID", sub_key)
                sub_title = sub_val.get("subTitle", "").strip()
                if sub_title == "Welcome" and sec_id == "SEC01":
                    sub_title = "The Holy Rosary"
                sub_image = sub_val.get("subImage", "")
                if sec_id == "SEC01":
                    sub_image = "Rosary.jpg"
                prayer_type = sub_val.get("prayerType", "Basic")
                
                # Fetch items for this subsection
                items = pm_file_list.get(sub_id, [])
                parsed_prayers = []
                
                for item in items:
                    f_name = item.get("fileName", "").strip()
                    d_name = item.get("displayName", f_name).strip()
                    f_type = item.get("fileType", "HTML")
                    
                    prayer_id = f"eng_{prayer_id_counter}"
                    prayer_id_counter += 1
                    
                    series_days = []
                    content = ""
                    
                    if f_type == "HTML":
                        raw_content = read_html_asset(f_name)
                        content = clean_html_content(raw_content)
                    elif f_type == "FIFTYTHREE":
                        # Rosary - also read the companion text
                        raw_content = read_html_asset(f_name)
                        if not raw_content:
                            raw_content = read_html_asset("The Holy Rosary")
                        content = clean_html_content(raw_content)
                    elif f_type == "SERIES":
                        total_days = int(item.get("totalDays", "9"))
                        # Extract each day
                        for day in range(1, total_days + 1):
                            day_file = f"{f_name}{day}"
                            day_raw = read_html_asset(day_file)
                            day_clean = clean_html_content(day_raw)
                            series_days.append({
                                "day": day,
                                "title": f"Day {day}",
                                "content": day_clean
                            })
                        # Main intro content
                        raw_content = read_html_asset(f_name)
                        content = clean_html_content(raw_content)
                    
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
                        "language": "en"
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
            
        # Omit non-prayer utility sections like Settings
        sections = [s for s in sections if s['name'].lower() != 'settings' and sum(sub['prayerCount'] for sub in s['subsections']) > 0]

        dataset = {
            "language": "en",
            "appData": pm_data.get("appData", {}),
            "stats": {
                "totalSections": len(sections),
                "totalSubSections": sum(len(s["subsections"]) for s in sections),
                "totalPrayers": len(all_prayers)
            },
            "sections": sections,
            "prayers": all_prayers
        }
        
        output_file = os.path.join(DATA_DIR, "english_prayers.json")
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(dataset, f, ensure_ascii=False, indent=2)
            
        print(f"Successfully extracted {len(all_prayers)} English prayers into {output_file}!")
        print(f"Stats: {dataset['stats']}")

if __name__ == "__main__":
    extract_english_prayers()
