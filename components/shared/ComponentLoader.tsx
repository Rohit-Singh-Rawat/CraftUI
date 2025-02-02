'use client';

import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { RegistryItem } from 'shadcn/registry';

interface ComponentLoaderProps {
  component: RegistryItem;
}

export default function ComponentLoader<TProps extends object>({
  component,
  ...props
}: ComponentLoaderProps & TProps) {
  if (!component.files?.length) {
    return null;
  }
  const Component = dynamic(
    () =>
      import(`@/registry/demo/${component.name}-demo`).catch(() => () => null),
    {
      loading: () => (
        <div
          data-loading="true"
          className="peer flex min-h-20 items-center justify-center"
        >
          <span className="sr-only">Loading component...</span>
          <LoaderCircle
            className="-ms-1 me-2 animate-spin text-input"
            size={24}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      ),
      ssr: false,
    },
  ) as ComponentType<TProps>;

  return <Component {...(props as TProps)} currentPage={1} totalPages={10} />;
}
