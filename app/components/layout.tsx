import type { ReactNode } from 'react';

import LeftSideBar from '@/components/shared/leftSideBar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className=" mt-12 w-full items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <LeftSideBar />
      <div className="lg:mr-10 lg:flex lg:max-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-70px)] lg:max-w-7xl lg:overflow-hidden lg:rounded-2xl lg:border-[#4f4f4f]/10 lg:border-x lg:p-7 lg:dark:border-[#F4F6EF]/10">
        <div className="custom-scrollbar overflow-y-auto p-2 lg:w-full lg:rounded-2xl lg:border-[#4f4f4f]/10 lg:border-y lg:p-5 lg:dark:border-[#F4F6EF]/10">
          {children}
        </div>
      </div>
    </div>
  );
}
