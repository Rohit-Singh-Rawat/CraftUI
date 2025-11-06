'use client';

import { FluidAssetPreview } from '@/craft/components/fluid-asset-preview';
import { useRouter } from 'next/navigation';

export function FluidAssetPreviewDemo() {
	const router = useRouter();

	return (
		<div className='flex items-center justify-center gap-5 flex-col h-screen'>
			<h1 className='font-light'>Fluid Asset Preview</h1>
			<FluidAssetPreview
				fileName='crafts.pdf'
				fileDate='January 15, 2024'
				thumbnailUrl='/images/preview/asset-1.png'
				fileType='pdf'
				onLinkClick={() => router.push('/crafts')}
			/>
			<FluidAssetPreview
				fileName='rohit.pptx'
				fileDate='February 20, 2024'
				thumbnailUrl='/images/preview/asset-2.png'
				fileType='pptx'
				onLinkClick={() => router.push('https://rohitsinghrawat.com')}
			/>
			<FluidAssetPreview
				fileName='diary.xlsx'
				fileDate='March 10, 2024'
				thumbnailUrl='/images/preview/asset-3.png'
				fileType='xlsx'
				onLinkClick={() => router.push('/diary')}
			/>
		</div>
	);
}

export default FluidAssetPreviewDemo;
