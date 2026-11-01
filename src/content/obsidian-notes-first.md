# Notes first: the plain habit that later becomes an agent's memory

![Two cartoon characters sit on an open notebook page, one writing with a crayon while the other holds the page.](/images/obsidian-series-slot1-notes.png)

## One note, opened as text

Here is a note, opened in the least impressive program on the machine: a plain text window.

```markdown
---
title: Sample project
status: active
effort: 3
reviewed: false
due: 2026-11-09
tags:
  - work
  - agents
---

# Sample project

A note can carry structure in plain text. This links to [[reading-note]] and to
[a markdown link](../inbox/2026-11-01%20idea%20log.md).

An embedded image: ![[sample-image.png]]
```

That is the entire object. No sidebar, no graph, no search index, no highlight on the sentence about
structure. What a note-taking application shows you about a note like this — the notes that point at it,
the tags that group it, the position it holds in a network of ideas — is produced somewhere else, at
another moment, by software that reads these characters and adds something of its own.

We wrote this note for one reason: to look at what a vault contains when the app is not part of the
picture. It sits in a four-note folder built to the documented file formats, copied with an ordinary file
copy, and read with tools that know nothing about note-taking. The check is small on purpose. Its limits
matter more than its results, so they are stated at the end rather than buried.

## What the habit is actually producing

Nothing in that window looks like infrastructure, which is why the question is easy to miss. Keeping
notes is usually described as a personal matter — a way of remembering, or of thinking — and the software
is described as the convenience wrapped around it. Once a second reader arrives, the useful question
changes. Not "is this a good note system" but "what in these files can something other than me use".

This is the first piece in a set about what a vault has to be before agents can work over it, and its
answer is narrower than the slogan the set could turn into. A habit of this kind produces three things: text that can be read, names and locations that can be followed, and the person's own
record of why a note exists. None of the three requires an application. Whether they are also what a
colleague, a script, or an agent can work with is the claim this article argues from the evidence and
then tests, not something the documentation establishes. What the application contributes sits on another
layer: conventions that make the text mean something, and views computed from it on demand.

That gives the set its starting position, and it is this publication's view rather than a finding about
readers: notes come first, the question of who else can reach them comes next, and agents come
after that. What the first stage builds is the floor the later ones stand on, and the floor has
to be examined before anything is built over it.

## What is claimed

Obsidian's documentation is unusually direct about where the notes live. "Obsidian stores your notes as
Markdown-formatted plain text files in a vault. A vault is a folder on your local file system, including
any subfolders," the help page says, adding that "you can use other text editors and file managers to
edit and manage notes."

That sentence describes storage. It does not claim the folder is worth much, and it makes no promise
about machine readers. The step that needs testing is the quiet one in the middle: whether notes
organised for a person's own recall already produce something a second reader can use. Anyone who has
copied a folder of notes to another machine and found them intact has run the storage half of that test
by accident. What nobody watches for is what the file loses on the way out.

## Three readers, one note

Start with the assets, because each one fails differently later.

**Text.** A note is Markdown-formatted plain text, and the documentation says so plainly. In the
copy we read, headings, bullet lists, a table, an image embed and a block reference were all literal
characters. Nothing needed a parser built for note-taking; a text editor showed everything.

**Names and locations.** The folder says `projects/notes/`, the file is called `reading-note.md`, and
other notes refer to it by name with double brackets. That is a location a person navigates and a name a
program can follow. Obsidian supports two link formats — `[[name]]` and a Markdown path — and generates
wikilinks by default because they are compact.

**Context.** Properties carry the structured part: a status, a due date, a review flag, a couple of tags.
The documentation describes them as "structured data such as text, links, dates, checkboxes, and
numbers". The prose around them carries the rest: what this project is, why the note was
written, which assumption was being checked.

