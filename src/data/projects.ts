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
	// Width / height are required for project tiles (fixed-size collages). They
	// are optional for gallery tiles, which flow inside a CSS columns layout
	// and take their column's width with natural aspect-driven height.
	width?: number;
	height?: number;
	opacity?: number;
	absolute?: { left: number; top: number };
	// Optional uppercased label rendered in the bottom corner of the tile
	// (e.g. "PDF · Read", "Tv Spot · watch"). PDF tiles default to "PDF · Read"
	// if not specified.
	caption?: string;
	// Optional inner image frame: matches Paper's "drop the image into a
	// nested frame, cover-fit, then offset" trick. The image renders at
	// frame.width x frame.height with cover-fit (preserves aspect ratio),
	// positioned at (frame.left, frame.top) within the tile. The outer
	// tile clips anything that overflows. When omitted the image cover-fits
	// the whole tile directly.
	frame?: { width: number; height: number; left: number; top: number };
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
	// Optional layout override. When 'gallery', the section ignores `projects`
	// and renders `tiles` directly as a sprawling masonry collage with no
	// per-tile text or articles.
	layout?: 'gallery';
	tiles?: Tile[];
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
				headingFont: 'STSong',
				headingWeight: 300,
				body: [
					'A brand campaign proposal for Lucid Motors, positioning the company as the next evolution of luxury, where innovation and refinement become inseparable.',
					"Aimed at professionals 30 to 45 who're skeptical of tech-bro culture and unmoved by traditional luxury's predictability.",
					'Positioning, audience strategy, creative direction, mood board, and channel executions across print, digital, billboard, and a hero anthem film.',
					'WVU Reed College of Media. December 2024.',
				],
				tiles: [
					{
						type: 'pdf',
						pdf: '/papers/lucid-imc.pdf',
						preview:
							'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/2WY5356T3XMBFV9ACY9D05AEHQ.png',
						width: 540,
						height: 304,
						opacity: 0.4,
						title: 'Read the full proposal (17 pages)',
						caption: 'Pdf · Read',
					},
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRHVMPG96WAAGFG8MSPQMRW5.png', width: 300, height: 304 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/6V90JW4BXCX63E6M7D1BVS94DE.png', width: 430, height: 242 },
					{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/3WHMF5Z04HABST9D96MWM5JEJV.png', width: 410, height: 242 },
					{
						type: 'video',
						youtubeId: 'vknPd9PfvMs',
						thumbnail: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRHYEY7RK2WWR2RZAGX2K13X.png',
						width: 390,
						height: 253,
						opacity: 0.24,
						title: 'Anthem :60',
						caption: 'Tv Spot · watch',
					},
				],
			},
			{
				slug: 'walgreens-wellness',
				name: 'Walgreens: The Wellness Club',
				headingFont: 'STSong',
				headingWeight: 300,
				body: [
					'A comprehensive integrated marketing campaign proposal that positions Walgreens as a wellness destination for urban professionals who want fully curated, evidence-based wellness that fits a busy life. Aiming for a balance between mass-market convenience brands and premium niche wellness.',
					'Classical, humanized, warm visual identity. Built to feel like science-backed expertise without the clinical detachment.',
					"Digital, OOH, audio, and in-store zones. App and web carry personalized subscription features. Partnerships extend reach beyond Walgreens' existing footprint.",
					'WVU Reed College of Media. April 2025.',
				],
				tiles: [
					{
						type: 'image',
						src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/70YMX5FQ612S9XHVDJNZT7JKPB.png',
						width: 540,
						height: 304,
						frame: { width: 562, height: 453, left: 0, top: -149 },
					},
					{
						type: 'image',
						src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRJ15HE46MCJ4ANZTJK4V0KP.png',
						width: 300,
						height: 304,
						frame: { width: 313, height: 377, left: -7, top: -27 },
					},
					{
						type: 'image',
						src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/41ZSXPGHD2QX6BJ5JK42EHNNX4.png',
						width: 430,
						height: 242,
						frame: { width: 658, height: 334, left: -63, top: -37 },
					},
					{
						type: 'image',
						src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRJ1GQM066WPEBMVJZS93VWZ.png',
						width: 398,
						height: 242,
						frame: { width: 495, height: 391, left: -17, top: -66 },
					},
					{
						type: 'image',
						src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/066WR73PMBWJ2MX7RRK7HD6K4D.png',
						width: 450,
						height: 253,
						frame: { width: 449, height: 243, left: -10, top: 0 },
					},
					{
						type: 'pdf',
						pdf: '/papers/walgreens-wellness.pdf',
						preview:
							'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/79TT1VHS92ZW2A3VNVJ1YHN5RW.png',
						width: 390,
						height: 253,
						opacity: 0.4,
						title: 'Read the full report (45 pages)',
						caption: 'Pdf · Read',
					},
				],
			},
			{
				slug: 'healthcare-bystanders',
				name: 'Addressing The Bystanders: An Integrated Marketing Plan for Launching a Satellite Clinic in Rural Sullivan County, New York',
				headingFont: 'STSong',
				headingWeight: 300,
				body: [
					`Strategic plan for an affluent for-profit hospital opening its first satellite clinic in Sullivan County, New York. Rural, underserved, chronic gaps in preventive care and disease management. The challenge is building trust and engagement in a population that healthcare systems typically miss.`,
					`Audience targeting uses two frameworks: Bloem-Stalpers Segment 4 and Deloitte's "Bystanders" segment from "Attract, engage, and build loyalty." Both describe patients who are passive about their health and skeptical of healthcare institutions. Reaching them requires earning trust before asking for engagement.`,
					`Strategy applies Social Cognitive Theory to the design: messaging built around self-efficacy, role modeling, and outcomes patients can recognize in their own lives.`,
					`Three objectives: empower patients, build trust between the clinic and the community, and improve health outcomes in the region.`,
				],
				tiles: [
					{ type: 'image', src: '/projects/healthcare-bystanders/preview-1.webp', width: 540, height: 304 },
					{ type: 'image', src: '/projects/healthcare-bystanders/preview-2.jpg', width: 300, height: 304 },
					{ type: 'image', src: '/projects/healthcare-bystanders/preview-3.png', width: 410, height: 242 },
					{
						type: 'pdf',
						pdf: '/papers/healthcare-bystanders.pdf',
						preview: '/projects/healthcare-bystanders/preview-1.webp',
						width: 430,
						height: 242,
						opacity: 0.4,
						title: 'Read the full plan',
						caption: 'Pdf · Read',
					},
				],
			},
		],
	},
	{
		id: 'brand-works',
		title: 'Selected Brand Works',
		layout: 'gallery',
		projects: [],
		tiles: [
			{ type: 'image', src: '/projects/brand-works/adobe-1.jpg' },
			{ type: 'image', src: '/projects/brand-works/creative-corp.jpg' },
			{ type: 'image', src: '/projects/brand-works/adobe-3.jpg' },
			{ type: 'image', src: '/projects/brand-works/creative-image.jpg' },
			{ type: 'image', src: '/projects/brand-works/personalized-website.jpg' },
			{ type: 'image', src: '/projects/brand-works/adobe-4.jpg' },
			{ type: 'image', src: '/projects/brand-works/creative-deep-4.jpg' },
			{ type: 'image', src: '/projects/brand-works/adobe-1-copy.jpg' },
			{ type: 'image', src: '/projects/brand-works/creative-her-3.jpg' },
			{ type: 'image', src: '/projects/brand-works/adobe-4-copy.jpg' },
			{ type: 'image', src: '/projects/brand-works/other-1.png' },
			{ type: 'image', src: '/projects/brand-works/shirt-design.png' },
			{ type: 'image', src: '/projects/brand-works/adobe-4-copy-2.jpg' },
			{ type: 'image', src: '/projects/brand-works/drif-3.png' },
			{ type: 'image', src: '/projects/brand-works/goat-icawn.png' },
			{ type: 'image', src: '/projects/brand-works/bruh.png' },
			{ type: 'image', src: '/projects/brand-works/drif-5.png' },
			{ type: 'image', src: '/projects/brand-works/untitled-fum.png' },
		],
	},
];
