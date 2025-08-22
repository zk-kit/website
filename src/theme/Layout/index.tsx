import React, { type ReactNode } from 'react';
import OriginalLayout from '@theme-original/Layout';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactNode {
  return <OriginalLayout>{children}</OriginalLayout>;
}