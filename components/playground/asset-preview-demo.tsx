import { AssetPreview } from './asset-preview';

const AssetPreviewDemo = () => {
	return (
		<div className='rounded-3xl border border-border inset-shadow-sm inner-shadow-black flex items-center justify-center gap-5 flex-col p-20 bg-secondary'>
			<AssetPreview
				fileName='crafts.pdf'
				fileDate='January 15, 2024'
				thumbnailUrl='/images/preview/asset-1.png'
				fileType='pdf'
			/>
			<AssetPreview
				fileName='rohit.pptx'
				fileDate='February 20, 2024'
				thumbnailUrl='/images/preview/asset-2.png'
				fileType='pptx'
			/>
			<AssetPreview
				fileName='dairy.xlsx'
				fileDate='March 10, 2024'
				thumbnailUrl='/images/preview/asset-3.png'
				fileType='xlsx'
			/>
		</div>
	);
};

export default AssetPreviewDemo;
