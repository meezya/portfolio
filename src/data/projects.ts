// @ts-ignore — Vite handles the ?raw suffix at build time.
import brandWorksOrderRaw from './brand-works-order.txt?raw';

// Data model for portfolio projects.
//
// A project renders in one of three layouts (see `layout`):
//
//   - 'campaign'  — name above, a left intro column (faded deck cover that links
//                   to the PDF + body copy), and a right horizontal scroll gallery
//                   of every creative execution. Clicking a gallery tile opens the
//                   fullscreen lightbox carousel of the whole campaign's creative.
//   - 'research'  — name above, a single wide deck cover (links to the PDF) on the
//                   left, body copy on the right. No gallery / carousel.
//   - 'collage'   — the original fixed-size collage: a media grid of `tiles` on the
//                   left, a text column (with the name inline) on the right. Used
//                   for the Design & Software projects.
//
// Tiles (collage layout) are discriminated by `type`:
//   - 'image' — a static image. Clicking opens the per-project lightbox carousel.
//   - 'video' — a YouTube video. Thumbnail + play overlay; clicking opens the
//                lightbox with an embedded iframe. Part of the same carousel.
//   - 'pdf'   — a PDF with a preview image. Clicking opens the PDF in a new tab.
//                Not part of the lightbox carousel.

