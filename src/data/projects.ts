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
				body: [
					'A Mac EPUB reader with a moody, old-library aesthetic. Glassmorphism, film grain, gradient controls.',
					'Candlelight mode illuminates words near your cursor and fades the rest. Per-book settings let you tune the environment to each text.',
					"Annotations and text-to-speech built in. Library search pulls from Anna's Archive and Z-Library.",
				],
				tiles: [
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF0BMZVY55J956MVNAWB92P.png', width: 534, height: 349 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF1A2664HK0F61VKJ5KYGQY.png', width: 297, height: 349 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF13XG6MRFTJN8CN8BCH1C4.png', width: 382, height: 413 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF0D11MHP8DJ29S6M591FVZ.png', width: 448, height: 223 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF136MZVBZHFNEVCX0DZ8Q1.png', width: 448, height: 164, absolute: { left: 406, top: 622 } },
				],
			},
		],
	},
	{
		id: 'research',
		title: 'Research',
		projects: [
			// Grad school case studies go here. Example shape with a PDF tile:
			//
			// {
			//   slug: 'imc-thesis',
			//   name: 'Thesis on something',
			//   body: ['Abstract paragraph.', 'Second paragraph.'],
			//   tiles: [
			//     { type: 'image', src: '/projects/imc-thesis/cover.jpg', width: 400, height: 500 },
			//     { type: 'pdf', pdf: '/papers/imc-thesis.pdf', preview: '/projects/imc-thesis/preview.jpg', width: 400, height: 500, title: 'Read the full paper' },
			//   ],
			// },
		],
	},
];
