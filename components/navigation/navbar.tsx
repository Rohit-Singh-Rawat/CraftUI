'use client';
import {
	ActionBar,
	ActionBarHeader,
	ActionBarTitle,
	ActionBarActions,
} from '@/craft/components/action-bar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	WindPower02Icon,
	HomeIcon,
	UnfoldMoreIcon,
	BookIcon,
	CodeIcon,
} from '@hugeicons/core-free-icons';
import Logo from '@/components/navigation/logo';
import { Button } from '@/components/ui/button';
import ThemeSwitch from '@/components/navigation/theme-toggle';

const Navbar = () => {
	const pathname = usePathname();

	const isDev = process.env.NODE_ENV === 'development';

	const possibleLinks = [
		...(isDev ? [{ name: 'Playground', path: '/playground', icon: CodeIcon }] : []),
		{ name: 'Home', path: '/', icon: HomeIcon },
		{ name: 'Diary', path: '/diary', icon: BookIcon },
		{ name: 'Crafts', path: '/crafts', icon: WindPower02Icon },
	];

	const currentLink = possibleLinks.find((link) => {
		if (link.path === '/') {
			return pathname === '/';
		}
		return pathname.startsWith(link.path);
	});
	const currentPageName = currentLink ? currentLink.name : 'Current Path';
	const CurrentIcon = currentLink ? currentLink.icon : HomeIcon;

	return (
		<ActionBar className='sm:min-w-fit p-1 h-fit rounded-full'>
			<ActionBarHeader className='h-fit '>
				<Logo className='size-8 rounded-full bg-black mr-1' />
				<ActionBarTitle className=' font-normal font-serif text-lg'>Crafts</ActionBarTitle>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='flex items-center gap-1 text-sm rounded-full p-2 hover:bg-accent text-muted-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground focus-visible:ring-offset-1  font-normal hover:text-muted-foreground'
						>
							<span>{currentPageName}</span>
							<HugeiconsIcon
								icon={UnfoldMoreIcon}
								size={16}
								color='currentColor'
								strokeWidth={1.5}
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='rounded-xl'
						alignOffset={20}
						sideOffset={10}
					>
						{possibleLinks.map((link) => (
							<DropdownMenuItem
								key={link.path}
								asChild
								className='text-xs font-light flex items-center gap-4 text-muted-foreground hover:text-accent-foreground rounded-xl'
							>
								<Link href={link.path}>
									<HugeiconsIcon
										icon={link.icon}
										size={16}
										color='currentColor'
										strokeWidth={1.5}
									/>
									<span>{link.name}</span>
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</ActionBarHeader>
			<ActionBarActions>
				<ThemeSwitch />
			</ActionBarActions>
		</ActionBar>
	);
};

export default Navbar;
