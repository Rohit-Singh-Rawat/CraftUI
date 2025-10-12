import { ActionBar, ActionBarProvider } from '@craft/ui/components/crafted/action-bar';
import Logo from './logo';

const Navbar = () => {
	return (
    <ActionBarProvider mode='dock'>
		<ActionBar className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b'>
			<div className='flex items-center justify-between px-4 py-2'>
				<Logo />
			</div>
		</ActionBar>
		</ActionBarProvider>
	);
};

export default Navbar;
