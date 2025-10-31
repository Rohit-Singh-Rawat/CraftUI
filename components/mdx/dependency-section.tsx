'use client';

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DependencyCard } from './dependency-card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BunLogo } from '@/components/icons/brands/bun';
import { PnpmLogo } from '@/components/icons/brands/pnpm';
import { NpmLogo } from '@/components/icons/brands/npm';
import { YarnLogo } from '@/components/icons/brands/yarn';
import { MotionLogo } from '@/components/icons/brands/motion';
import { ShadcnLogo } from '@/components/icons/brands/shadcn';

interface PackageManager {
	name: string;
	command: string;
	shadcnCommand: string;
	icon: React.ComponentType<{ className?: string }>;
}

const packageManagers: PackageManager[] = [
	{
		name: 'bun',
		command: 'bun install',
		shadcnCommand: 'bunx --bun shadcn@latest add',
		icon: BunLogo,
	},
	{
		name: 'pnpm',
		command: 'pnpm install',
		shadcnCommand: 'pnpm dlx shadcn@latest add',
		icon: PnpmLogo,
	},
	{
		name: 'npm',
		command: 'npm install',
		shadcnCommand: 'npx shadcn@latest add',
		icon: NpmLogo,
	},
	{
		name: 'yarn',
		command: 'yarn add',
		shadcnCommand: 'yarn shadcn@latest add',
		icon: YarnLogo,
	},
];

interface DependencySectionProps {
	dependencies: Array<{
		name: string;
		href: string;
		logo?: React.ReactNode;
		label?: string;
	}>;
	className?: string;
}

export function DependencySection({ dependencies, className }: DependencySectionProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async (manager: PackageManager) => {
		// Separate shadcn components from regular packages
		const shadcnComponents: string[] = [];
		const regularPackages: string[] = [];

		dependencies.forEach((dep) => {
			if (dep.label?.toLowerCase() === 'shadcn/ui' || dep.href.includes('ui.shadcn.com')) {
				// Extract just the component name from shadcn components
				shadcnComponents.push(dep.name.toLowerCase());
			} else {
				regularPackages.push(dep.name);
			}
		});

		let command = '';

		// Build the command
		if (regularPackages.length > 0 && shadcnComponents.length > 0) {
			// Both regular packages and shadcn components
			command = `${manager.command} ${regularPackages.join(' ')} && ${
				manager.shadcnCommand
			} ${shadcnComponents.join(' ')}`;
		} else if (regularPackages.length > 0) {
			// Only regular packages
			command = `${manager.command} ${regularPackages.join(' ')}`;
		} else if (shadcnComponents.length > 0) {
			// Only shadcn components
			command = `${manager.shadcnCommand} ${shadcnComponents.join(' ')}`;
		}

		await navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className={cn('my-6', className)}>
			<div className='flex items-center gap-3 mb-4 mt-20'>
				<h2
					id='dependencies'
					className='text-sm text-muted-foreground font-normal py-0 tracking-tight uppercase'
				>
					Dependencies
				</h2>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='h-6 w-6'
						>
							<AnimatePresence mode='popLayout'>
								{copied ? (
									<motion.div
										key='tick'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<HugeiconsIcon
											icon={Tick02Icon}
											size={14}
											className='text-green-600'
										/>
									</motion.div>
								) : (
									<motion.div
										key='copy'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<HugeiconsIcon
											icon={Copy01Icon}
											size={14}
											className='text-muted-foreground'
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						{packageManagers.map((manager) => {
							const IconComponent = manager.icon;
							return (
								<DropdownMenuItem
									key={manager.name}
									onClick={() => handleCopy(manager)}
									className='flex items-center gap-2'
								>
									<IconComponent className='size-4' />
									<span>{manager.name}</span>
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='flex flex-wrap gap-3'>
				{dependencies.map((dep) => {
					// Auto-detect and assign logos if not provided
					let logo = dep.logo;
					if (!logo) {
						const nameLower = dep.name.toLowerCase();
						if (nameLower === 'motion' || nameLower === 'framer-motion') {
							logo = <MotionLogo className='h-2.5 w-auto shrink-0' />;
						} else if (
							dep.label?.toLowerCase() === 'shadcn/ui' ||
							dep.href.includes('ui.shadcn.com')
						) {
							logo = <ShadcnLogo className='size-4 shrink-0' />;
						}
					}

					return (
						<DependencyCard
							key={dep.name}
							name={dep.name}
							href={dep.href}
							logo={logo}
							label={dep.label}
						/>
					);
				})}
			</div>
		</div>
	);
}
