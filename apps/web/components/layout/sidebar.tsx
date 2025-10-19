'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ProgressiveBlur from '../animate/progessive-blur';
import Logo from './logo';
import { cn } from '@craft/ui/lib/utils';

interface NavLink {
	label: string;
	href: string;
	tag?: 'new' | 'updated' | 'beta';
}

interface NavSection {
	title: string;
	links: NavLink[];
}

const navigationData: NavSection[] = [
	{
		title: 'Components',
		links: [
			{ label: 'Action Bar', href: '/playground', tag: 'new' },
			{
				label: 'Gooey Search Bar',
				href: '/playground/gooey-search-bar',
				tag: 'new',
			},
			{
				label: 'Hexagonal Background',
				href: '/playground/hexagonal-bg',
			},
			{ label: 'Avatar Group', href: '/playground/avatar' },
			{
				label: 'Password Validation',
				href: '/playground/password-validation',
			},
			{ label: 'Card Component', href: '/playground/card', tag: 'beta' },
			{ label: 'Modal Dialog', href: '/playground/modal' },
			{ label: 'Tooltip', href: '/playground/tooltip', tag: 'updated' },
			{ label: 'Dropdown Menu', href: '/playground/dropdown' },
		],
	},
	{
		title: 'Buttons & Interactions',
		links: [
			{ label: 'Animated Buttons', href: '/playground/buttons' },
			{ label: 'Toggle Switches', href: '/playground/toggles' },
			{ label: 'Hover Effects', href: '/playground/hover-effects' },
			{ label: 'Ripple Effect', href: '/playground/ripple', tag: 'new' },
			{ label: 'Loading Buttons', href: '/playground/loading-buttons' },
			{ label: 'Button Groups', href: '/playground/button-groups' },
		],
	},
	{
		title: 'Forms & Inputs',
		links: [
			{ label: 'Input Variants', href: '/playground/inputs' },
			{ label: 'Form Elements', href: '/playground/forms' },
			{ label: 'File Upload', href: '/playground/file-upload' },
			{ label: 'Select Dropdown', href: '/playground/select', tag: 'updated' },
			{ label: 'Radio Buttons', href: '/playground/radio' },
			{ label: 'Checkboxes', href: '/playground/checkboxes' },
			{ label: 'Date Picker', href: '/playground/date-picker', tag: 'beta' },
		],
	},
	{
		title: 'Navigation',
		links: [
			{ label: 'Tabs', href: '/playground/tabs' },
			{ label: 'Breadcrumbs', href: '/playground/breadcrumbs' },
			{ label: 'Pagination', href: '/playground/pagination' },
			{ label: 'Navbar', href: '/playground/navbar', tag: 'new' },
		],
	},
	{
		title: 'Feedback',
		links: [
			{ label: 'Toast Notifications', href: '/playground/toast', tag: 'new' },
			{ label: 'Alert Messages', href: '/playground/alerts' },
			{ label: 'Progress Bars', href: '/playground/progress' },
			{ label: 'Skeleton Loaders', href: '/playground/skeleton', tag: 'beta' },
		],
	},
	{
		title: 'Data Display',
		links: [
			{ label: 'Tables', href: '/playground/tables' },
			{ label: 'Lists', href: '/playground/lists' },
			{ label: 'Badges', href: '/playground/badges', tag: 'updated' },
			{ label: 'Chips', href: '/playground/chips' },
		],
	},
];

// Reusable components
type ProgressiveBlurProps = {
	className?: string;
	backgroundColor?: string;
	position?: 'top' | 'bottom';
	height?: string;
	blurAmount?: string;
};

function TagBadge({ tag }: { tag: 'new' | 'updated' | 'beta' }) {
	const tagStyles = {
		new: 'bg-emerald-500/20 text-emerald-500',
		updated: 'bg-blue-500/20 text-blue-500',
		beta: 'bg-orange-500/20 text-orange-500',
	};

	return (
		<span className={cn('text-[10px] px-1.5 py-0.5 rounded-md font-medium', tagStyles[tag])}>
			{tag}
		</span>
	);
}

function SectionDivider() {
	return (
		<>
			<span className='bg-foreground/20 block h-[1px] w-[32px] transition-all duration-300' />
			<span className='bg-foreground/20 block h-[1px] w-[32px] mt-2 transition-all duration-300' />
			<span className='bg-foreground/20 block h-[1px] w-[32px] mt-2 transition-all duration-300' />
			<span className='bg-foreground/20 block h-[1px] w-[32px] mt-2  transition-all duration-300' />
		</>
	);
}

