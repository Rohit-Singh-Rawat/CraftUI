import * as React from 'react'
import { SVGProps } from 'react'
const Code = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 4"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M7 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L4.414 12l3.293 3.293A1 1 0 0 1 7 17z"
      data-name="Code, Embed"
      className="transition duration-300 ease-linear group-hover:-translate-x-1"
    />
    <path
      className="transition duration-300 ease-linear group-hover:translate-x-1"
      d="M17 17a1 1 0 0 1-.707-1.707L19.586 12l-3.293-3.293a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 0 1 17 17z"
      data-name="Code, Embed"
    />
    <path
      className="origin-center transition duration-300 ease-linear group-hover:rotate-12"
      d="M10 19a1 1 0 0 1-.949-1.316l4-12a1 1 0 0 1 1.9.632l-4 12A1 1 0 0 1 10 19z"
      data-name="Code, Embed"
    />
  </svg>
)
export default Code
