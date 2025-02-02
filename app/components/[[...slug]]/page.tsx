import { ComponentCard } from '@/components/shared/ComponentCard';
import { ComponentHeader } from '@/components/shared/ComponentHeader';
import { Showcase } from '@/components/shared/Showcase';
import { components, getComponent } from '@/config/components';
import { getComponentsByNames } from '@/lib/utils';
import type { Metadata } from 'next';
import NotFound from '../not-found';
type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const componentPageInfo = getComponent(`${slug?.join('/')}`);

  if (!slug || slug.length === 0) {
    return { title: 'Components - Craft UI' };
  }

  if (!componentPageInfo) {
    return { title: 'Not Found' };
  }

  return {
    title: `${componentPageInfo.name} - Craft UI`,
    description: componentPageInfo.description,
    openGraph: {
      title: `${componentPageInfo.name} - Craft UI`,
      description: componentPageInfo.description,
      type: 'website',
      images: [{ url: '/images/banner.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${componentPageInfo.name} - Craft UI`,
      description: componentPageInfo.description,
      images: ['/images/banner.png'],
    },
  };
}

export async function generateStaticParams() {
  return components.map((component) => ({
    slug: [component.slug],
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const componentPageInfo = getComponent(`${slug?.join('/')}`);

  if (!slug || slug.length === 0) {
    return <Showcase />;
  }

  if (!componentPageInfo) {
    return <NotFound />;
  }
  const components = getComponentsByNames(
    componentPageInfo.components.map((component) => component.slug),
  );

  return (
    <div>
      <ComponentHeader
        name={componentPageInfo.name}
        description={componentPageInfo.description}
        group={componentPageInfo?.group}
      />
      {components.map((component) => (
        <ComponentCard key={component.name} component={component} />
      ))}
    </div>
  );
}
