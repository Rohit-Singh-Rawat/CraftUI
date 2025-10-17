import Logo from '../layout/logo';

const LogoDemo = () => {
	return (
		<div className='menu-wrapper flex py-10 flex-col items-center justify-center gap-4'>
			<Logo className='w-32 h-32' />
			<Logo className='w-24 h-24' />
			<Logo className='w-20 h-20' />
			<Logo className='w-16 h-16' />
			<Logo className='w-12 h-12' />
		</div>
	);
};

export default LogoDemo;
