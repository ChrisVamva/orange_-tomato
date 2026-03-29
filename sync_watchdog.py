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

    array_pattern = re.compile(r'(export const watchdogEntries: WatchdogEntry\[\] = \[)(.*?)(\];)', re.DOTALL)
    match = array_pattern.search(content)
    
    if not match:
        print("❌ Error: Could not find watchdogEntries array.")
        return

    prefix, existing_entries, suffix = match.groups()
    
    # CLEANUP LOGIC: Ensure the last entry has a comma before adding a new one
    existing_clean = existing_entries.strip()
    if existing_clean and not existing_clean.endswith(','):
        existing_clean += ','
    
    # Format new entry
    new_entry_str = json.dumps(new_tool_json, indent=2)
    formatted_entry = "\n  " + new_entry_str.replace('\n', '\n  ')
    
    # Reassemble
    updated_content = f"{prefix}\n  {existing_clean}{formatted_entry}\n{suffix}"
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"✅ Success: '{new_tool_json['name']}' injected cleanly.")

# No changes needed to the payload area below...