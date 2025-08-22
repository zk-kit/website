import React, { type ReactNode, useEffect } from 'react';
import OriginalLayout from '@theme-original/Layout';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactNode {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('page-visited');
    
    if (!hasVisited) {
      const timer = setTimeout(() => {
        document.body.classList.add('page-loaded');
        sessionStorage.setItem('page-visited', 'true');
      }, 350);
      
      return () => clearTimeout(timer);
    } else {
      document.body.classList.add('page-loaded');
    }
  }, []);

  return <OriginalLayout>{children}</OriginalLayout>;
}