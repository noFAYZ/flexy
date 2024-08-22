"use client";

import Loader from '@/components/Loader';
import {PrivyProvider, usePrivy} from '@privy-io/react-auth';
import { ThemeProviderProps } from "next-themes/dist/types";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {WagmiProvider} from '@privy-io/wagmi';
import { config } from '@/lib/wagmi';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const queryClient = new QueryClient();

  

  return (
            <PrivyProvider
              appId="clzwzrl1502494w3quowyhb0p"
              config={{
                // Customize Privy's appearance in your app
                appearance: {
                  showWalletLoginFirst: true,
                  theme: 'light',
                  accentColor: '#676FFF',
                  logo: '',
                },
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                  createOnLogin: 'users-without-wallets',
                },
              }}
            >
              <QueryClientProvider client={queryClient}>
                <WagmiProvider config={config}>
                  <NextThemesProvider {...themeProps}>
                    {children} 
                  </NextThemesProvider> 
                </WagmiProvider>
              </QueryClientProvider>
            </PrivyProvider>

           
         
     
       
  );
}
