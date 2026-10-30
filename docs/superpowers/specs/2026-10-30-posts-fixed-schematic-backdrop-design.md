# Posts Page Fixed Schematic Backdrop Design

- **Intent:** Use the generated robot schematic as a refined visual backdrop for the Orange Tomato homepage.
- **Goals:** Apply the illustration as a fixed, viewport-sized background on the Posts route, visible behind the existing video and article feed. Keep article titles and metadata readable with a subtle parchment surface behind the list. Adjust the image crop on narrow screens so the mascot remains visible.
- **Non-goals:** Do not replace the video, change article content or order, alter the header, or apply the illustration to other routes.
- **Approaches:** (1) A fixed viewport background keeps the composition stable while the long feed scrolls. (2) A scrolling page background moves the crop with the article content. **Selected: approach 1**, for a consistent homepage backdrop.
- **Constraints and builder calls:** Use the supplied `Tomato Robot Blueprint Concept Art.png` as source and provide a web-optimized derivative for loading efficiency. Scope styling to the Posts view. Keep the hero unobstructed; use a translucent parchment backing for the article list, with a darker corresponding backing in dark mode. Tune mobile positioning and preserve the source asset.
- **Acceptance:** The homepage shows the schematic behind the video and article feed; the backdrop remains fixed during scroll; the robot stays visible in desktop and mobile layouts; article text remains legible in light and dark themes. Other routes are unchanged. Existing build and lint checks pass.
