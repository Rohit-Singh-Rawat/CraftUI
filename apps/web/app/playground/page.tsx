import { Container } from '@/components/layout/container';
import { Heading } from '@/components/layout/heading';
import PlayGround from '@/components/playground/playground';

type Props = {};
const page = (props: Props) => {
	return (
		<main className='min-h-screen p-4 pb-32'>
			<Container>
				<Heading
					heading='Playground'
					subheading='action bar '
				/>
				<PlayGround />
			</Container>
		</main>
	);
};
export default page;
