import type { Metadata } from 'next';
import PlaygroundClient from './playground-client';

export const metadata: Metadata = {
	title: 'Playground',
	description:
		'Interactive playground to explore and customize components in real-time. Test various component states and configurations.',
};

export default function PlaygroundPage() {
	return <PlaygroundClient />;
}
