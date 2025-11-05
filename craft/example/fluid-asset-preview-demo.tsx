'use client';

import { FluidAssetPreview } from '@/craft/components/fluid-asset-preview';

export function FluidAssetPreviewDemo() {
	return (
		<div className='flex items-center justify-center gap-5 flex-col h-screen'>
			<h1 className='font-light'>Fluid Asset Preview</h1>
			<FluidAssetPreview
				fileName='crafts.pdf'
				fileDate='January 15, 2024'
				thumbnailUrl='/images/preview/asset-1.png'
				fileType='pdf'
			/>
			<FluidAssetPreview
				fileName='rohit.pptx'
				fileDate='February 20, 2024'
				thumbnailUrl='/images/preview/asset-2.png'
				fileType='pptx'
			/>
			<FluidAssetPreview
				fileName='dairy.xlsx'
				fileDate='March 10, 2024'
				thumbnailUrl='/images/preview/asset-3.png'
				fileType='xlsx'
			/>
		</div>
	);
}

export default FluidAssetPreviewDemo;
