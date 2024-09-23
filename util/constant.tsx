import { ReactNode } from 'react'

type ComponentInfo = {
  name: string
  code: string
  component: ReactNode
}

type ComponentPageInfo = {
  title: string
  tag?: string
  group: string
  path: string
  description: string
  components: ComponentInfo[]
}

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
}
