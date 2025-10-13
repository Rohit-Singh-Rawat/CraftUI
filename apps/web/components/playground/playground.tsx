import { Button } from '@craft/ui/components/button';
import Logo from '../layout/logo';

const PlayGround = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-[900px] gap-4 border border-border rounded-lg shadow-sm p-6 m-10'>
			<div className='w-full max-w-md rounded-3xl overflow-hidden bg-wheite flex flex-col items-center justify-center'>
				<div className='menu'>
					<div className='menu-wrapper flex py-10 flex-col items-center justify-center'>
						<Logo />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayGround;
