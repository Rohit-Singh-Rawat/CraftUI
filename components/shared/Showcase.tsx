'use client';
import { components } from '@/config/components';
import { Puzzle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const RequestButton = () => (
  <Link
    href="https://github.com/Rohit-Singh-Rawat/CraftUI/issues/new?assignees=&labels=component+request&template=component_request.md&title=%5BComponent+Request%5D"
    target="_blank"
    className="group inline-flex items-center gap-2 rounded-full border-2 border-[#554b4b] bg-black px-4 py-2 font-medium text-sm text-white transition-all duration-300 hover:shadow-[inset_0_0_0_100px_rgba(0,0,0,0.05)] dark:border-[#F4F6EF]/10 dark:bg-zinc-900/50 dark:hover:shadow-[inset_0_0_0_100px_rgba(255,255,255,0.05)]"
  >
    <Puzzle className="h-4 w-4 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:text-neutral-600" />
    Request a component
  </Link>
);
export const Showcase = () => {
  const allComponents = components.flatMap((category) =>
    category.components.map((component) => ({
      ...component,
      category: category.name,
      categorySlug: category.slug,
    })),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-start">
        <RequestButton />
      </div>
      <div className="grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
        {allComponents.map((component) => (
          <Link
            href={`/components/${component.categorySlug}`}
            key={component.slug}
            className="group block"
          >
            <div className="overflow-hidden rounded-xl border-2 border-[#4f4f4f]/10 transition-all duration-300 dark:border-[#F4F6EF]/10 ">
              <div className="relative flex h-[300px] h-fit items-center justify-center overflow-hidden">
                <Image
                  src={`/thumbs/${component.slug}.png`}
                  alt={`${component.slug} thumbnail`}
                  loading="lazy"
                  width={720}
                  height={1024}
                  className="aspect-video object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="border-[#4f4f4f]/10 border-t bg-zinc-50/50 p-4 font-rubik dark:border-[#F4F6EF]/10 dark:bg-zinc-900/50">
                <h3 className="font-medium ">{component.name}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {component.description}
                </p>
                <span className="mt-2 inline-flex items-center rounded-md border border-neutral-200 bg-neutral-100 px-2 py-1 font-medium text-neutral-800 text-xs dark:border-neutral-800 dark:bg-neutral-950 dark:text-[#c7c8c5]">
                  {component.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
