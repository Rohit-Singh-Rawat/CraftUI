'use client';

import * as React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function NotFoundActions() {
	const handleBackClick = () => {
		window.history.back();
	};

	return (
		<div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
			<Button asChild className='btn-default group'>
				<Link href='/'>
					<Home className='h-4 w-4 mr-1 transition-transform group-hover:scale-110' />
					Go Home
				</Link>
			</Button>

			<Button
				onClick={handleBackClick}
				variant='outline'
				className='group'
			>
				<ArrowLeft className='h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1' />
				Go Back
			</Button>
		</div>
	);
}

