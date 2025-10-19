import { Sidebar } from '@/components/layout/sidebar';

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<main className='flex-1 overflow-auto md:pl-20'>{children}</main>
		</div>
	);
}
