# Crafted Components

Custom, production-ready UI components built specifically for rsrCrafts. Following shadcn/ui patterns with full accessibility, TypeScript support, and theme integration.

## Components

### ActionBar

Floating bottom action bar with two modes: **dock** (persistent nav) and **contextual** (conditional display).

#### Mode: Dock

Always visible persistent navigation, like mobile tab bars or macOS dock.

```tsx
import {
	ActionBarProvider,
	ActionBar,
	ActionBarLogo,
	ActionBarNav,
	ActionBarActions,
} from '@/components/crafted/action-bar';

<ActionBarProvider mode='dock'>
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

**Sub-components:**

- `ActionBarProvider` - Context provider (required)
- `ActionBar` - Root container (floating, centered bottom)
- `ActionBarLogo` - Logo container (dock mode)
- `ActionBarNav` - Navigation links (dock mode)
- `ActionBarHeader`, `ActionBarTitle`, `ActionBarDescription` - Content
- `ActionBarContent` - Flexible wrapper (contextual mode)
- `ActionBarActions` - Button container
- `ActionBarClose` - Pre-styled close button
- `ActionBarSeparator` - Vertical divider
- `ActionBarTrigger` - Toggle button (contextual mode)

**ActionBarProvider Props:**

- `mode?: "dock" | "contextual"` - Display mode (default: "contextual")
- `open?: boolean` - Controlled state (contextual only)
- `onOpenChange?: (open: boolean) => void` - State callback
- `defaultOpen?: boolean` - Uncontrolled default (default: false)

**ActionBar Props:**

- `variant?: "default" | "destructive" | "success" | "warning"`
- `size?: "default" | "sm" | "lg"`
- `bottomOffset?: number` - Distance from bottom in px (default: 24)
- `maxWidth?: string` - Max width (default: "640px")
- `animationDelay?: number` - Animation delay in ms (default: 100)

**Features:** Floating design, smooth slide-up animations, ARIA support, keyboard navigation, responsive, both controlled/uncontrolled patterns

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