function SectionTitle({
	title,
	sectionIndex,
	isMobile = false,
}: {
	title: string;
	sectionIndex: number;
	isMobile?: boolean;
}) {
	const delayMultiplier = isMobile ? 0.05 : 0.1;
	const baseDelay = isMobile ? 0.1 : 0.2;
	const duration = isMobile ? 0.2 : 0.3;

	return (
		<>
			<div className='group relative flex h-px cursor-default items-center gap-3 mb-2'>
				<motion.span
					className='bg-foreground inline-block h-[1px]'
					initial={{ width: 0 }}
					animate={{ width: 32 }}
					transition={{
						duration: isMobile ? 0.3 : 0.4,
						delay: sectionIndex * delayMultiplier + baseDelay,
						ease: 'easeOut',
					}}
				/>
				<span
					className={cn(
						'whitespace-nowrap text-foreground font-medium',
						isMobile
							? 'opacity-100'
							: 'blur-md group-hover/sidebar:blur-none opacity-0 group-hover/sidebar:opacity-100 transition-all duration-500 ease-out'
					)}
				>
					{title}
				</span>{' '}
			</div>{' '}
			<motion.span
				className='bg-foreground/20 block h-[1px] w-[32px] mb-2'
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{
					duration,
					delay: sectionIndex * delayMultiplier + baseDelay,
				}}
				style={{ transformOrigin: 'left' }}
			/>
			<motion.span
				className='bg-foreground/20 block h-[1px] w-[32px] '
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{
					duration,
					delay: sectionIndex * delayMultiplier + baseDelay,
				}}
				style={{ transformOrigin: 'left' }}
			/>
		</>
	);
}

function NavLinkItem({
	link,
	sectionIndex,
	linkIndex,
	isMobile = false,
	hoveredLink,
	setHoveredLink,
	onClick,
	currentPath,
}: {
	link: NavLink;
	sectionIndex: number;
	linkIndex: number;
	isMobile?: boolean;
	hoveredLink: string | null;
	setHoveredLink: (href: string | null) => void;
	onClick?: () => void;
	currentPath: string;
}) {
	const delayMultiplier = isMobile ? 0.05 : 0.1;
	const linkDelayMultiplier = isMobile ? 0.03 : 0.05;
	const baseDelay = isMobile ? 0.2 : 0.3;
	const duration = isMobile ? 0.2 : 0.3;
	const isCurrent = currentPath === link.href;

	return (
		<motion.div
			key={link.href}
			initial={{ opacity: 0, x: -10 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration,
				delay: sectionIndex * delayMultiplier + linkIndex * linkDelayMultiplier + baseDelay,
				ease: 'easeOut',
			}}
		>
			<Link
				href={link.href}
				className='group relative flex h-px cursor-pointer items-center gap-3 py-2'
				onMouseEnter={() => !isMobile && setHoveredLink(link.href)}
				onMouseLeave={() => !isMobile && setHoveredLink(null)}
				onClick={onClick}
			>
				<span
					className={cn(
						'inline-block h-[1px] bg-foreground/20 transition-all duration-300 ease-out',
						!isMobile && 'group-hover:bg-emerald-500',
						isCurrent && 'bg-emerald-500',
						isMobile && 'w-[32px]',
						!isMobile && (hoveredLink === link.href || isCurrent) && 'w-[55px]',
						!isMobile && !(hoveredLink === link.href || isCurrent) && 'w-[32px]'
					)}
				/>
				<span
					className={cn(
						'whitespace-nowrap transition-all ease-out flex items-center gap-2',
						isMobile ? 'duration-300' : 'duration-500',
						isCurrent
							? 'text-emerald-500 opacity-0 group-hover/sidebar:opacity-100'
							: isMobile
								? 'opacity-100 group-hover:text-emerald-500'
								: 'opacity-0 group-hover/sidebar:opacity-40 group-hover:text-emerald-500 group-hover:opacity-100 blur-md group-hover/sidebar:blur-none',
						!isMobile && 'group-hover:text-emerald-500 group-hover:opacity-100'
					)}
				>
					{link.label}
					{link.tag && <TagBadge tag={link.tag} />}
				</span>
			</Link>
			<motion.span
				className='bg-foreground/20 block h-[1px] w-[32px] mb-2'
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{
					duration,
					delay: sectionIndex * delayMultiplier + linkIndex * linkDelayMultiplier + baseDelay,
				}}
				style={{ transformOrigin: 'left' }}
			/>
			<motion.span
				className='bg-foreground/20 block h-[1px] w-[32px] '
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{
					duration,
					delay: sectionIndex * delayMultiplier + linkIndex * linkDelayMultiplier + baseDelay,
				}}
				style={{ transformOrigin: 'left' }}
			/>
		</motion.div>
	);
}

