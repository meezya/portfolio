// Data model for portfolio projects.
//
// The home page is a grid of project logos (in the order of `projects` below).
// Each logo links to /work/<slug>, which renders the project's summary, an
// optional deck (cover image linking to a PDF), and an optional gallery of
// images / videos. Clicking a gallery item opens the fullscreen lightbox.
//
// A project with `page: false` shows its logo on the home page but isn't
// linked (for work that doesn't have a case study yet).

// A clickable deck cover that links to a PDF.
export type Deck = {
	pdf: string; // path to the PDF
	preview: string; // cover image
	caption?: string; // bottom-corner label, defaults to "PDF · Read"
	title?: string; // accessible label / tooltip
};

export type GalleryImage = { type: 'image'; src: string; alt?: string };
export type GalleryVideo = { type: 'video'; youtubeId: string; title?: string; thumbnail?: string };
export type GalleryItem = GalleryImage | GalleryVideo;

export type Project = {
	slug: string;
	name: string;
	// Short descriptor shown next to the name on the project page.
	kind: string;
	// White-on-transparent logo in /public/logos. `width` is the display width
	// in px on desktop (the home grid scales it down on small screens).
	logo: { src: string; width: number };
	body: string[];
	// Optional text link rendered below the body (opens in a new tab). Used to
	// link the full written report when the deck is a condensed version.
	link?: { label: string; href: string };
	deck?: Deck;
	gallery?: GalleryItem[];
	// Defaults to true. False = logo only on the home page, no project page.
	page?: boolean;
};

const brand = (file: string, alt = ''): GalleryImage => ({
	type: 'image',
	src: `/projects/brand-works/${file}`,
	alt,
});

