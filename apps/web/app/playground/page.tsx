'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import PlayGround from '@/components/playground/playground';
import { PreviewPanel } from '@/components/panels/preview-panel';
import { InfoPanel } from '@/components/panels/info-panel';
import { PanelToggleButton } from '@/components/panels/panel-toggle-button';

const PlaygroundPage = () => {
	const [isPanelMaximized, setIsPanelMaximized] = useState(true);

	const togglePanel = () => {
		setIsPanelMaximized((prev) => !prev);
	};

	return (
		<main className='flex h-full w-full flex-1 flex-col lg:flex-row lg:justify-end '>
			<PreviewPanel isMaximized={isPanelMaximized}>
				<PlayGround />{' '}
				<PanelToggleButton
					isMaximized={isPanelMaximized}
					onToggle={togglePanel}
				/>
			</PreviewPanel>

			<InfoPanel isMaximized={isPanelMaximized}>
				<div className='flex h-full flex-col p-6'>
					<div className='flex items-center justify-between mb-4'>
						<Heading
							heading='Component Info'
							subheading='Details and documentation'
						/>
					</div>
					<div className='flex-1 overflow-y-auto'>
						<div className='space-y-8'>
							<section>
								<h3 className='text-lg font-semibold mb-3'>Component Overview</h3>
								<p className='text-muted-foreground mb-4'>
									This interactive playground allows you to explore and customize components in
									real-time. Adjust properties, preview changes instantly, and understand how
									different configurations affect the component's appearance and behavior.
								</p>
								<p className='text-muted-foreground mb-4'>
									The playground provides a comprehensive environment for testing various component
									states, including loading, error, disabled, and interactive states. You can
									experiment with different prop combinations to see how they influence the
									component's rendering.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-semibold mb-3'>Properties</h3>
								<div className='space-y-3'>
									<div className='border rounded-lg p-4'>
										<code className='text-sm font-mono'>
											variant: "default" | "primary" | "secondary" | "outline"
										</code>
										<p className='text-muted-foreground text-sm mt-2'>
											Controls the visual style of the component. Each variant provides a distinct
											appearance suitable for different use cases and design requirements.
										</p>
									</div>
									<div className='border rounded-lg p-4'>
										<code className='text-sm font-mono'>size: "sm" | "md" | "lg"</code>
										<p className='text-muted-foreground text-sm mt-2'>
											Adjusts the size of the component. Use smaller sizes for compact layouts and
											larger sizes for emphasis or better accessibility.
										</p>
									</div>
									<div className='border rounded-lg p-4'>
										<code className='text-sm font-mono'>disabled: boolean</code>
										<p className='text-muted-foreground text-sm mt-2'>
											When true, disables user interaction with the component and applies
											appropriate visual styling to indicate the disabled state.
										</p>
									</div>
								</div>
							</section>

							<section>
								<h3 className='text-lg font-semibold mb-3'>Usage Examples</h3>
								<div className='space-y-4'>
									<div className='bg-muted/50 rounded-lg p-4'>
										<p className='text-sm font-medium mb-2'>Basic Usage</p>
										<pre className='text-xs font-mono bg-background p-3 rounded border overflow-x-auto'>
											{`<Component variant="default" size="md">
  Click me
</Component>`}
										</pre>
									</div>
									<div className='bg-muted/50 rounded-lg p-4'>
										<p className='text-sm font-medium mb-2'>With Custom Props</p>
										<pre className='text-xs font-mono bg-background p-3 rounded border overflow-x-auto'>
											{`<Component 
  variant="primary" 
  size="lg"
  disabled={false}
  onClick={handleClick}
>
  Advanced Usage
</Component>`}
										</pre>
									</div>
								</div>
							</section>

							<section>
								<h3 className='text-lg font-semibold mb-3'>Best Practices</h3>
								<ul className='space-y-2 text-muted-foreground'>
									<li className='flex items-start gap-2'>
										<span className='text-primary mt-1'>•</span>
										<span>Always provide meaningful labels and descriptions for accessibility</span>
									</li>
									<li className='flex items-start gap-2'>
										<span className='text-primary mt-1'>•</span>
										<span>
											Use appropriate variants to maintain visual hierarchy in your interface
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<span className='text-primary mt-1'>•</span>
										<span>Consider mobile responsiveness when choosing component sizes</span>
									</li>
									<li className='flex items-start gap-2'>
										<span className='text-primary mt-1'>•</span>
										<span>Test disabled states to ensure proper user feedback</span>
									</li>
									<li className='flex items-start gap-2'>
										<span className='text-primary mt-1'>•</span>
										<span>
											Combine with other components to create rich, interactive experiences
										</span>
									</li>
								</ul>
							</section>

							<section>
								<h3 className='text-lg font-semibold mb-3'>Accessibility</h3>
								<p className='text-muted-foreground mb-4'>
									This component follows WAI-ARIA best practices and includes proper keyboard
									navigation support. All interactive elements are focusable and provide clear
									visual feedback for different states.
								</p>
								<div className='bg-muted/50 rounded-lg p-4 space-y-2'>
									<p className='text-sm'>
										<strong>Keyboard Support:</strong>
									</p>
									<ul className='text-sm text-muted-foreground space-y-1 ml-4'>
										<li>
											• <code className='text-xs'>Tab</code> - Move focus to the component
										</li>
										<li>
											• <code className='text-xs'>Enter/Space</code> - Activate the component
										</li>
										<li>
											• <code className='text-xs'>Escape</code> - Cancel or close (if applicable)
										</li>
									</ul>
								</div>
							</section>

							<section>
								<h3 className='text-lg font-semibold mb-3'>Related Components</h3>
								<p className='text-muted-foreground mb-4'>
									Explore these related components that work well together to create comprehensive
									user interfaces:
								</p>
								<div className='grid grid-cols-2 gap-3'>
									<div className='border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer'>
										<p className='font-medium text-sm'>Button Group</p>
										<p className='text-xs text-muted-foreground mt-1'>Combine multiple buttons</p>
									</div>
									<div className='border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer'>
										<p className='font-medium text-sm'>Form Controls</p>
										<p className='text-xs text-muted-foreground mt-1'>Input and form elements</p>
									</div>
									<div className='border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer'>
										<p className='font-medium text-sm'>Dialog</p>
										<p className='text-xs text-muted-foreground mt-1'>Modal interactions</p>
									</div>
									<div className='border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer'>
										<p className='font-medium text-sm'>Tooltip</p>
										<p className='text-xs text-muted-foreground mt-1'>Contextual information</p>
									</div>
								</div>
							</section>

							<section className='pb-8'>
								<h3 className='text-lg font-semibold mb-3'>Additional Resources</h3>
								<div className='space-y-3'>
									<a
										href='#'
										className='block text-primary hover:underline text-sm'
									>
										→ View full API documentation
									</a>
									<a
										href='#'
										className='block text-primary hover:underline text-sm'
									>
										→ Browse component examples
									</a>
									<a
										href='#'
										className='block text-primary hover:underline text-sm'
									>
										→ Read design guidelines
									</a>
									<a
										href='#'
										className='block text-primary hover:underline text-sm'
									>
										→ Contribute to the project
									</a>
								</div>
							</section>
						</div>
					</div>
				</div>
			</InfoPanel>
		</main>
	);
};

export default PlaygroundPage;
