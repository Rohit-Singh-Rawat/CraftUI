import * as React from 'react'
import { SVGProps } from 'react'
const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#6A7283"
        fillRule="evenodd"
        d="M14.5 9a6.503 6.503 0 0 0-6.13 4.333 1 1 0 1 1-1.886-.666 8.5 8.5 0 1 1 15.153 7.451l3.977 3.093a1 1 0 0 1-1.228 1.578l-4.026-3.131A8.47 8.47 0 0 1 14.5 24a8.499 8.499 0 0 1-7.519-4.533 1 1 0 1 1 1.768-.934A6.5 6.5 0 1 0 14.5 9ZM8 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default Search
