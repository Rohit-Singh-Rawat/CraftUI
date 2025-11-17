import type { CraftMetadata } from "./diary";

/**
 * Craft registry - manually define metadata for your components
 * The diary system will automatically find component code, examples, and markdown
 * based on the slug. You only need to specify slug, title, and optionally category.
 */
export const craftRegistry: Record<string, CraftMetadata> = {
  "action-bar": {
    slug: "action-bar",
    title: "Action Bar",
    category: "Navigation",
  },
  "gooey-search-bar": {
    slug: "gooey-search-bar",
    title: "Gooey Search Bar",
    category: "Input",
  },
  "scroll-timeline": {
    slug: "scroll-timeline",
    title: "Scroll-Driven Animations",
    category: "CSS",
  },
  "fluid-asset-preview": {
    slug: "fluid-asset-preview",
    title: "Fluid Asset Preview",
    category: "Inspiration",
  },
  "animated-tabs": {
    slug: "animated-tabs",
    title: "Animated Tabs",
    category: "Inspiration",
  },
  "clock": {
    slug: "clock",
    title: "Clock",
    category: "Inspiration",
  },
  // Add more crafts as you create them
  // "my-component": {
  //   slug: "my-component",
  //   title: "My Component",
  //   category: "UI",
  // },
};

