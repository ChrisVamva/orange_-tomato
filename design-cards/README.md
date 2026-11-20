# Character reference set

The canonical character reference for Orange Tomato and Miri the Researcher.

These are **reference images**, not site content. They live here, at the repository root
and **not** in `public/`, for two reasons: nothing on the site references them, and
anything inside `public/` is copied verbatim into `dist/` by every local build — which is
how 4.3 MB of untracked artwork was riding into the build output until 2026-11-20.

| File | Size | Dimensions | Master |
|---|---|---|---|
| `orange-tomato-character-design-sheet.webp` | 366,272 B | 2000×1116 | `Retro Character Design Sheet.jpg` (2752×1536) |
| `orange-tomato-researcher-duo.webp` | 353,480 B | 1536×1024 | `Retro-Futuristic Researcher Duo(1).png` (1536×1024, transparent) |

**The masters are not in this repository.** They are preserved byte-for-byte, with their
SHA-256, in the vault:

```
Editorial Audits SEO and Personality/Plan/Artwork/Source Originals/design-cards/
  Retro Character Design Sheet.jpg          sha256 431554874e116534d62f83e50cf9e326fe49f44b69393a42c4347b35646a33ce
  Retro-Futuristic Researcher Duo(1).png     sha256 ee467b89b9f649743107c5258337af28ad0232045b7ce96f452915a15a0ef0a5
```

Vault root: `C:\Users\user\Documents\Obsidian Vaults\Orange Tomato`

The character description these images carry is `Orange Tomato/Visual Identity/Artwork
Production Spec.md` §1.1. **The images are the source of truth for the characters; the
section describes them.** Two characters exist and no other description is valid.

The exports were produced by the `orange-tomato-artwork-release` skill
(`.agents/skills/orange-tomato-artwork-release/`) from the release config
`Editorial Audits SEO and Personality/Plan/Artwork/Releases/design-cards/release-config.json`;
the measurements are in that release's record.

Re-derive, do not hand-edit: change the config, re-run the skill's scripts, and replace
these files with the measured output.
