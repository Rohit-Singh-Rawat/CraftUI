# Crafted Components

Custom, production-ready UI components built specifically for rsrCrafts. Following shadcn/ui patterns with full accessibility, TypeScript support, and theme integration.

## Components

### ActionBar

Flexible floating action bar with customizable positioning and two modes: **dock** (persistent) and **contextual** (conditional).

#### Mode: Dock

Always visible persistent navigation, like mobile tab bars or macOS dock.

```tsx
import {
	ActionBarProvider,
	ActionBar,
	ActionBarLogo,
	ActionBarNav,
	ActionBarActions,
} from '@/craft/components/action-bar';

<ActionBarProvider
	mode='dock'
	position='bottom'
>
	<ActionBar>
		<ActionBarLogo>{/* Logo */}</ActionBarLogo>
		<ActionBarNav>
			<Button variant='ghost'>Home</Button>
			<Button variant='ghost'>Search</Button>
		</ActionBarNav>
		<ActionBarActions>{/* User menu */}</ActionBarActions>
	</ActionBar>
</ActionBarProvider>;
```

#### Mode: Contextual

Appears based on conditions (selections, cart items, notifications).

```tsx
<ActionBarProvider
	mode='contextual'
	position='bottom'
	open={isOpen}
	onOpenChange={setIsOpen}
>
	<ActionBar>
		<ActionBarContent>
			<ActionBarHeader>
				<ActionBarTitle>2 items selected</ActionBarTitle>
			</ActionBarHeader>
		</ActionBarContent>
		<ActionBarActions>
			<Button size='sm'>Delete</Button>
			<ActionBarClose />
		</ActionBarActions>
	</ActionBar>
</ActionBarProvider>
```

#### Positioning Options

The ActionBar supports 8 positions: `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`. Layout automatically adjusts for vertical/horizontal orientation.

```tsx
<ActionBarProvider position='right'>
	<ActionBar
		offset={24}
		maxHeight='calc(100vh - 2rem)'
	>
		{/* Vertical layout with centered items */}
	</ActionBar>
</ActionBarProvider>
```

**Sub-components:**

- `ActionBarProvider` - Context provider with mode and position (required)
- `ActionBar` - Root floating container with position-aware layout
- `ActionBarLogo` - Logo container (dock mode)
- `ActionBarNav` - Navigation links (dock mode)
- `ActionBarHeader`, `ActionBarTitle`, `ActionBarDescription` - Content headers
- `ActionBarContent` - Flexible wrapper (contextual mode)
- `ActionBarActions` - Button container
- `ActionBarClose` - Pre-styled close button
- `ActionBarSeparator` - Divider (horizontal/vertical based on orientation)
- `ActionBarTrigger` - Toggle button (contextual mode)

**ActionBarProvider Props:**

- `mode?: "dock" | "contextual"` - Display mode (default: "contextual")
- `position?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"` - Bar position (default: "bottom")
- `open?: boolean` - Controlled state (contextual only)
- `onOpenChange?: (open: boolean) => void` - State callback
- `defaultOpen?: boolean` - Uncontrolled default (default: false)

**ActionBar Props:**

- `size?: "sm" | "md" | "lg"` - Padding size (default: "md")
- `position?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"` - Override provider position
- `offset?: number` - Distance from edge in px (default: 16)
- `maxWidth?: string` - Max width for horizontal positions (default: "640px")
- `maxHeight?: string` - Max height for vertical positions (default: "calc(100vh - 2rem)")
- `animationDelay?: number` - Animation delay in ms (default: 100)

**Features:** Multi-position support with adaptive layouts, smooth directional animations, ARIA support, keyboard navigation, responsive design, both controlled/uncontrolled patterns

## Usage

```tsx
// Import directly from component file
import {
	ActionBarProvider,
	ActionBar,
	ActionBarHeader,
	ActionBarTitle,
	ActionBarActions,
} from '@/components/crafted/action-bar';
```

## Use Cases

**Dock Mode:**

- Mobile tab navigation
- Persistent action buttons
- Bottom navigation bars
- Quick access menus

**Contextual Mode:**

- Shopping cart actions
- Bulk selection tools
- Undo/redo notifications
- Success/error messages
- Multi-step form controls

## Creating New Crafted Components

When adding new components to this directory:

1. **Follow shadcn patterns**: Use composable sub-components with clear names
2. **Export types**: Always export prop interfaces
3. **Add documentation**: Include a `.md` file with examples
4. **Update index**: Add exports to `index.ts`
5. **Test accessibility**: Verify ARIA attributes and keyboard navigation
6. **Add examples**: Create usage examples in `apps/web/components/playground/`

## Naming Conventions

- **Component files**: `kebab-case.tsx` (e.g., `action-bar.tsx`)
- **Component names**: `PascalCase` (e.g., `ActionBar`)
- **Sub-components**: Prefixed with parent name (e.g., `ActionBarTitle`)
- **Documentation**: Match component file name (e.g., `action-bar.md`)

## File Structure

```
crafted/
├── README.md              # This file
├── index.ts              # Barrel exports
├── action-bar.tsx        # Component implementation
└── action-bar.md         # Component documentation
```