export const projects: Project[] = [
	{
		slug: 'lucid-imc',
		name: 'Lucid Motors',
		kind: 'Brand campaign proposal',
		logo: { src: '/logos/lucid.png', width: 414 },
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
			caption: 'Proposal · PDF',
		},
		gallery: [
			{ type: 'image', src: '/projects/lucid-imc/billboard.jpg', alt: 'Lucid Motors billboard, luxury reinvented' },
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
		kind: 'Integrated marketing campaign',
		logo: { src: '/logos/walgreens.png', width: 449 },
		body: [
			'A comprehensive integrated marketing campaign that positions Walgreens as a wellness destination for urban professionals who want fully curated, evidence-based wellness that fits a busy life. Aiming for a balance between mass-market convenience brands and premium niche wellness.',
			'Classical, humanized, warm visual identity. Built to feel like science-backed expertise without the clinical detachment.',
			"Digital, OOH, audio, and in-store zones. App and web carry personalized subscription features. Partnerships extend reach beyond Walgreens' existing footprint.",
		],
		link: { label: 'Read the full campaign proposal', href: '/papers/walgreens-wellness.pdf' },
		deck: {
			pdf: '/papers/walgreens-twc-deck.pdf',
			preview:
				'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/79TT1VHS92ZW2A3VNVJ1YHN5RW.png',
			title: 'View the campaign deck (21 slides)',
			caption: 'Deck · PDF',
		},
		gallery: [
			{ type: 'image', src: '/projects/walgreens-wellness/metro-billboard.jpg', alt: 'The Wellness Club metro billboard, wishing you a safe return' },
			{ type: 'image', src: '/projects/walgreens-wellness/talent.jpg', alt: 'The Wellness Club, the Clarity Kit packaging' },
			{ type: 'image', src: '/projects/walgreens-wellness/tennis-poster.jpg', alt: 'The Wellness Club tennis poster' },
			{ type: 'image', src: '/projects/walgreens-wellness/twc-poster.jpg', alt: 'The Wellness Club poster' },
			{ type: 'image', src: '/projects/walgreens-wellness/bus.jpg', alt: 'The Wellness Club bus shelter ad' },
			{ type: 'image', src: '/projects/walgreens-wellness/under-bridge.jpg', alt: 'The Wellness Club posters under the bridge' },
			{ type: 'image', src: '/projects/walgreens-wellness/metro-ad.jpg', alt: 'The Wellness Club metro ad' },
			{ type: 'image', src: '/projects/walgreens-wellness/booshi.jpg', alt: 'The Wellness Club ad' },
			brand('other-1.png', 'The Clarity Kit packaging'),
			brand('untitled-fum.png', 'The Wellness Club logo lockup'),
			brand('shirt-design.png', 'The Wellness Club shirt design'),
		],
	},
	{
		slug: 'sonos-audit',
		name: 'Sonos',
		kind: 'Brand audit',
		logo: { src: '/logos/sonos.png', width: 419 },
		body: [
			`Brand audit and strategic recommendations for Sonos, examining their position as a challenger in the $23 billion premium audio market against category leader Bose and incoming tech giants. Built on Keller and Swaminathan's brand equity framework, conducted during Sonos's 2024 app crisis when a botched update triggered a 16% revenue drop and lasting trust damage.`,
			`Primary research surfaced an awareness gap along with a positioning misalignment.`,
			`Offered three recommendations: authentic cultural integration across design and music, a "Hear the Difference" campaign that reframes price as an investment in quality of life, and expanded distribution through the Experience Room concept and a certified installer network.`,
		],
		link: { label: 'Read the full brand audit', href: '/papers/sonos-audit.pdf' },
		deck: {
			pdf: '/papers/sonos-audit-deck.pdf',
			preview: '/projects/sonos-audit/deck-cover.png',
			title: 'View the audit deck (18 slides)',
			caption: 'Deck · PDF',
		},
		gallery: [
			{ type: 'image', src: '/projects/sonos-audit/deck-awareness.png', alt: 'Sonos audit deck, awareness findings' },
			{ type: 'image', src: '/projects/sonos-audit/deck-close.png', alt: 'Sonos audit deck, closing slide' },
		],
	},
	{
		slug: 'nothing-research',
		name: 'Nothing',
		kind: 'Brand research study',
		logo: { src: '/logos/nothing.png', width: 468 },
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
			caption: 'Deck · PDF',
		},
		gallery: [
			{ type: 'image', src: '/projects/nothing-research/thesis.png', alt: 'Nothing research deck, thesis slide' },
			{ type: 'image', src: '/projects/nothing-research/awareness.png', alt: 'Nothing research deck, awareness finding' },
		],
	},
	{
		slug: 'sears',
		name: 'Sears',
		kind: 'Coming soon',
		logo: { src: '/logos/sears.png', width: 450 },
		body: [],
		page: false,
	},
	{
		slug: 'drift',
		name: 'Drift',
		kind: 'Content aggregator',
		logo: { src: '/logos/drift.png', width: 295 },
		body: [
			'A personalized content aggregator. A browser that grows with you.',
			'Identity and poster work, alongside the app itself.',
		],
		gallery: [brand('drif-5.png', 'Drift poster, a browser that grows with you'), brand('drif-3.png', 'Drift poster')],
	},
	{
		slug: 'goat',
		name: 'Goat',
		kind: 'Media center app',
		logo: { src: '/logos/goat.png', width: 243 },
		body: [
			'A custom-built media center and game launcher designed for living room PCs.',
			'Console and streaming UI cues, built for 10-foot HTPC viewing. Transparent black and white with glassmorphism. Heavy typography, generous spacing.',
			'Custom player built to render video at the highest quality possible. Reworked controls, timeline, and pause overlay.',
			'Identity, logo, and visual system carried across splash, installer, and product.',
			'Tauri, React, TypeScript, Rust. Full controller and keyboard navigation. TMDB, Trakt, Real-Debrid, and IPTV integration.',
		],
		gallery: [
			{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KREZ03783JHA0KA9KF6G01ZW.png', alt: 'Goat interface' },
			{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KREZ0M0N3NX837C65DWBG2D0.png', alt: 'Goat interface' },
			{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KREZ41F9MNJJ4FZYHJ3Y3FTR.png', alt: 'Goat interface' },
			{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KREZQZ0DV5S9XBXHDEB9Q35X.png', alt: 'Goat interface' },
			brand('goat-icawn.png', 'Goat icon artwork'),
		],
	},
	{
		slug: 'shoplift',
		name: 'Shoplift',
		kind: 'Identity and release artwork',
		logo: { src: '/logos/shoplift.png', width: 442 },
		body: ['Logo, identity, and record sleeve artwork for Shoplift.'],
		gallery: [
			brand('adobe-3.jpg', 'Shoplift wordmark'),
			brand('adobe-4-copy.jpg', 'Shoplift wordmark, chrome'),
			brand('Shop Logo.jpg', 'Shoplift monogram'),
			brand('adobe-4-copy-2.jpg', 'Shoplift record label'),
			brand('adobe-4.jpg', 'Shoplift record label'),
			brand('creative-deep-4.jpg', 'Shoplift record label'),
			brand('creative-image.jpg', 'Shoplift record label'),
			brand('adobe-1.jpg', 'Shoplift record label'),
			brand('adobe-1-copy.jpg', 'Shoplift record label'),
			brand('personalized-website.jpg', 'Shoplift record label'),
			brand('creative-corp.jpg', 'Shoplift release artwork'),
			brand('creative-her-3.jpg', 'Shoplift release artwork'),
		],
	},
	{
		slug: 'healthcare-bystanders',
		name: 'Addressing The Bystanders',
		kind: 'Strategic marketing plan',
		logo: { src: '/logos/sullivan-county.png', width: 398 },
		body: [
			`Strategic plan for an affluent for-profit hospital opening its first satellite clinic in Sullivan County, New York. Rural, underserved, chronic gaps in preventive care and disease management. The challenge is building trust and engagement in a population that healthcare systems typically miss.`,
			`Audience targeting uses two frameworks: Bloem-Stalpers Segment 4 and Deloitte's "Bystanders" segment from "Attract, engage, and build loyalty." Both describe patients who are passive about their health and skeptical of healthcare institutions. Reaching them requires earning trust before asking for engagement.`,
			`Strategy applies Social Cognitive Theory to the design: messaging built around self-efficacy, role modeling, and outcomes patients can recognize in their own lives.`,
			`Three objectives: empower patients, build trust between the clinic and the community, and improve health outcomes in the region.`,
		],
		link: { label: 'Read the full marketing plan', href: '/papers/healthcare-bystanders.pdf' },
		deck: {
			pdf: '/papers/healthcare-clinic-deck.pdf',
			preview: '/projects/healthcare-bystanders/deck-cover.png',
			title: 'View the plan deck (15 slides)',
			caption: 'Deck · PDF',
		},
		gallery: [
			{ type: 'image', src: '/projects/healthcare-bystanders/deck-situation.png', alt: 'Clinic plan deck, situation analysis' },
			{ type: 'image', src: '/projects/healthcare-bystanders/deck-insight.png', alt: 'Clinic plan deck, audience insight' },
		],
	},
	{
		slug: 'bedside',
		name: 'Bedside',
		kind: 'EPUB reader',
		logo: { src: '/logos/bedside.png', width: 299 },
		body: [
			'EPUB reader with a moody, old-library aesthetic. Glassmorphism, film grain, animated gradient backgrounds. Built to feel like an environment, not just a screen.',
			"Candlelight mode illuminates words near your cursor and fades the rest, mimicking the natural focus of reading under a single light source. Per-book settings save independently, so a gothic novel doesn't need to read like a tech manual.",
			'Highlight and save snippets to revisit per book. Annotations, find-in-book search, and text-to-speech all built in.',
			"Library search pulls from Anna's Archive and Z-Library, so almost any book is one query away.",
		],
		gallery: [
			{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF0BMZVY55J956MVNAWB92P.png', alt: 'Bedside reader' },
			{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRHBBQE2ZT1XGABN7FAT7PPC.png', alt: 'Bedside reader' },
			{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRF13XG6MRFTJN8CN8BCH1C4.png', alt: 'Bedside reader' },
			{ type: 'image', src: 'https://app.paper.design/file-assets/01KREYJZZ62W205RMETRV4HR3R/01KRHV8Y4E229XB7R2A9WQ3WR7.png', alt: 'Bedside reader' },
			brand('bruh.png', 'Bedside candle artwork'),
		],
	},
];

export const projectPages = projects.filter((p) => p.page !== false);
