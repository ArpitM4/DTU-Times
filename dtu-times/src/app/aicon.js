// Next.js expects a Response for /icon metadata route, not a React component.
export default function Icon() {
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
		<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="32" height="32" rx="8" fill="#a63c1a"/>
			<text x="16" y="21" text-anchor="middle" font-size="16" fill="white" font-family="sans-serif">DT</text>
		</svg>`,
		{
			headers: {
				'Content-Type': 'image/svg+xml',
			},
		}
	);
}
