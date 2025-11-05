import type { Metadata } from 'next';
import { Inter, Doto, Instrument_Serif } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from '@/components/providers';
import Navbar from '@/components/navigation/navbar';
import { generateMetadata } from '@/lib/utils';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

const doto = Doto({
	weight: ['400', '500', '700'],
	variable: '--font-doto',
});

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
	weight: ['400'],
	variable: '--font-instrument-serif',
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${doto.variable} ${inter.className} ${instrumentSerif.variable} antialiased font-sans`}
			>
				<Providers>
					<Navbar />
					{children}
				</Providers>
				<VercelAnalytics />
			</body>
		</html>
	);
}
