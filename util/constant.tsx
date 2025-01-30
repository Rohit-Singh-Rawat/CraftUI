import HexagonBackground from '@/components/crafts/HexagonBackground';
import type { ComponentPageInfo } from '@/lib/types';

export const componentsInfo: Record<string, ComponentPageInfo> = {
  '/button': {
    title: 'Button',
    tag: 'new',
    group: 'Form',
    path: '/components/button',
    description: 'A simple button component',
    components: [
      {
        name: 'Button',
        code: '<Button>Click me</Button>',
        component: <div>Click me</div>,
      },
      {
        name: 'IconButton',
        code: '<IconButton>Icon</IconButton>',
        component: <div>Icon</div>,
      },
    ],
  },
  '/marquee': {
    title: 'Marquee',
    group: 'Feedback',
    path: '/components/marquee',
    description: 'A marquee component for scrolling text',
    components: [
      {
        name: 'Marquee',
        code: '<Marquee>Scrolling text</Marquee>',
        component: <div>Scrolling text</div>,
      },
    ],
  },
  '/bento': {
    title: 'Bento',
    group: 'Layout',
    path: '/components/bento',
    description: 'A layout component for bento-style content',
    components: [
      {
        name: 'Bento',
        code: '<Bento>Content</Bento>',
        component: <div>Content</div>,
      },
    ],
  },
  '/web3-swap': {
    title: 'Swap',
    group: 'Web3',
    path: '/components/web3-swap',
    description: 'A component for swapping tokens in Web3',
    components: [
      {
        name: 'Swap',
        code: '<Web3Swap>Swap here</Web3Swap>',
        component: <div>Swap here</div>,
      },
    ],
  },
  '/backgrounds': {
    title: 'Backgrounds',
    group: 'Layout',
    tag: 'new',
    path: '/components/backgrounds',
    description: 'A customizable  background components',
    components: [
      {
        name: 'Hexagon Background',
        code: '<HexagonBackground color="#FFFF00" secondaryColor="#CC5500" fade cellSize="200px" opacity={0.8} />',
        component: (
          <div className="relative h-[300px] sm:h-[400px]">
            <HexagonBackground
              className="absolute inset-0"
              color="#1F2942"
              secondaryColor="#288898"
              fade
              cellSize="80px"
              opacity={0.7}
            />
            <div className="relative z-10 flex h-full items-center justify-center p-4 text-center sm:p-6">
              <h2 className="bg-gradient-to-b from-black to-green-200/50 bg-clip-text font-semibold text-2xl text-transparent sm:text-3xl md:text-6xl dark:from-white/70 dark:to-green-900/20">
                Hexagon Background
              </h2>
            </div>
          </div>
        ),
      },
    ],
  },
};
