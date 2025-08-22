export const runtime = 'edge';

export async function GET() {
	const svg = `<?xml version="1.0" encoding="UTF-8"?>
	<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="32" height="32" rx="8" fill="#111827"/>
		<text x="16" y="21" text-anchor="middle" font-size="14" fill="#fff" font-family="Arial">DTU</text>
	</svg>`;
	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
}