function NavigationSection({
	section,
	sectionIndex,
	isMobile = false,
	hoveredLink,
	setHoveredLink,
	onLinkClick,
	currentPath,
}: {
	section: NavSection;
	sectionIndex: number;
	isMobile?: boolean;
	hoveredLink: string | null;
	setHoveredLink: (href: string | null) => void;
	onLinkClick?: () => void;
	currentPath: string;
}) {
	return (
		<motion.div
			key={section.title}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: isMobile ? 0.3 : 0.5,
				delay: sectionIndex * (isMobile ? 0.05 : 0.1),
				ease: 'easeOut',
			}}
		>
			<SectionTitle
				title={section.title}
				sectionIndex={sectionIndex}
				isMobile={isMobile}
			/>

			{section.links.map((link, linkIndex) => (
				<NavLinkItem
					key={link.href}
					link={link}
					sectionIndex={sectionIndex}
					linkIndex={linkIndex}
					isMobile={isMobile}
					hoveredLink={hoveredLink}
					setHoveredLink={setHoveredLink}
					onClick={onLinkClick}
					currentPath={currentPath}
				/>
			))}

			{sectionIndex < navigationData.length - 1 && <SectionDivider />}
		</motion.div>
	);
}

function MobileMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className='group fixed top-6 left-6 z-50 md:hidden p-2 rounded-2xl bg-foreground/5 backdrop-blur-md  hover:bg-foreground/10 transition-colors'
			aria-label='Toggle navigation menu'
			aria-expanded={isOpen}
		>
			<svg
				strokeWidth='1.5'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='h-5 w-5'
			>
				<path
					d={isOpen ? 'M6 18L18 6' : 'M3 5H11'}
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d={isOpen ? 'M6 6L18 18' : 'M3 12H16'}
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M3 19H21'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
					style={{ opacity: isOpen ? 0 : 1 }}
				/>
			</svg>
		</button>
	);
}

function Overlay({
	isVisible,
	onClick,
	isMobile = false,
}: {
	isVisible: boolean;
	onClick?: () => void;
	isMobile?: boolean;
}) {
	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: isMobile ? 0.3 : 0.5 }}
					className={cn(
						'fixed inset-0 backdrop-blur-md',
						isMobile
							? 'bg-background/95 z-30 md:hidden'
							: 'bg-background/80 pointer-events-none z-30 hidden md:block'
					)}
					onClick={onClick}
				/>
			)}
		</AnimatePresence>
	);
}

export function Sidebar() {
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);
	const [isSidebarHovered, setIsSidebarHovered] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<>
			<MobileMenuButton
				isOpen={isMobileMenuOpen}
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			/>

			<Overlay
				isVisible={isMobileMenuOpen}
				onClick={() => setIsMobileMenuOpen(false)}
				isMobile={true}
			/>

			<Overlay
				isVisible={isSidebarHovered}
				isMobile={false}
			/>

			{/* Desktop Sidebar */}
			<motion.aside
				initial={{ x: -20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='fixed left-2 z-40 h-[100dvh] w-[300px] truncate-overflow p-4 pl-2 pr-2 group/sidebar hidden md:block '
				onMouseEnter={() => {
					setIsSidebarHovered(true);
				}}
				onMouseLeave={() => setIsSidebarHovered(false)}
			>
				<Logo className='w-10 h-10 mt-[5vh] pl-2 ' />
				<motion.div className='relative flex h-full w-full overflow-x-hidden overflow-y-scroll pl-3 pr-3 text-[15px] tracking-tight scrollbar-hide pb-[15vh] mt-[5vh] pt-[1vh]'>
					<div className='relative flex h-fit w-full flex-col  '>
						{/* <ProgressiveBlur position='top' height='150px' blurAmount='8px'  backgroundColor='var(--background)'/> */}
						{navigationData.map((section, sectionIndex) => (
							<NavigationSection
								key={section.title}
								section={section}
								sectionIndex={sectionIndex}
								isMobile={false}
								hoveredLink={hoveredLink}
								setHoveredLink={setHoveredLink}
								currentPath={pathname}
							/>
						))}
					</div>
				</motion.div>
			</motion.aside>

			{/* Mobile Sidebar */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.aside
						initial={{ x: -320, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -320, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						className='fixed left-0 top-0 z-30 h-[100dvh] max-w-[400px] p-4  md:hidden w-full'
					>
						<div className='bg-muted rounded-3xl p-4 h-full w-full overflow-hidden'>
							<Logo className='w-10 h-10 mt-[5vh] pl-2 ' />
							<motion.div className='relative flex h-full w-full overflow-x-hidden overflow-y-scroll pl-3 pr-3 text-[15px] tracking-tight scrollbar-hide pb-[15vh] mt-[5vh] pt-[1vh]'>
								<div className='relative flex h-fit w-full flex-col  '>
									{navigationData.map((section, sectionIndex) => (
										<NavigationSection
											key={section.title}
											section={section}
											sectionIndex={sectionIndex}
											isMobile={true}
											hoveredLink={hoveredLink}
											setHoveredLink={setHoveredLink}
											onLinkClick={() => setIsMobileMenuOpen(false)}
											currentPath={pathname}
										/>
									))}
								</div>
							</motion.div>
						</div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}
