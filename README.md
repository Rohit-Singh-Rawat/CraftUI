# Craft Diary

A curated collection of production-ready UI components and micro-interactions built with React, TypeScript, and modern design principles. Each craft is meticulously documented in a diary-style format with live demos, source code, and design notes.

## What is Craft Diary?

Craft Diary is a component diary system that treats UI components as craft entries. It's built on a file-based architecture where each component automatically becomes a discoverable entry with:

- **Live interactive previews** with side-by-side code viewing
- **Complete source code** in an elegant code drawer
- **MDX-powered documentation** for design decisions and usage notes
- **Copy-paste ready** - no npm install required, just grab and go
- **Automatic discovery** - drop a component file and it's instantly available

## Features

- 📖 **Diary System** - File-based component discovery with automatic metadata extraction
- 🎨 **Beautiful by default** - Modern design with dark mode support
- ♿ **Fully accessible** - ARIA compliant with keyboard navigation
- 📱 **Responsive** - Split-panel layout adapts to any screen size
- 🎭 **Animated** - Smooth transitions and micro-interactions
- 🔧 **Customizable** - Built with Tailwind CSS and CSS variables
- 📚 **MDX Documentation** - Write docs alongside your components

## How It Works

The Diary System automatically discovers and organizes your components:

1. **Drop a component** in `craft/components/{name}.tsx`
2. **Add metadata** in `registry.ts` (optional - title/category)
3. **Write docs** in `content/crafts/{name}.mdx` (optional)
4. **Create examples** in `craft/example/{name}.tsx` (optional)
5. **It's live!** Visit `/diary` to see your new craft entry

The diary system reads your files and generates:

- A gallery page at `/diary` grouped by category
- Individual craft pages at `/crafts/{slug}`
- Code drawers with syntax highlighting
- Automatic component metadata extraction

## Current Crafts

- **ActionBar** - Flexible floating action bar with dock and contextual modes
- **GooeySearchBar** - Animated search bar with gooey blob effects

## Project Structure

```
craft/
├── components/           # Source components (copy from here)
│   ├── action-bar.tsx
│   ├── gooey-search-bar.tsx
│   └── README.md        # Component development guide
└── example/             # Demo implementations
    └── action-bar-demo.tsx

content/crafts/          # MDX documentation
├── action-bar.mdx
└── gooey-search-bar.mdx

app/
├── (landing)/           # Homepage
└── (diary)/             # Diary route group
    ├── diary/           # Gallery view (lists all crafts)
    ├── crafts/[slug]/   # Individual craft pages
    └── playground/      # Interactive testing ground

diary.ts                 # Core diary system (file discovery)
registry.ts              # Craft metadata registry
```

## Getting Started

### Development

```bash
# Install dependencies
bun install

# Run development server
bun dev
```

Open [http://localhost:3000/diary](http://localhost:3000/diary) to browse the craft diary.

### Using Components

1. Browse the [craft diary](http://localhost:3000/diary)
2. Click on any craft to see live preview and documentation
3. Click "Component" or "Example" buttons to view code in the drawer
4. Copy the source code directly from the drawer
5. Paste into your project and customize

Each component is self-contained with minimal dependencies.

### Creating a New Craft

```bash
# 1. Create component file
craft/components/my-component.tsx

# 2. Register in registry.ts
"my-component": {
  slug: "my-component",
  title: "My Component",
  category: "UI"
}

# 3. (Optional) Add documentation
content/crafts/my-component.mdx

# 4. (Optional) Add example
craft/example/my-component-demo.tsx
```

The diary system handles the rest automatically!

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI primitives
- **Documentation**: MDX (@next/mdx, @mdx-js/react)
- **Icons**: Hugeicons + Lucide React
- **Animations**: Motion (Framer Motion fork)
- **Package Manager**: Bun

## Core System

The diary system (`diary.ts`) provides:

- `getAllCraftSlugs()` - Discover all components
- `getCraftBySlug(slug)` - Load component with code, examples, docs
- `getAllCrafts()` - Get all crafts with metadata
- `getCraftsByCategory()` - Organized by category
- `searchCrafts(query)` - Search across title/slug/category

Automatically extracts:

- Component titles from displayName or export names
- Categories from MDX frontmatter
- File paths and source code

## Contributing

When creating new crafts, follow these principles:

1. **File-based discovery** - Drop component in `craft/components/` and it's auto-discovered
2. **shadcn/ui patterns** - Composable, unstyled primitives with variants
3. **Accessibility first** - Proper ARIA labels and keyboard navigation
4. **TypeScript strict mode** - Fully typed with exported interfaces
5. **Responsive design** - Mobile-first approach
6. **Performance conscious** - Optimized animations and minimal rerenders

See [craft/components/README.md](./craft/components/README.md) for detailed guidelines.

## License

MIT - Feel free to use in your projects

---

Built with ❤️ by [Rohit Singh Rawat](https://github.com/rohitsinghrawat)
