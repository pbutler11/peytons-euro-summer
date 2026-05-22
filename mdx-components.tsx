import type { MDXComponents } from 'mdx/types';
import { Photo } from '@/components/mdx/Photo';
import { PhotoCarousel } from '@/components/mdx/PhotoCarousel';


export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Photo,
    PhotoCarousel,
  };
}