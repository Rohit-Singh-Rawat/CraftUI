import { Button } from '@craft/ui/components/button';
import Logo from '../layout/logo';

const PlayGround = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-[400px] gap-4 border border-border rounded-lg shadow-sm p-6 m-10'>
			<div className='w-full max-w-md rounded-3xl overflow-hidden bg-wheite flex flex-col items-center justify-center'>
				<div className='menu'>
					<div className='menu-wrapper flex py-10 flex-col items-center justify-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							version='1.1'
							width='100%'
							height='100%'
							className='size-20 scale-50 rounded-full bg-black'
						>
							<defs>
								<filter id='goo'>
									<feGaussianBlur
										in='SourceGraphic'
										stdDeviation='10'
										result='blur'
									/>
									<feColorMatrix
										in='blur'
										mode='matrix'
										values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
										result='goo'
									/>
									{/* <feComposite
										in='SourceGraphic'
										in2='goo'
										operator='atop'
									/> */}
								</filter>
							</defs>
							{/* First dot - top of triangle */}
							{Array.from({ length: 15 }, (_, i) => {
								const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
								const randomColor = colors[Math.floor(Math.random() * colors.length)];
								const randomX = Math.random() * 100;
								const randomY = Math.random() * 100;
								const randomDuration = 5 + Math.random() * 4; // 8-12 seconds

								return (
									<circle
										key={i}
										cx={`${randomX}%`}
										cy={`${randomY}%`}
										r='24%'
										filter='url(#goo)'
										fill={randomColor}
										strokeWidth='2'
									>
										<animate
											attributeName='cx'
											values={`${randomX}%;${Math.random() * 100}%;${randomX}%`}
											dur={`${randomDuration}s`}
											repeatCount='indefinite'
										/>
										<animate
											attributeName='cy'
											values={`${randomY}%;${Math.random() * 100}%;${randomY}%`}
											dur={`${randomDuration}s`}
											repeatCount='indefinite'
										/>
									</circle>
								);
							})}
						</svg>
						<Logo />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayGround;
