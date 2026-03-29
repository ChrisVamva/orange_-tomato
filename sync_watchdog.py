import json
import os
import re

def sync_tool(new_tool_json):
    file_path = 'src/data/watchdog.ts'
    
    if not os.path.exists(file_path):
        print(f"❌ Error: {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match the array inside 'export const watchdogEntries: WatchdogEntry[] = [...];'
    array_pattern = re.compile(r'(export const watchdogEntries: WatchdogEntry\[\] = \[)(.*?)(\];)', re.DOTALL)
    match = array_pattern.search(content)
    
    if not match:
        print("❌ Error: Could not find watchdogEntries array in watchdog.ts")
        return

    prefix, existing_entries, suffix = match.groups()
    
    # Format new entry
    new_entry_str = json.dumps(new_tool_json, indent=2)
    formatted_entry = "\n  " + new_entry_str.replace('\n', '\n  ') + ","
    
    # Reassemble and write
    updated_content = prefix + existing_entries.rstrip() + formatted_entry + "\n" + suffix
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"✅ Success: '{new_tool_json['name']}' injected into Watchdog DB.")

# --- THE SKYVERN PAYLOAD ---
skyvern_data = {
  "id": "skyvern-001",
  "name": "Skyvern",
  "category": "browser",
  "disruption": "Vision-based browser automation that bypasses DOM selectors entirely.",
  "tomatoScore": 9,
  "status": "emerging",
  "techDNA": ["open-source", "computer-vision", "agent-native"],
  "description": "An open-source browser automation engine that uses LLMs and Computer Vision to execute workflows on any website without hardcoded scripts.",
  "founded": "2023",
  "lastUpdated": "2026-03-29",
  "threatLevel": "high"
}

if __name__ == "__main__":
    sync_tool(skyvern_data)