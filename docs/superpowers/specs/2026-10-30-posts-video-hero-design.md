# Posts Page Video Hero Design

- **Intent:** Replace the introductory marketing block at the top of the Posts page with the supplied “The arrival of Orange Tomato” video.
- **Goals:** Present the video as the focus in a clean, responsive 16:9 player within the existing content width. Let visitors start, pause, seek, and control playback using native video controls.
- **Non-goals:** Do not change the header, article list, pagination, routes, or video contents. Do not autoplay or loop the video.
- **Approaches:** (1) A clean responsive player replacing the intro block directly. (2) A player inside the current orange-accented hero frame. **Selected: approach 1**, for a quieter presentation that puts the video first.
- **Constraints and builder calls:** Use the existing `public/Video/The arrival of Orange Tomato.mp4`; retain inline playback on mobile and provide an accessible video label. Keep the existing page container width and spacing. Leave title and metadata content unchanged.
- **Acceptance:** The Posts page intro copy is replaced by a 16:9 video player using the supplied file. Playback is user-initiated with controls; the article list and pagination remain unchanged and existing build/lint checks pass.
