import { ReactNode } from 'react'

import LeftSideBar from '@/components/shared/leftSideBar'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <LeftSideBar />
      <div className="mr-10 flex max-h-[calc(100vh-80px)] max-w-7xl overflow-hidden border-x border-[#4f4f4f]/10 p-7 dark:border-[#F4F6EF]/10">
        <div className="custom-scrollbar w-full overflow-y-scroll border-y border-[#4f4f4f]/10 p-5 dark:border-[#F4F6EF]/10">
          {' '}
          {children}
        </div>
      </div>
    </div>
  )
}
