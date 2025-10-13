'use client';
import {
	ActionBar,
	ActionBarHeader,
	ActionBarTitle,
} from '@craft/ui/components/crafted/action-bar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@craft/ui/components/dropdown-menu';
import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { SecondBracketIcon, HomeIcon, UnfoldMoreIcon } from '@hugeicons/core-free-icons';
import Logo from './logo';
import { Button } from '@craft/ui/components/button';

const Navbar = () => {
	const pathname = usePathname();

	const possibleLinks = [
		{ name: 'Playground', path: '/playground', icon: SecondBracketIcon },
		{ name: 'Home', path: '/', icon: HomeIcon },
		{ name: 'Components', path: '/components', icon: SecondBracketIcon },
	];

	const currentLink = possibleLinks.find((link) => link.path === pathname);
	const currentPageName = currentLink ? currentLink.name : 'Current Path';
	const CurrentIcon = currentLink ? currentLink.icon : HomeIcon;

	return (
		<ActionBar className='sm:min-w-fit p-1 h-fit'>
			<ActionBarHeader className='h-fit'>
				<Logo className='size-8 rounded-full bg-black mr-1' />
				<ActionBarTitle className=' font-normal'>
					<span className='text-orange-400'>C</span>rafts
				</ActionBarTitle>
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
					<DropdownMenuContent className='rounded-xl' alignOffset={20} sideOffset={10}>
						{possibleLinks.map((link) => (
							<DropdownMenuItem
								key={link.path}
								className='text-xs font-light flex items-center gap-4 text-muted-foreground hover:text-accent-foreground rounded-xl'
							>
								<HugeiconsIcon
									icon={link.icon}
									size={16}
									color='currentColor'
									strokeWidth={1.5}
								/>
								<span>{link.name}</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</ActionBarHeader>
		</ActionBar>
	);
};

export default Navbar;
