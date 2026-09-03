import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableTextBlock } from "@/lib/sanity/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-pretty text-[17px] leading-[1.8] text-background/82">{children}</p>
    ),
  },
};

type BusinessPortableTextProps = {
  value?: PortableTextBlock[];
  className?: string;
};

export function BusinessPortableText({ value, className }: BusinessPortableTextProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