export type BaseTile = {
	// Width / height are required for collage tiles (fixed-size collages).
	width?: number;
	height?: number;
	opacity?: number;
	absolute?: { left: number; top: number };
	// Optional uppercased label rendered in the bottom corner of the tile
	// (e.g. "PDF · Read"). PDF tiles default to "PDF · Read" if not specified.
	caption?: string;
	// Optional inner image frame: matches Paper's "drop the image into a nested
	// frame, cover-fit, then offset" trick. The image renders at frame.width x
	// frame.height with cover-fit, positioned at (frame.left, frame.top) within
	// the tile; the outer tile clips the overflow.
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

// A clickable deck cover that links to a PDF. Used by campaign + research layouts.
export type Deck = {
	pdf: string; // path to the PDF
	preview: string; // cover image
	caption?: string; // bottom-corner label, defaults to "PDF · Read"
	title?: string; // accessible label / tooltip
};

// One creative execution in a campaign gallery. Images and videos flow inside a
// horizontal scroll strip at a fixed height (natural aspect), and together form
// the project's lightbox carousel.
export type GalleryImage = { type: 'image'; src: string; alt?: string };
export type GalleryVideo = { type: 'video'; youtubeId: string; title?: string; thumbnail?: string };
export type GalleryItem = GalleryImage | GalleryVideo;

export type Project = {
	slug: string;
	name: string;
	// Optional per-project heading font + weight to give each project its own
	// visual identity. Falls back to the layout's default serif when omitted.
	headingFont?: string;
	headingWeight?: number;
	body: string[];
	// Optional text link rendered below the body paragraphs (opens in a new tab).
	// Used to link the full written report when the deck is a condensed version.
	link?: { label: string; href: string };
	// Layout variant. Defaults to 'collage'.
	layout?: 'campaign' | 'research' | 'collage';
	// Campaign + research: the deck cover tile (links to the PDF).
	deck?: Deck;
	// Campaign: the creative gallery (horizontal scroll strip + lightbox carousel).
	gallery?: GalleryItem[];
	// Collage: the fixed-size media collage tiles.
	tiles?: Tile[];
};

export type Section = {
	id: string;
	title: string;
	projects: Project[];
	// When 'gallery', the section ignores `projects` and renders `tiles` directly
	// as a horizontal scroll gallery with no per-tile text.
	layout?: 'gallery';
	tiles?: Tile[];
};

// Parse the brand-works manifest into a tile list at build time. Comments (#) and
// blank lines are ignored; each remaining line is one image filename inside
// /public/projects/brand-works/. Reorder by editing the .txt file.
const brandWorksTiles: Tile[] = String(brandWorksOrderRaw)
	.split('\n')
	.map((line) => line.split('#')[0].trim())
	.filter((line) => line.length > 0)
	.map((filename) => ({ type: 'image' as const, src: `/projects/brand-works/${filename}` }));

export const sections: Section[] = [
	{
		id: 'research',
		title: 'Research',
		projects: [
			{
				slug: 'lucid-imc',
				name: 'Lucid Motors',
				headingFont: 'Suranna',
				headingWeight: 400,
				layout: 'campaign',
				body: [
					'A brand campaign proposal for Lucid Motors, positioning the company as the next evolution of luxury, where innovation and refinement become inseparable.',
					"Aimed at professionals 30 to 45 who're skeptical of tech-bro culture and unmoved by traditional luxury's predictability.",
					'Positioning, audience strategy, creative direction, mood board, and channel executions across print, digital, billboard, and a hero anthem film.',
				],
				deck: {
					pdf: '/papers/lucid-imc.pdf',
					preview:
						'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/2WY5356T3XMBFV9ACY9D05AEHQ.png',
					title: 'Read the full proposal (17 pages)',
					caption: 'Pdf · Read',
				},
				gallery: [
					{ type: 'image', src: '/projects/lucid-imc/billboard.jpg', alt: 'Lucid Motors billboard — luxury, reinvented' },
					{ type: 'video', youtubeId: 'vknPd9PfvMs', title: 'Anthem :60', thumbnail: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRHYEY7RK2WWR2RZAGX2K13X.png' },
					{ type: 'image', src: '/projects/lucid-imc/print-1.jpg', alt: 'Lucid Motors print ad' },
					{ type: 'image', src: '/projects/lucid-imc/ooh.jpg', alt: 'Lucid Motors out-of-home placement' },
					{ type: 'image', src: '/projects/lucid-imc/carousel-1.jpg', alt: 'Lucid Motors social carousel, frame 1' },
					{ type: 'image', src: '/projects/lucid-imc/carousel-2.jpg', alt: 'Lucid Motors social carousel, frame 2' },
					{ type: 'image', src: '/projects/lucid-imc/carousel-3.jpg', alt: 'Lucid Motors social carousel, frame 3' },
					{ type: 'image', src: '/projects/lucid-imc/carousel-4.jpg', alt: 'Lucid Motors social carousel, frame 4' },
					{ type: 'image', src: '/projects/lucid-imc/digital.jpg', alt: 'Lucid Motors digital ad' },
					{ type: 'image', src: '/projects/lucid-imc/digital-print.jpg', alt: 'Lucid Motors digital print ad' },
					{ type: 'image', src: '/projects/lucid-imc/print-alt.jpg', alt: 'Lucid Motors print ad, alternate' },
				],
			},
			{
				slug: 'walgreens-wellness',
				name: 'Walgreens',
				headingFont: 'Suranna',
				headingWeight: 400,
				layout: 'campaign',
				body: [
					'A comprehensive integrated marketing campaign that positions Walgreens as a wellness destination for urban professionals who want fully curated, evidence-based wellness that fits a busy life. Aiming for a balance between mass-market convenience brands and premium niche wellness.',
					'Classical, humanized, warm visual identity. Built to feel like science-backed expertise without the clinical detachment.',
					"Digital, OOH, audio, and in-store zones. App and web carry personalized subscription features. Partnerships extend reach beyond Walgreens' existing footprint.",
				],
				link: { label: 'Read Full Campaign Proposal Here', href: '/papers/walgreens-wellness.pdf' },
				deck: {
					pdf: '/papers/walgreens-twc-deck.pdf',
					preview:
						'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/79TT1VHS92ZW2A3VNVJ1YHN5RW.png',
					title: 'View the campaign deck (21 slides)',
					caption: 'Pdf · Read',
				},
				gallery: [
					{ type: 'image', src: '/projects/walgreens-wellness/metro-billboard.jpg', alt: 'The Wellness Club metro billboard — wishing you a safe return' },
					{ type: 'image', src: '/projects/walgreens-wellness/talent.jpg', alt: 'The Wellness Club — the Clarity Kit packaging' },
					{ type: 'image', src: '/projects/walgreens-wellness/tennis-poster.jpg', alt: 'The Wellness Club tennis poster' },
					{ type: 'image', src: '/projects/walgreens-wellness/twc-poster.jpg', alt: 'The Wellness Club poster' },
					{ type: 'image', src: '/projects/walgreens-wellness/bus.jpg', alt: 'The Wellness Club bus shelter ad' },
					{ type: 'image', src: '/projects/walgreens-wellness/under-bridge.jpg', alt: 'The Wellness Club posters under the bridge' },
					{ type: 'image', src: '/projects/walgreens-wellness/metro-ad.jpg', alt: 'The Wellness Club metro ad' },
					{ type: 'image', src: '/projects/walgreens-wellness/booshi.jpg', alt: 'The Wellness Club ad' },
				],
			},
			{
				slug: 'sonos-audit',
				name: 'Sonos',
				headingFont: 'STSong',
				headingWeight: 300,
				layout: 'research',
				body: [
					`Brand audit and strategic recommendations for Sonos, examining their position as a challenger in the $23 billion premium audio market against category leader Bose and incoming tech giants. Built on Keller and Swaminathan's brand equity framework, conducted during Sonos's 2024 app crisis when a botched update triggered a 16% revenue drop and lasting trust damage.`,
					`Primary research surfaced an awareness gap along with a positioning misalignment.`,
					`Offered three recommendations: authentic cultural integration across design and music, a "Hear the Difference" campaign that reframes price as an investment in quality of life, and expanded distribution through the Experience Room concept and a certified installer network.`,
				],
				link: { label: 'Read Full Brand Audit Here', href: '/papers/sonos-audit.pdf' },
				deck: {
					pdf: '/papers/sonos-audit-deck.pdf',
					preview: '/projects/sonos-audit/deck-cover.png',
					title: 'View the audit deck (18 slides)',
					caption: 'Pdf · Read',
				},
			},
			{
				slug: 'nothing-research',
				name: 'Nothing',
				headingFont: 'STSong',
				headingWeight: 300,
				layout: 'research',
				body: [
					'Brand research study for Nothing, the London-based challenger smartphone brand, examining what stands between its design-led niche success and mainstream adoption.',
					'Mixed methods: secondary market analysis, a quantitative survey fielded across the UK, India, and US, and a proposed round of depth interviews with aware non-buyers.',
					"The survey surfaced one number that matters more than the rest: 44% of respondents don't know enough about Nothing to consider buying one. Awareness, not product, is the barrier.",
					'Findings and recommendations packaged as a 16-slide research deck.',
				],
				deck: {
					pdf: '/papers/nothing-research-deck.pdf',
					preview: '/projects/nothing-research/cover.png',
					title: 'View the research deck (16 slides)',
					caption: 'Pdf · Read',
				},
			},
			{
				slug: 'healthcare-bystanders',
				name: 'Addressing The Bystanders',
				headingFont: 'STSong',
				headingWeight: 300,
				layout: 'research',
				body: [
					`Strategic plan for an affluent for-profit hospital opening its first satellite clinic in Sullivan County, New York. Rural, underserved, chronic gaps in preventive care and disease management. The challenge is building trust and engagement in a population that healthcare systems typically miss.`,
					`Audience targeting uses two frameworks: Bloem-Stalpers Segment 4 and Deloitte's "Bystanders" segment from "Attract, engage, and build loyalty." Both describe patients who are passive about their health and skeptical of healthcare institutions. Reaching them requires earning trust before asking for engagement.`,
					`Strategy applies Social Cognitive Theory to the design: messaging built around self-efficacy, role modeling, and outcomes patients can recognize in their own lives.`,
					`Three objectives: empower patients, build trust between the clinic and the community, and improve health outcomes in the region.`,
				],
				link: { label: 'Read Full Marketing Plan Here', href: '/papers/healthcare-bystanders.pdf' },
				deck: {
					pdf: '/papers/healthcare-clinic-deck.pdf',
					preview: '/projects/healthcare-bystanders/deck-cover.png',
					title: 'View the plan deck (15 slides)',
					caption: 'Pdf · Read',
				},
			},
		],
	},
	{
		id: 'work',
		title: 'Design & Software',
		projects: [
			{
				slug: 'goat',
				name: 'Goat',
				headingFont: 'STSong',
				headingWeight: 300,
				layout: 'collage',
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
				],
			},
			{
				slug: 'bedside',
				name: 'Bedside',
				headingFont: 'STSong',
				headingWeight: 300,
				layout: 'collage',
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
		id: 'brand-works',
		title: 'Design & Brand Work',
		layout: 'gallery',
		projects: [],
		// Tiles come from src/data/brand-works-order.txt — drag lines around in
		// that file to reorder; the order shown at runtime is whatever the
		// manifest dictates at build time.
		tiles: brandWorksTiles,
	},
];
