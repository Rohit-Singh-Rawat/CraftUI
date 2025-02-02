import type { ReactNode } from 'react';

import LeftSideBar from '@/components/shared/leftSideBar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <LeftSideBar />
      <div className="mr-10 flex max-h-[calc(100vh-70px)] min-h-[calc(100vh-70px)] max-w-7xl overflow-hidden rounded-2xl border-[#4f4f4f]/10 border-x p-7 dark:border-[#F4F6EF]/10">
        <div className="custom-scrollbar w-full overflow-y-scroll rounded-2xl border-[#4f4f4f]/10 border-y p-5 dark:border-[#F4F6EF]/10">
          {children}
        </div>
      </div>
    </div>
  );
}
