import { Container } from '@/components/layout/container';
import { Heading } from '@/components/layout/heading';
import PlayGround from '@/components/playground/playground';
import {
	DockModeDemo,
	ShoppingCartDemo,
	BulkSelectionDemo,
	SuccessNotificationDemo,
	TriggerDemo,
} from '@/components/playground/action-bar-demo';

type Props = {};
const page = (props: Props) => {
	return (
		<main className='min-h-screen p-4 pb-32'>
			<Container className='h-full'>
				<Heading
					heading='Playground'
					subheading='Component Testing'
				/>
				<PlayGround />
{/* 
				<div className='mt-10 space-y-12'>
					<div>
						<h3 className='text-2xl font-bold mb-2'>ActionBar Component</h3>
						<p className='text-muted-foreground mb-6'>
							Floating bottom action bar with two modes: <strong>dock</strong> (persistent) and{' '}
							<strong>contextual</strong> (conditional)
						</p>
					</div>

					<section className='space-y-4'>
						<div>
							<h4 className='text-lg font-semibold mb-1'>Dock Mode</h4>
							<p className='text-sm text-muted-foreground'>Always visible, persistent navigation</p>
						</div>
						<DockModeDemo />
					</section>
					<section className='space-y-8'>
						<div>
							<h4 className='text-lg font-semibold mb-1'>Contextual Mode</h4>
							<p className='text-sm text-muted-foreground'>Appears based on conditions</p>
						</div>

						<div className='space-y-6'>
							<div>
								<h5 className='text-sm font-medium mb-3'>Shopping Cart Example</h5>
								<ShoppingCartDemo />
							</div>

							<div>
								<h5 className='text-sm font-medium mb-3'>Bulk Selection Example</h5>
								<BulkSelectionDemo />
							</div>

							<div>
								<h5 className='text-sm font-medium mb-3'>Success Notification (Auto-dismiss)</h5>
								<SuccessNotificationDemo />
							</div>

							<div>
								<h5 className='text-sm font-medium mb-3'>With Trigger Button</h5>
								<TriggerDemo />
							</div>
						</div>
					</section>
				</div> */}
			</Container>
		</main>
	);
};
export default page;
