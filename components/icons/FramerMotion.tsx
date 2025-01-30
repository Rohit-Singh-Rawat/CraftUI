import * as React from 'react';
import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
    height={24}
    {...props}
    className="size-10"
  >
    <path d="M12 12 4 4v16L20 4v16l-4-4" />
    <path d="m20 12-8 8-4-4" />{' '}
  </svg>
);
export { SvgComponent as FramerMotion };
