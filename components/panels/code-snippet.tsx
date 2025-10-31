'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Highlight, PrismTheme } from 'prism-react-renderer';
import themes from '@/styles/prism-theme.json';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
	code: string;
	language?: string;
	className?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'typescript', className }) => {
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';
	const theme = (isDark ? themes.dark : themes.light) as PrismTheme;	

	return (
		<div className={cn('py-5', className)}>
			<Highlight
				theme={theme}
				code={code.trim()}
				language={language}
			>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre
						className={`${className} text-[13px] overflow-x-auto font-mono font-medium`}
						style={style}
					>
						{tokens.map((line, i) => (
							<div
								key={i}
								{...getLineProps({ line })}
								className='flex items-center hover:bg-editor-border py-px px-4'
							>
								<span className='mr-4 select-none text-muted-foreground text-right text-[10px] items-center flex'>
									{i + 1}
								</span>
								<span>
									{line.map((token, key) => (
										<span
											key={key}
											{...getTokenProps({ token })}
										/>
									))}
								</span>
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</div>
	);
};
