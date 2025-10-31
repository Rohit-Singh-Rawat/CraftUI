'use client';

import React from 'react';
import { CodeSnippet } from '@/components/panels/code-snippet';
import { CopyCodeButton } from './copy-code-button';

interface CodeBlockProps {
	code: string;
	language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
	return (
		<div className='relative my-6'>
			<div className='absolute top-2 right-2 z-10'>
				<CopyCodeButton code={code} />
			</div>
			<CodeSnippet
				code={code}
				language={language}
				className='bg-secondary rounded-lg'
			/>
		</div>
	);
}
