import React, { Children } from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import type { MDXComponents } from 'mdx/types';

import { cn } from '@/lib/utils';
import 'katex/dist/katex.min.css';
import Link from 'next/link';
import { BlockMath, InlineMath } from 'react-katex';
import { Label } from '@/components/ui/label';
import { CodeSnippet } from '@/components/panels/code-snippet';
import { CodeBlock } from '@/components/mdx/code-block';
import { DependencyCard, DependenciesContainer } from '@/components/mdx/dependency-card';
import { DependencySection } from '@/components/mdx/dependency-section';
import { PropsTable, PropsTableRow } from '@/components/mdx/props-table';

export function mdxComponents(components?: MDXComponents): MDXComponents {
	return {
		h1: ({ className, children, ...props }: React.ComponentProps<'h1'>) => (
			<h1
				id={children?.toString().toLowerCase().replace(/\s+/g, '-')}
				className={cn(
					'text-sm text-muted-foreground font-normal mt-20  tracking-tight text-pretty leading-tight mb-4 uppercase',
					className
				)}
				{...props}
			>
				{children}
			</h1>
		),
		h2: ({ className, children, ...props }: React.ComponentProps<'h2'>) => (
			<h2
				id={children?.toString().toLowerCase().replace(/\s+/g, '-')}
				className={cn(
					'text-sm text-muted-foreground font-normal mb-4 mt-20 py-0  tracking-tight uppercase',
					className
				)}
				{...props}
			>
				{children}
			</h2>
		),
		h3: ({ className, children, ...props }: React.ComponentProps<'h3'>) => (
			<h3
				id={children?.toString().toLowerCase().replace(/\s+/g, '-')}
				className={cn('text-xl md:text-2xl font-medium py-0 mt-12 tracking-tight', className)}
				{...props}
			>
				{children}
			</h3>
		),
		h4: ({ className, children, ...props }: React.ComponentProps<'h4'>) => (
			<h4
				id={children?.toString().toLowerCase().replace(/\s+/g, '-')}
				className={cn(
					'text-lg md:text-xl font-medium py-0 mt-10 [h3+&]:mt-0 tracking-tight',
					className
				)}
				{...props}
			>
				{children}
			</h4>
		),
		a: ({ className, children, href, ...props }: React.ComponentProps<'a'>) => {
			return (
				<a
					href={href}
					className={cn(
						'font-medium text-base md:text-lg text-blue dark:text-blue-400',
						'inline-flex items-center gap-1.5 group',
						'transition-colors duration-200 ease-out',
						'hover:text-blue-600 dark:hover:text-blue-300',
						'relative after:absolute after:bottom-0 after:left-0',
						'after:w-0 after:h-[1.5px] after:bg-blue-600 dark:after:bg-blue-300',
						'after:transition-all after:duration-200 after:ease-out',
						'hover:after:w-full',
						className
					)}
					{...props}
				>
					<span className='relative '>{children}</span>
				</a>
			);
		},
		Link: ({ className, href, children, ...props }: React.ComponentProps<typeof Link>) => (
			<Link
				href={href}
				className={cn(
					'font-medium text-base md:text-lg text-blue hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 duration-300 ease-out transition inline-flex items-center leading-0',
					className
				)}
				{...props}
			>
				{children}
			</Link>
		),
		p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
			<p
				className={cn('text-lg font-normal  text-pretty mb-6 leading-relaxed', className)}
				{...props}
			/>
		),
		strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
			<strong
				className={cn('font-semibold', className)}
				{...props}
			/>
		),
		em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
			<em
				className={cn(className)}
				style={{ fontVariationSettings: "'slnt' -10" }}
				{...props}
			/>
		),
		ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
			<ul
				className={cn('list-disc ml-3 list-outside space-y-3', className)}
				{...props}
			/>
		),
		ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
			<ol
				className={cn('list-outside list-decimal ml-6 space-y-3', className)}
				{...props}
			/>
		),
		li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
			<li
				className={cn(
					'marker:text-sm [&>ul]:marker:text-[10px] [&>ol]:marker:text-base text-base md:text-lg first:mt-2 last:pb-4',
					className
				)}
				{...props}
			/>
		),
		math: ({ children }) => <BlockMath>{children}</BlockMath>,
		inlineMath: ({ children }) => <InlineMath>{children}</InlineMath>,
		blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
			<blockquote
				className={cn('mt-2 border-l pl-0 px-6', className)}
				style={{ fontVariationSettings: "'slnt' -10" }}
				{...props}
			/>
		),
		img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
			//@ts-expect-error img src expects a Blob or string
			<ImageComponent
				src={props.src as string}
				alt={alt as string}
				caption={true}
				className={className}
				{...props}
			/>
		),
		hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
			<hr
				className=''
				{...props}
			/>
		),
		pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
			// Extract code and language from the code element inside pre
			const codeElement = React.Children.toArray(children).find(
				(child) => React.isValidElement(child) && child.type === 'code'
			) as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;

			if (codeElement) {
				const className = codeElement.props.className || '';
				const languageMatch = className.match(/language-(\w+)/);
				const language = languageMatch ? languageMatch[1] : 'typescript';
				const codeString =
					typeof codeElement.props.children === 'string'
						? codeElement.props.children
						: String(codeElement.props.children || '');
				return (
					<CodeBlock
						code={codeString}
						language={language}
					/>
				);
			}
			// Fallback to default pre styling
			return <pre {...props}>{children}</pre>;
		},
		code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
			// Inline code (not in a pre tag)
			return (
				<code
					className={cn(
						'font-fira-mono text-xs md:text-sm px-0.5 py-px md:px-1 md:py-0.5 border border-border rounded-md leading-6 bg-muted sm:whitespace-pre box-decoration-clone',
						className
					)}
					{...props}
				>
					{children}
				</code>
			);
		},
		// Custom components
		Label,
		DependencyCard,
		DependenciesContainer,
		DependencySection,
		PropsTable,
		PropsTableRow,
		CodeBlock,
		CodeSnippet,
		...components,
	};
}
