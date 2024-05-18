'use client';

import { NextUIProvider } from '@nextui-org/react';
// import Link from 'next/link';
// import LoginBtn from './LoginBtn';
// import DarkMode from './DarkMode';
// import { useSession } from 'next-auth/react';

const NextProvider = ({ children }: { children: React.ReactNode }) => {
  // const { data: session } = useSession();

  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
};

export default NextProvider;
