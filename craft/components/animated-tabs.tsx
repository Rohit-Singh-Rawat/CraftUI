import { useEffect, useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

type Tab = {
	label: string;
	title: string;
	content?: string | React.ReactNode | any;
};
type AnimatedTabsProps = {
	tabs: Tab[];
	containerClassName?: string;
	tabClassName?: string;
	activeTabClassName?: string;
	contentClassName?: string;
};

const AnimatedTabs = ({
	tabs,
	containerClassName,
	tabClassName,
	activeTabClassName,
	contentClassName,
}: AnimatedTabsProps) => {
	const generatedId = useId();
	const safeTabs = useMemo(() => tabs.filter(Boolean), [tabs]);
	const [activeTab, setActiveTab] = useState<Tab | null>(safeTabs[0] ?? null);

	const getTabDomId = (label: string) =>
		`${generatedId}-tab-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
	const getPanelDomId = (label: string) =>
		`${generatedId}-panel-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

	useEffect(() => {
		if (!activeTab || !safeTabs.some((tab) => tab.label === activeTab.label)) {
			setActiveTab(safeTabs[0] ?? null);
		}
	}, [activeTab, safeTabs]);

	if (!safeTabs.length || !activeTab) return null;

	return (
		<section
			className={cn('w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8', containerClassName)}
			aria-label='Tabbed content'
		>
			<div className='flex flex-col items-center justify-center '>
				<div className='w-[90%] overflow-x-auto overflow-y-hidden'>
					<div
						className='flex min-w-max items-center gap-2 sm:gap-3 md:gap-5 justify-center '
						role='tablist'
						aria-orientation='horizontal'
					>
						{safeTabs.map((tab) => {
							const isActive = activeTab.label === tab.label;
							const tabId = getTabDomId(tab.label);
							const panelId = getPanelDomId(tab.label);

							return (
								<button
									key={tab.label}
									type='button'
									onClick={() => setActiveTab(tab)}
									className={cn(
										'relative z-0 rounded-md cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors sm:px-5 sm:text-base md:text-lg',
										tabClassName,
										isActive
											? 'text-foreground'
											: 'text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
									)}
									role='tab'
									id={tabId}
									aria-selected={isActive}
									aria-controls={panelId}
									tabIndex={isActive ? 0 : -1}
								>
									{isActive && (
										<motion.div
											layoutId='animated-tabs-active-pill'
											transition={{ type: 'spring', bounce: 0.1, duration: 0.6, ease: 'easeInOut' }}
											className={cn(
												'absolute inset-0 bg-background rounded-t-md',
												'after:content-[""] after:block after:w-5 after:h-5 after:absolute after:bg-transparent after:-bottom-2.5 after:-right-2.5',
												'after:border-b-10 after:border-b-background after:border-l-10 after:border-l-background after:rounded-bl-[20px]',
												'after:[clip-path:inset(0_0_10px_10px)]',
												'before:content-[""] before:block before:w-5 before:h-5 before:absolute before:bg-transparent before:-bottom-2.5 before:-left-2.5',
												'before:border-b-10 before:border-b-background before:border-r-10 before:border-r-background before:rounded-br-[20px]',
												'before:[clip-path:inset(0_10px_10px_0)]',
												activeTabClassName
											)}
										/>
									)}
									<span className='relative z-10'>{tab.title ?? tab.label}</span>
								</button>
							);
						})}
					</div>
				</div>
				<div
					className={cn(
						'w-full rounded-2xl bg-background p-4  sm:p-5 ',
						'min-h-60 sm:min-h-72 md:min-h-80',
						contentClassName
					)}
					role='tabpanel'
					id={getPanelDomId(activeTab.label)}
					aria-labelledby={getTabDomId(activeTab.label)}
				>
					<motion.div layoutId='animated-tabs-active-content'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={activeTab.label}
								initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
								animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
								exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
							>
								{activeTab.content}
							</motion.div>
						</AnimatePresence>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AnimatedTabs;
