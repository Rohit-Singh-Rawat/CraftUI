'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Loader2, Info } from 'lucide-react';
import clsx from 'clsx';

// Utils
import { isUnsupportedBrowser } from '../../utils/is-unsupported-browser';

// Hooks
import useDebounce from '../../hooks/useDebounce';

// Data
import { dummyData } from './dummyData';

const buttonVariants = {
	initial: { x: 0, width: 100 },
	step1: { x: 0, width: 100 },
	step2: { x: -30, width: 180 },
};

const iconVariants = {
	hidden: { x: -50, opacity: 0 },
	visible: { x: 16, opacity: 1 },
};

const getResultItemVariants = (index: number, isUnsupported: boolean) => ({
	initial: {
		y: 0,
		scale: 0.3,
		filter: isUnsupported ? 'none' : 'blur(10px)',
	},
	animate: {
		y: (index + 1) * 50,
		scale: 1,
		filter: 'blur(0px)',
	},
	exit: {
		y: isUnsupported ? 0 : -4,
		scale: 0.8,
		color: '#000000',
	},
});

const getResultItemTransition = (index: number) => ({
	duration: 0.75,
	delay: index * 0.12,
	type: 'spring' as const,
	bounce: 0.35,
	exit: { duration: index * 0.1 },
	filter: { ease: 'easeInOut' },
});

interface GooeySearchBarProps {
	placeholder?: string;
	searchData?: string[];
	onSearch?: (query: string) => void;
	className?: string;
}

const GooeySearchBar = ({
	placeholder = 'Type to search...',
	searchData: externalSearchData,
	onSearch,
	className,
}: GooeySearchBarProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [state, setState] = useState({
		step: 1, // 1: Initial, 2: Search
		searchData: [] as string[],
		searchText: '',
		isLoading: false,
	});

	const debouncedSearchText = useDebounce(state.searchText, 500);
	const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);

	const handleButtonClick = () => {
		setState((prevState) => ({ ...prevState, step: 2 }));
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setState((prevState) => ({ ...prevState, searchText: value }));

		if (onSearch) {
			onSearch(value);
		}
	};

	useEffect(() => {
		if (state.step === 2) {
			inputRef.current?.focus();
		} else {
			setState((prevState) => ({
				...prevState,
				searchText: '',
				searchData: [],
				isLoading: false,
			}));
		}
	}, [state.step]);

	useEffect(() => {
		let isCancelled = false;

		if (debouncedSearchText) {
			setState((prevState) => ({ ...prevState, isLoading: true }));

			const fetchData = async () => {
				try {
					await new Promise((resolve) => setTimeout(resolve, 500));

					const dataToSearch = externalSearchData || dummyData;
					const filteredData = dataToSearch.filter((item: string) =>
						item.toLowerCase().includes(debouncedSearchText.trim().toLowerCase())
					);

					if (!isCancelled) {
						setState((prevState) => ({
							...prevState,
							searchData: filteredData,
							isLoading: false,
						}));
					}
				} catch {
					if (!isCancelled) {
						setState((prevState) => ({ ...prevState, isLoading: false }));
					}
				}
			};

			fetchData();
		} else {
			setState((prevState) => ({
				...prevState,
				searchData: [],
				isLoading: false,
			}));
		}

		return () => {
			isCancelled = true;
		};
	}, [debouncedSearchText, externalSearchData]);

	return (
		<div
			className={clsx(
				'relative flex items-center justify-center w-full h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full overflow-hidden',
				isUnsupported ? '' : 'filter-[url(#gooey)]',
				className
			)}
		>
			{/* SVG Filter */}
			<svg className='absolute top-0 left-0 w-full h-full pointer-events-none z-10'>
				<defs>
					<filter id='gooey'>
						<feGaussianBlur
							in='SourceGraphic'
							stdDeviation='10'
							result='blur'
						/>
						<feColorMatrix
							in='blur'
							mode='matrix'
							values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
							result='gooey'
						/>
						<feComposite
							in='SourceGraphic'
							in2='gooey'
							operator='atop'
						/>
					</filter>
				</defs>
			</svg>

			<div className='relative z-20 flex items-center justify-center w-full h-full'>
				<motion.div
					className='relative flex items-center justify-center w-full h-full'
					initial='initial'
					animate={state.step === 1 ? 'step1' : 'step2'}
					transition={{ duration: 0.75, type: 'spring', bounce: 0.15 }}
				>
					<AnimatePresence mode='popLayout'>
						<motion.div
							key='search-text-wrapper'
							className='absolute top-[-200px] left-1/2 transform -translate-x-1/2 flex flex-col gap-2 max-h-[200px] overflow-y-auto p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 min-w-[300px] max-w-[400px]'
							role='listbox'
							aria-label='Search results'
							exit={{ scale: 0, opacity: 0 }}
							transition={{
								delay: isUnsupported ? 0.5 : 1.25,
								duration: 0.5,
							}}
						>
							<AnimatePresence mode='popLayout'>
								{state.searchData.map((item, index) => (
									<motion.div
										key={item}
										whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
										variants={getResultItemVariants(index, isUnsupported)}
										initial='initial'
										animate='animate'
										exit='exit'
										transition={getResultItemTransition(index)}
										className='flex items-center p-3 bg-white/80 rounded-xl cursor-pointer transition-all duration-200 border border-black/5 hover:bg-white hover:-translate-y-0.5 hover:shadow-lg'
										role='option'
									>
										<div className='flex items-center gap-3 text-sm font-medium text-gray-800 w-full'>
											<motion.div
												className='flex items-center justify-center w-5 h-5 text-indigo-500 flex-shrink-0'
												initial={{ scale: 0, opacity: 0 }}
												animate={{ scale: 1, opacity: 1 }}
												transition={{ delay: index * 0.1 + 0.2 }}
											>
												<Info size={16} />
											</motion.div>
											<motion.span
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: index * 0.12 + 0.3 }}
											>
												{item}
											</motion.span>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					</AnimatePresence>

					<motion.div
						variants={buttonVariants}
						onClick={handleButtonClick}
						whileHover={{ scale: state.step === 2 ? 1 : 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='flex items-center justify-center h-15 bg-white/90 rounded-full cursor-pointer transition-all duration-300 border-none outline-none shadow-lg backdrop-blur-md hover:bg-white hover:-translate-y-0.5 hover:shadow-xl'
						role='button'
					>
						{state.step === 1 ? (
							<span className='text-base font-semibold text-gray-800 px-6'>Search</span>
						) : (
							<input
								ref={inputRef}
								type='text'
								className='w-full h-full border-none outline-none bg-transparent text-base font-medium text-gray-800 px-6 placeholder:text-gray-500 placeholder:opacity-70'
								placeholder={placeholder}
								aria-label='Search input'
								onChange={handleSearch}
							/>
						)}
					</motion.div>

					<AnimatePresence mode='wait'>
						{state.step === 2 && (
							<motion.div
								key='icon'
								className='absolute right-5 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 text-indigo-500'
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={iconVariants}
								transition={{
									delay: 0.1,
									duration: 0.85,
									type: 'spring',
									bounce: 0.15,
								}}
							>
								{!state.isLoading ? (
									<motion.div
										initial={{ rotate: 0 }}
										animate={{ rotate: isUnsupported ? 0 : 360 }}
										transition={{ duration: 1, ease: 'easeInOut' }}
									>
										<Search size={24} />
									</motion.div>
								) : (
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: 'linear',
										}}
									>
										<Loader2 size={24} />
									</motion.div>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</div>
	);
};

export default GooeySearchBar;
