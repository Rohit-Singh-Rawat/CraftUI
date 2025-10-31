'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

// Type compatible with react-hook-form's FieldError
export interface ValidationError {
	message?: string;
}

export interface PasswordRule {
	label: string;
	validator: (password: string) => boolean;
}

export const defaultPasswordRules: PasswordRule[] = [
	{
		label: '8+ characters',
		validator: (password: string) => password.length >= 8,
	},
	{
		label: 'Uppercase',
		validator: (password: string) => /[A-Z]/.test(password),
	},
	{
		label: 'Lowercase',
		validator: (password: string) => /[a-z]/.test(password),
	},
	{
		label: 'Number',
		validator: (password: string) => /\d/.test(password),
	},
	{
		label: 'Special char',
		validator: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
	},
];

interface ValidationBadgeProps {
	rule: PasswordRule;
	password: string;
	index: number;
}

export function ValidationBadge({ rule, password, index }: ValidationBadgeProps) {
	const isValid = rule.validator(password);

	return (
		<motion.div
			layout
			initial={{ scale: 0.8, opacity: 0.6 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ delay: index * 0.05 }}
			role='listitem'
		>
			<Badge
				variant='secondary'
				className={cn(
					'flex items-center rounded-full gap-1 text-xs transition-colors duration-200 bg-white dark:bg-neutral-800 px-0.5 pr-1 font-light border-neutral-200 dark:border-neutral-700',
					isValid ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'
				)}
				aria-label={`${rule.label}: ${isValid ? 'valid' : 'invalid'}`}
			>
				<motion.span
					layout
					className='flex items-center justify-center'
					aria-hidden='true'
				>
					{isValid ? (
						<Check className='size-4 rounded-full bg-green-500 p-0.5 text-white animate-in zoom-in-50 duration-200' />
					) : (
						<X className='size-4 rounded-full bg-neutral-400 dark:bg-neutral-600 p-0.5 text-white animate-in zoom-in-50 duration-200' />
					)}
				</motion.span>
				<span>{rule.label}</span>
			</Badge>
		</motion.div>
	);
}

export interface PasswordValidationProps {
	password: string;
	rules?: PasswordRule[];
	error?: ValidationError | undefined;
	className?: string;
	/**
	 * Show validation even when all rules pass
	 * @default false
	 */
	alwaysShow?: boolean;
}

export function PasswordValidation({
	password,
	rules = defaultPasswordRules,
	error,
	className,
	alwaysShow = false,
}: PasswordValidationProps) {
	const allValidationsPassed = rules.every((rule) => rule.validator(password));
	const showValidation =
		alwaysShow || error?.message || (password.length > 0 && !allValidationsPassed);

	const validCount = rules.filter((rule) => rule.validator(password)).length;
	const totalCount = rules.length;

	return (
		<AnimatePresence>
			{showValidation && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.2 }}
					className={cn('mt-2 space-y-2 overflow-hidden', className)}
					role='region'
					aria-label='Password requirements'
					aria-live='polite'
					aria-atomic='true'
				>
					<div className='sr-only'>
						{validCount} of {totalCount} password requirements met
					</div>
					<motion.div
						layout
						className='flex flex-wrap gap-2'
						role='list'
						aria-label='Password validation rules'
					>
						{rules.map((rule, index) => (
							<ValidationBadge
								key={rule.label}
								rule={rule}
								password={password}
								index={index}
							/>
						))}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
