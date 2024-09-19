"use client";

import React, { useEffect, useState } from 'react';
import { ConnectedWallet, PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth';
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from '@privy-io/wagmi';
import { config } from '@/lib/wagmi';
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import {ReactComponent as DarkFlexyLogo} from '/public/icons/darklogo.svg';
import  { OrbisConnectResult, OrbisDB } from "@useorbis/db-sdk"
import { providerToBrowserProvider } from '@/utils/providerUtil';
import {OrbisEVMAuth} from '@useorbis/db-sdk/auth'
import Loader from '@/components/Loader2';


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const InnerProviders = ({ children, themeProps }: ProvidersProps) => {
  const { user, ready, authenticated , login, logout} = usePrivy();
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false)
  const [connection, setConnection] = useState(false)
  const { wallets } = useWallets()

  const db = new OrbisDB({
    ceramic: {
        gateway: "https://ceramic-orbisdb-mainnet-direct.hirenodes.io/"
    },
    nodes: [
        {
            gateway: "https://studio.useorbis.com",
            env: "did:pkh:eip155:1:0xc3d5af402b5aec9545ae0285a0d2af50f812d547"
        }
    ]
})

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

 
  const connect = async (wallet:any) => {
    setLoading(true)
    // Check if the user is authentucated
    if (authenticated) {
      // If no wallet provided, the call didn't come
      // from useEffect
      if (!wallet) return setLoading(false)

      // Fetch the raw Ethereum (request) provider
      const privyProvider = await wallet.getEthereumProvider()
    
     // Orbis Authenticator
      const auth = new OrbisEVMAuth(privyProvider)

      // Authenticate the user and persist the session in localStorage
      const authResult: OrbisConnectResult = await db.connectUser({ auth })

      console.log("Orbis connection result", { authResult });

      if (authResult.auth) {
        setConnection(authResult.auth.session)
      }
    } else {
      // Initiate Privy login
      // Redirect-based oauth flow (unless e-mail OTP is used)
      login()
    }

    setLoading(false)
  }

  const disconnect = async () => {
    setLoading(true)
    db.disconnectUser()
    if (authenticated) {
      await logout()
    }
    setLoading(false)
    setConnection(false)
  }

  useEffect(() => {
    // Look for Privy's embedded wallet and 
    // use it to connect to Orbis if it exists
    // https://docs.privy.io/guide/frontend/embedded/usage/address
    const wallet = wallets.find(w => w.walletClientType === "privy")
    if (authenticated && !connection) {
      console.log('innnn')
      connect(wallets[0])
    }

    console.log("Current user wallets", { wallets })
  }, [wallets])


  if (!ready && !ablyClient && !user) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-[#020817] z-50 flex flex-col justify-center items-center">
        <DarkFlexyLogo className="w-60 h-60" /> 
        <Loader />
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