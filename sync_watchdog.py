import json
import os
import re

# --- CONFIGURATION ---
TARGET_FILE = "src/data/watchdog.ts"

def validate_entry(entry):
    """Brutalist Validation: No ID, No Entry."""
    required = ["id", "name", "tomatoScore"]
    for key in required:
        if key not in entry:
            raise ValueError(f"CRITICAL: Missing '{key}' in payload.")
    print(f"✔️ Validated: {entry['name']}")

def sync():
    if not os.path.exists(TARGET_FILE):
        print(f"❌ Error: {TARGET_FILE} not found.")
        return

    with open(TARGET_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # 2. FUZZY REGEX: Finds the array even with TS types or line breaks
    # Looks for 'watchdogEntries... = [' and grabs until the final '];'
    match = re.search(r'watchdogEntries.*?\=\s*(\[.*\]);?', content, re.DOTALL)
    
    if not match:
        print("❌ Error: Could not find 'watchdogEntries' array.")
        return

    array_str = match.group(1).strip()
    if array_str.endswith(';'): array_str = array_str[:-1]

    try:
        # We use a literal_eval style clean-up if JSON fails, 
        # but for now, we assume the Reset in Step 1 worked.
        current_data = json.loads(array_str)
    except json.JSONDecodeError as e:
        print(f"❌ Data Corruption Detected: {e}")
        return

    # 3. UPDATE LOGIC
    validate_entry(new_tool)
    # Remove old version of the tool if it exists
    updated_data = [item for item in current_data if item['id'] != new_tool['id']]
    updated_data.append(new_tool)

    # 4. RECONSTRUCT
    new_json = json.dumps(updated_data, indent=2)
    # Re-insert the new JSON into the exact spot the old one was
    final_content = content[:match.start(1)] + new_json + content[match.end(1):]

    with open(TARGET_FILE, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print(f"🚀 MISSION SUCCESS: '{new_tool['name']}' is live.")

# --- PAYLOAD AREA ---
new_tool = {
  "id": "browser-use-026",
  "name": "Browser-use",
  "category": "logic",
  "disruption": "Total displacement of selector-based Selenium/Playwright suites.",
  "tomatoScore": 9,
  "status": "active",
  "techDNA": ["open-source", "vision-native"],
  "description": "The state-of-the-art framework for agent-native web interaction.",
  "founded": "2024",
  "lastUpdated": "2026-03-30"
}

if __name__ == "__main__":
    sync()