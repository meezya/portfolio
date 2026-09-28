# Works content

Drop your work in these folders. The build reads this directory, extracts each
piece's dominant color, derives its palette (ground / ink / accent, light or
dark for legibility), and generates the index automatically. You never pick a
color by hand.

## Structure

```
public/works/
  <category>/
    a-single-image-work.jpg        ← one image  = one work
    a-multi-image-work/            ← a folder    = one work with a gallery
      cover.jpg                    ← primary (colors the swatch + fills the viewer)
      02.jpg
      03.jpg
```

Categories (fixed, in nav order):
`research, print, posters, packaging, logo, digital, audio, video`

## Rules

- A **loose image file** in a category folder = a single-image work.
- A **subfolder** in a category folder = one work; every image inside is its
  gallery (the click-to-enlarge set). The image named `cover.*`, or the first
  one alphabetically, is the primary image that colors the swatch and shows in
  the viewer.
- **Order:** prefix names with `01-`, `02-`, … to control the order. The prefix
  is stripped from the displayed title.
- **Title:** taken from the file/folder name (dashes and underscores become
  spaces, title-cased). Want exact wording or punctuation? add a `title.txt`
  next to the work containing the title on one line.

## Audio & video

- `audio/<work>/` — a `cover.*` image (this is what colors the swatch) plus an
  audio file (`.mp3` / `.wav`).
- `video/<work>/` — a `poster.*` image plus a video file (`.mp4`), or a
  `link.txt` containing a YouTube / Vimeo URL.
