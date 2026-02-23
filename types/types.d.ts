import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Doc {
  _id: string;
  type: "Doc";
  title: string;
  description: string;
  published: boolean;
  featured: boolean;
  component: boolean;
  author: string;
  body: MDXRemoteSerializeResult | string;
  slug: string;
  slugAsParams: string;
}
