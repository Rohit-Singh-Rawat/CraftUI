'use client';
import CodeDialog from '@/components/shared/CodeDialog';
import { type JSX, useEffect, useState } from 'react';

import type { RegistryItem } from 'shadcn/registry';
import { highlight } from './Code-block';
import ComponentLoader from './ComponentLoader';

export const ComponentCard = ({ component }: { component: RegistryItem }) => {
  const [code, setCode] = useState<string | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<JSX.Element | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCode = async () => {
      try {
        const response = await fetch(`/r/${component.name}.json`);
        const data = await response.json();
        const codeContent = data.files[0].content;
        setCode(codeContent);

        const highlighted = await highlight(codeContent, 'ts');
        setHighlightedCode(highlighted);
        setError(null);
      } catch (error) {
        console.error('Failed to load code:', error);
        setError('Failed to load code');
        setCode(null);
        setHighlightedCode(null);
      }
    };

    loadCode();
  }, [component.name]);

  return (
    <div className="w-full">
      <div className="my-3 flex flex-col items-center justify-between sm:flex-row">
        <h2 className="mb-2 font-semibold text-lg sm:mb-0">
          {component.title}
        </h2>
        <CodeDialog code={code || ''} />
      </div>
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-[#4f4f4f]/10 p-4 sm:min-h-[300px] sm:p-7 dark:border-[#F4F6EF]/10">
        <ComponentLoader component={component} />
      </div>
    </div>
  );
};
