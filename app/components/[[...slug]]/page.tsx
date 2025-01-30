import type { Metadata } from 'next';
import Link from 'next/link';

import DrawerComponent from '@/components/shared/CodeDialog';
import { componentsInfo } from '@/util/constant';

import NotFound from '../not-found';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const componentPageInfo = componentsInfo[`/${slug}`];

  if (slug === '/' || slug === undefined) {
    return {
      title: 'Components - Craft UI',
    };
  }
  if (!componentPageInfo) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: componentPageInfo.title,
    description: componentPageInfo.description,
  };
}

const Page = ({ params }: { params: { slug: string } }) => {
  const paramSlug = params?.slug;
  const componentPageInfo = componentsInfo[`/${paramSlug}`];
  if (paramSlug === '/' || paramSlug === undefined) {
    return (
      <div className="gridGradient h-full">
        <RequestComponent />
        <p className="mt-40 bg-linear-to-b from-gray-700 via-gray-500 to-gray-300 bg-clip-text text-center font-bold text-8xl text-transparent opacity-60 dark:from-gray-200 dark:via-gray-400 dark:to-gray-600">
          More coming soon...
        </p>
      </div>
    );
  }

  if (!componentPageInfo) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="mb-10">
        <h2 className="my-2 font-semibold text-4xl capitalize">
          {componentPageInfo.title}
        </h2>
        <p className="text-gray-700 text-lg dark:text-gray-300">
          {componentPageInfo.description}
        </p>
        <span className="inline-flex items-center rounded-md border border-[#555553]/30 bg-[#f4f6ef] px-2 py-0.5 font-medium text-gray-800 text-xs dark:border-[#636361] dark:bg-[#262624] dark:text-[#c7c8c5]">
          {componentPageInfo.group}
        </span>
      </div>
      <div className="space-y-14">
        {componentPageInfo.components.map((component) => (
          <div key={component.name}>
            <div className="my-3 flex items-center justify-between">
              <h2>{component.name}</h2>
              <DrawerComponent code={component.code} />
            </div>
            <div className="rounded-xl border border-[#4f4f4f]/10 p-7 dark:border-[#F4F6EF]/10">
              {component.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RequestComponent = () => (
  <div>
    <Link
      href="https://twitter.com/Spacing_Whale"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block rounded-3xl border-2 border-gray-300 bg-clip-border px-4 py-2 font-semibold dark:border-white/10"
    >
      Request a Component
    </Link>
  </div>
);

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return Object.keys(componentsInfo).map((key) => ({
    slug: key.slice(1).split('/'),
  }));
}

export default Page;
