export interface ComponentCategory {
  slug: string;
  name: string;
  tag?: string;
  group?: string;
  description: string;
  components: { name: string; slug: string; description: string }[];
}

export const components: ComponentCategory[] = [
  {
    slug: 'background',
    name: 'Background',
    tag: 'new',
    group: 'layout',
    description: 'Components for creating visually appealing backgrounds',
    components: [
      {
        name: 'HexagonBackground',
        slug: 'hexagon-background',
        description: 'A customizable hexagon pattern background',
      },
    ],
  },
];

export function getComponent(slug: string): ComponentCategory | undefined {
  return components.find((category) => category.slug === slug);
}
