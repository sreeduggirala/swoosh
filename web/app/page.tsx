"use client";
import { generateMetadata } from '@/utils/generateMetadata';
import SignInPage from './sign-in';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains";
import { base } from 'viem/chains';

// export const metadata = generateMetadata({
//   title: 'Build Onchain Apps Toolkit',
//   description:
//     'Save weeks of initial app setup and the hassle of integrating onchain components with web2 infrastructure.',
//   images: 'themes.png',
//   pathname: '',  
// }); 

/**
 * Server component, which imports the Home component (client component that has 'use client' in it)
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-4-migrating-pages
 * https://nextjs.org/docs/app/building-your-application/rendering/client-components
 */
export default function Page() {
  return (
    <ThirdwebProvider
    activeChain={BaseSepoliaTestnet}
      clientId="3524eeab46d7c262cb23bcf072d92d5e"
    >
      <SignInPage />
    </ThirdwebProvider>
  );
}  