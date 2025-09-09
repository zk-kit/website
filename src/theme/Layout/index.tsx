import React, { type ReactNode, useEffect } from 'react';
import OriginalLayout from '@theme-original/Layout';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactNode {
  useEffect(() => {
    // Remove page transition logic - immediately mark as loaded
    document.body.classList.add('page-loaded');
  }, []);

  return <OriginalLayout>{children}</OriginalLayout>;
}