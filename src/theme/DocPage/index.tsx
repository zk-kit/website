import React, { type ReactNode } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useWindowSize } from '@docusaurus/theme-common';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import type { Props } from '@theme/DocPage';

export default function DocPageWrapper(props: Props): ReactNode {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  
  // Check if TOC should be hidden
  const tocHidden = frontMatter.hide_table_of_contents;
  const canRenderTOC = !tocHidden && toc.length > 0;
  const shouldShowTOC = canRenderTOC && (windowSize === 'desktop' || windowSize === 'ssr');

  return (
    <div className="relative">
      {/* Main content - takes up the available space */}
      <div className="max-w-none">
        {props.children}
      </div>
      
      {/* TOC positioned absolutely in the right column space */}
      {shouldShowTOC && (
        <div className="hidden lg:block fixed top-0 right-0 w-[250px] bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 h-screen">
          <div className="sticky top-0 h-screen overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <DocItemTOCDesktop />
          </div>
        </div>
      )}
      
      {/* Mobile layout */}
      <div className="lg:hidden">
        {/* Mobile TOC will be handled by the original components */}
      </div>
    </div>
  );
}