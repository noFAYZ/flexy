"use client";

import React, { useEffect, useState } from 'react';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from '@privy-io/wagmi';
import { config } from '@/lib/wagmi';
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import {ReactComponent as DarkFlexyLogo} from '/public/icons/darklogo.svg';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const InnerProviders = ({ children, themeProps }: ProvidersProps) => {
  const { user, ready } = usePrivy();
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (ready) {
      setIsInitialLoad(false);
    }
  }, [ready]);

  useEffect(() => {
    const initializeAbly = async () => {
      if (ready && user?.wallet?.address) {
        const newAblyClient = new Ably.Realtime({ 
          key: 'L3DAxA.cw0H2Q:abkQ3mcUZZ4pGSz-jsh6DFF2PfI3Pmr745WQsx33Z-E',
          clientId: user.wallet.address
        });
        setAblyClient(newAblyClient);
      }
    };

    initializeAbly();
  }, [ready, user?.wallet?.address]);

  if (!ready && !ablyClient && !user) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 z-50 flex flex-col justify-center items-center">
        <DarkFlexyLogo className="w-60 h-60" /> 
        <div className="loader border-t-2 rounded-full border-gray-700 drop-shadow-sm bg-gray-300 animate-spin
      aspect-square w-14 flex justify-center items-center text-yellow-700"></div>
      </div>
    );
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <NextThemesProvider {...themeProps}>
          {ablyClient ? (
            <AblyProvider client={ablyClient}>
              {children}
            </AblyProvider>
          ) : (
            children
          )}
        </NextThemesProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <PrivyProvider
      appId="clzwzrl1502494w3quowyhb0p"
      config={{
        appearance: {
          showWalletLoginFirst: true,
          theme: 'light',
          accentColor: '#676FFF',
          logo: '',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <InnerProviders themeProps={themeProps}>
        {children}
      </InnerProviders>
    </PrivyProvider>
  );
}