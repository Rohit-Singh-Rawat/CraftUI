
export type ComponentInfo = {
  name: string
  code: string
  component: ReactNode
}

export type ComponentPageInfo = {
  title: string
  tag?: string
  group: string
  path: string
  description: string
  components: ComponentInfo[]
}