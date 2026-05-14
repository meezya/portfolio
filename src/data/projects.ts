// Data model for portfolio projects.
//
// Each project has a `tiles` array. Tiles are discriminated by `type`:
//   - 'image' — a static image. Clicking opens the per-project lightbox carousel.
//   - 'video' — a YouTube video. Shows a thumbnail with a play overlay; clicking opens
//                the lightbox with an embedded YouTube iframe. Part of the same carousel
//                as image tiles for that project.
//   - 'pdf'   — a PDF document with a preview image. Clicking opens the PDF in a new tab.
//                Not part of the lightbox carousel.
//
// All tiles share width/height/opacity, and an optional `absolute` position for
// overlapping collage layouts (relative to the project's media frame).

export type BaseTile = {
	width: number;
	height: number;
	opacity?: number;
	absolute?: { left: number; top: number };
};

export type ImageTile = BaseTile & {
	type: 'image';
	src: string;
	alt?: string;
};

export type VideoTile = BaseTile & {
	type: 'video';
	youtubeId: string;
	title?: string;
	// Optional override; defaults to YouTube's maxresdefault thumbnail.
	thumbnail?: string;
};

export type PdfTile = BaseTile & {
	type: 'pdf';
	pdf: string; // URL or path to the PDF file
	preview: string; // URL or path to a preview image (e.g. cover page export)
	title?: string;
};

export type Tile = ImageTile | VideoTile | PdfTile;

export type Project = {
	slug: string;
	name: string;
	// Optional per-project heading font + weight to give each section its own
	// visual identity. Falls back to the layout's default serif when omitted.
	headingFont?: string;
	headingWeight?: number;
	body: string[];
	tiles: Tile[];
};

export type Section = {
	id: string;
	title: string;
	projects: Project[];
};

export const sections: Section[] = [
	{
		id: 'work',
		title: 'Work',
		projects: [
			{
				slug: 'goat',
				name: 'Goat',
				headingFont: 'STSong',
				headingWeight: 300,
				body: [
					'A custom-built media center and game launcher designed for living room PCs.',
					'Console and streaming UI cues, built for 10-foot HTPC viewing. Transparent black and white with glassmorphism. Heavy typography, generous spacing.',
					'Custom player built to render video at the highest quality possible. Reworked controls, timeline, and pause overlay.',
					'Identity, logo, and visual system carried across splash, installer, and product.',
					'Tauri, React, TypeScript, Rust. Full controller and keyboard navigation. TMDB, Trakt, Real-Debrid, and IPTV integration.',
				],
				tiles: [
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KREZ03783JHA0KA9KF6G01ZW.png', width: 377, height: 296 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KREZ0M0N3NX837C65DWBG2D0.png', width: 444, height: 296, opacity: 0.73 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KREZ41F9MNJJ4FZYHJ3Y3FTR.png', width: 377, height: 206, opacity: 0.75 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KREZQZ0DV5S9XBXHDEB9Q35X.png', width: 444, height: 200, opacity: 0.67 },
					// To add the video ad, drop a tile like:
					// { type: 'video', youtubeId: 'YOUR_YOUTUBE_ID', width: 444, height: 250, title: 'Goat launch ad' },
				],
			},
			{
				slug: 'bedside',
				name: 'Bedside',
				headingFont: 'STSong',
				headingWeight: 300,
				body: [
					'EPUB reader with a moody, old-library aesthetic. Glassmorphism, film grain, animated gradient backgrounds. Built to feel like an environment, not just a screen.',
					"Candlelight mode illuminates words near your cursor and fades the rest, mimicking the natural focus of reading under a single light source. Per-book settings save independently, so a gothic novel doesn't need to read like a tech manual.",
					'Highlight and save snippets to revisit per book. Annotations, find-in-book search, and text-to-speech all built in.',
					"Library search pulls from Anna's Archive and Z-Library, so almost any book is one query away.",
				],
				tiles: [
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF0BMZVY55J956MVNAWB92P.png', width: 534, height: 349 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRHBBQE2ZT1XGABN7FAT7PPC.png', width: 297, height: 349 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF13XG6MRFTJN8CN8BCH1C4.png', width: 382, height: 254 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRHV8Y4E229XB7R2A9WQ3WR7.png', width: 448, height: 254 },
				],
			},
		],
	},
	{
		id: 'research',
		title: 'Research',
		projects: [
			{
				slug: 'lucid-imc',
				name: 'Lucid Motors: New Luxury',
				body: [
					'IMC 515 capstone. A brand campaign proposal for Lucid Motors, positioning the company as the next evolution of luxury, where innovation and refinement become inseparable.',
					"Aimed at professionals 30 to 45 who're skeptical of tech-bro culture and unmoved by traditional luxury's predictability.",
					'Positioning, audience strategy, creative direction, mood board, and channel executions across print, digital, billboard, and a hero anthem film.',
					'WVU Reed College of Media. December 2024.',
				],
				tiles: [
					{ type: 'image', src: '/projects/lucid-imc/cover.png', width: 540, height: 304, alt: 'Cover: Luxury, Reimagined' },
					{ type: 'image', src: '/projects/lucid-imc/big-idea.png', width: 300, height: 304, alt: 'The Big Idea: This is New Luxury' },
					{ type: 'image', src: '/projects/lucid-imc/mood-board.png', width: 430, height: 242, alt: 'Mood board' },
					{ type: 'image', src: '/projects/lucid-imc/print.png', width: 410, height: 242, alt: 'Print executions' },
					{ type: 'video', youtubeId: 'vknPd9PfvMs', thumbnail: '/projects/lucid-imc/film-thumb.jpg', width: 450, height: 253, title: 'Anthem :60' },
					{ type: 'pdf', pdf: '/papers/lucid-imc.pdf', preview: '/projects/lucid-imc/cover.png', width: 390, height: 253, title: 'Read the full proposal (17 pages)' },
				],
			},
		],
	},
];