The application adds something different in kind. Configuration for this vault lives in a `.obsidian`
folder at its root, which holds preferences "specific to that vault, such as hotkeys, themes, and
community plugins". Settings that belong to the application instead of the vault do not travel:
Obsidian keeps global settings in a system folder, which on Windows is `%APPDATA%\Obsidian\`. A
copied vault arrives with its local conventions and without its environment.

The larger contribution is computation. Obsidian keeps "a local record of metadata about the files in
your vault called the metadata cache", the documentation says, and that cache "powers many things across
the app, from the Graph view to the Outline view". Backlinks, search, the graph, the outline:
all of it is derived from the files, and the same page admits the cache can drift out of sync with them.

So one note has three readers. The person inside the app sees the note and everything computed around
it. Anyone with a text editor sees the note. A future agent sees whatever it can parse, and the app's
layer is not in front of it.

![A hand-drawn notebook diagram with one note at the centre, read three ways: by a person inside the app, by anyone with a text editor, and by a future agent. Two note cards record the app's computed layer and what a copy of the files actually contained.](/diagrams/obsidian-notes-first-three-readers.svg)

*Diagram: one file, three readers. The note is the same object for all of them; what the app adds — conventions and a computed layer — is what the readers outside it have to reconstruct.*

## What the copy contains

The check is easy to describe. Four notes in eight folders, one image, one CSV, a handful of
configuration files, all built to the documented formats. Copied. Then read only the copy, with a
directory walk, plain text reads, a hand-written frontmatter parse, and a byte read for the image. No
plugin, no SDK, no API.

The text layer held up completely. Nothing in the four notes was opaque.

Properties came back as strings. The file says `effort: 3`, and reading it with a script produces the
three characters `3`. Whether that is a number, a string that looks like a number, or a date fragment is
a decision the application makes, and the documentation is explicit that the decision lives at vault
level: "Once a property type is assigned to a property name, all properties with that name across your
vault will use the same type". The file keeps the value and hands the meaning to a setting.

Links were the sharpest result. One note linked to `[[a-note-that-does-not-exist]]`. Read as text, it is
indistinguishable from the links that work. Nothing raised an error, because nothing was resolving
anything: resolution is the application's name lookup, and a reader of the copy has to bring its own.
The Markdown-format link in the same note needed two conventions before a path test succeeded — the path
is relative to the note that contains it, and the space is encoded as `%20`. We got that wrong on the
first pass, and the rerun caught it: resolving the same link from the note's own folder worked, which
meant the failure had two causes.

The configuration files parsed as ordinary JSON. `app.json` held a single setting, `alwaysUpdateLinks`,
set to true. `workspace.json` described open tabs and the active one, legible as data and meaningless
outside the application. The attachment read back as bytes with a valid PNG signature in the first eight
of them.

None of this is dramatic. From inside the app, a dead wikilink is invisible on purpose: the note it
points to could be written tomorrow. That tolerance is a feature of the interface and a gap in the file.

## Where the habit stops

Three things do not survive the copy, and each one narrows the claim.

The first is type. Values travel; the rules for reading them stay behind. A tool that wants to know
whether `effort: 3` is a number can guess from the shape of the text, and guessing is what it will be
doing.

The second is resolution. A link is a string until something looks it up. That is true of the dead link
and true of every live one, and it means link integrity after a rename depends on behaviour the
application performs: in the copy, an `alwaysUpdateLinks` flag sat switched on in `app.json`.

The third is repair. Obsidian's own documentation says the metadata cache can fall out of sync with the
underlying files and can be rebuilt from settings. Whatever the computed layer shows, it is a
product with a refresh cycle, and it lives on the application's side of the boundary.

Two limits belong here as well, because they are easy to slide over. A disciplined convention — the same
property names in every note, no dead links, one folder per purpose — puts much of the missing structure
back. This check says nothing about who
may read a vault, what happens when two writers collide, or how a person recovers afterwards. Access,
conflict and recovery are separate problems with separate evidence, and none of them was tested here.

## Three questions a reader can carry

The boundary is easy to state and awkward to act on, so here are three questions that follow directly
from what the copy showed. None has a correct answer this article can supply.

**If you renamed a folder tomorrow, would your links survive?** The files cannot answer. Your
application can, and it does, through a setting you may never have looked at.

**Do two notes use the same word for the same thing?** A property called `status` in one note and
`state` in the next reads as two different things to anything scanning the folder, including you in a
year. The value survives; the agreement is what makes it usable.

**Is the reason a note exists written inside the note?** Text and names can be reconstructed by a careful
reader. Intent cannot. The sentence that explains why the note was kept is the part no parse recovers.

## What holds, and what does not

The plain layer is real. Notes kept as files are readable without the application, portable across
machines, and complete at the level of text. That much is established by the documentation and confirmed
by reading a copy.

What does not hold is sufficiency. The habit supplies text, names and context; the application supplies
conventions and computed state; and the second list is what a reader without the app has to reconstruct.
A vault can be perfectly legible and still answer nothing, because the meaning was stored in settings
and agreement rather than in the files.

Two developments would move the boundary. If a tool inferred property types reliably and repaired or
flagged dead links on its own, the loss would shrink toward the trivial. If it did not, the person's
consistency would keep doing the work no application can do for them.

The habit tells you what your notes are for. It does not tell you who else can reach them, which is a
different question with a different evidence base — and the one that arrives as soon as a program is
invited to read.

## Sources and method

Documentation: Obsidian Help at help.obsidian.md — *How Obsidian stores data*, *Configuration folder*,
*Properties*, *Tags*, *Internal links*, *Attachments*, *Search*, *Backlinks*, and *Graph view*, all read on
2026-11-01 and quoted from the rendered pages. The installed desktop release on the machine used for the check was
1.8.9; the help pages describe the current product line, so where a statement matters for the installed
release it is reported as the documentation's current wording rather than as a version-specific
observation.

The check: four notes and seven other files, purpose-built to the documented formats on 2026-11-01, copied with a plain filesystem copy, and read with a directory walk, plain text
reads, a hand-written frontmatter parse, and a byte read. The application was installed and running on
the machine, on a different vault, and was never pointed at the copy. One machine, one release, one
operator, four notes: the check shows what those files contained, and no more.

Basis statement: the workspace the series draws on holds several hundred Markdown notes, sixteen
community plugins including a local REST API and an MCP tools plugin, and desktop release 1.8.9.
The figures are banded deliberately, no note titles or contents were read for this article, and the
workspace belongs to this publication's editor, who also operates the agent tooling the later parts of
the series describe.

The position stated in the second section is the publication's own for this series, agreed at the
briefing stage on 2026-11-01.
