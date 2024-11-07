"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { ConnectedWallet, PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth';
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from '@privy-io/wagmi';
import { config } from '@/lib/wagmi';
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { ReactComponent as DarkFlexyLogo } from '/public/images/logo/DeFlexy.svg';
import { OrbisConnectResult, OrbisDB } from "@useorbis/db-sdk";
import { providerToBrowserProvider } from '@/utils/providerUtil';
import { useOrbisStore } from './lib/orbis';
import Loader from '@/components/Loader2';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@nextui-org/button";
import { HeroiconsOutlineStatusOffline, SvgSpinnersPulse2 } from "@/components/icons/icons";
import { CircleDot } from "lucide-react";
import { DrawerProvider } from './hooks/useDrawer';


export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 2,
        },
    },
});

const InnerProviders = ({ children, themeProps }: ProvidersProps) => {
    const { user, ready, authenticated, login, logout } = usePrivy();
    const { wallets } = useWallets();
    const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [connectionAttempted, setConnectionAttempted] = useState(false);

    const {
        connect,
        disconnect,
        loading,
        connected,
        error,
        db
    } = useOrbisStore();

    // Check existing connection
    const checkConnection = useCallback(async () => {
        if (db) {
            const isConnected = await db.isUserConnected();
            return isConnected;
        }
        return false;
    }, [db]);

    // Initialize Ably
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

    // Handle Orbis Connection
    const connectOrbis = useCallback(async (wallet: any) => {
        if (!authenticated) {
            login();
            return;
        }

        try {
            const isAlreadyConnected = await checkConnection();
            if (isAlreadyConnected) {
                return;
            }

            const privyProvider = await wallet.getEthereumProvider();
            await connect(privyProvider);
        } catch (err) {
            console.error('Failed to connect to Orbis:', err);
        }
    }, [authenticated, login, connect, checkConnection]);

    // Connection Effect
    useEffect(() => {
        const handleInitialConnection = async () => {
            if (authenticated && !connected && wallets[0] && !connectionAttempted) {
                setConnectionAttempted(true);
                await connectOrbis(wallets[0]);
            }
        };

        handleInitialConnection();
    }, [authenticated,user, connected, wallets, connectOrbis, connectionAttempted]);

    // Disconnect handler
    const handleDisconnect = async () => {
        try {
            await disconnect();
            if (authenticated) {
                await logout();
            }
            setConnectionAttempted(false);
        } catch (err) {
            console.error('Failed to disconnect:', err);
        }
    };

    // Set initial load state
    useEffect(() => {
        if (ready) {
            setIsInitialLoad(false);
        }
    }, [ready]);

    // Loading State
    if (!ready || (loading && !connected) || isInitialLoad) {
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-[#000102] z-50 flex flex-col justify-center items-center">
                <DarkFlexyLogo className="w-60 h-60" />
                <Loader />
            </div>
        );
    }

    // Error State with Retry
    if (error) {
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-[#000102] z-50 flex flex-col justify-center items-center">
                <div className="text-white text-xl mb-4">Connection Error</div>
                <div className="text-white text-sm mb-4">{error.message}</div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => {
                            setConnectionAttempted(false);
                            if (wallets[0]) connectOrbis(wallets[0]);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry Connection
                    </button>
                    <button
                        onClick={handleDisconnect}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Disconnect
                    </button>
                </div>
            </div>
        );
    }

    function ConnectionStatus() {
      const { connected, loading, connect, disconnect } = useOrbisStore();
      const { wallets } = useWallets();
      const { logout, authenticated } = usePrivy();
      const [isConnecting, setIsConnecting] = useState(false);
  
      const connectOrbis = async () => {
          if (!authenticated) return;
          setIsConnecting(true);
          try {
              const provider = await wallets[0].getEthereumProvider();
              await connect(provider);
          } catch (error) {
              console.error("Connection failed:", error);
          } finally {
              setIsConnecting(false);
          }
      };
  
      const handleDisconnect = async () => {
          try { 
            await logout();
              await disconnect();
             
          } catch (error) {
              console.error("Disconnect failed:", error);
          }
      };
  
      if (loading || isConnecting) {
          return (
              <TooltipProvider>
                  <Tooltip>
                      <TooltipTrigger asChild>
                          <Button
                              isIconOnly
                              className="fixed bottom-4 right-4 bg-yellow-500 text-white rounded-full cursor-wait"
                              isLoading
                              disabled
                          >
                              <SvgSpinnersPulse2 height={14}/>
                          </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="bg-yellow-500 text-white border-yellow-500">
                          <p>Connecting to Orbis...</p>
                      </TooltipContent>
                  </Tooltip>
              </TooltipProvider>
          );
      }
  
      if (!connected) {
          return (
              <TooltipProvider>
                  <Tooltip>
                      <TooltipTrigger asChild>
                          <Button
                              isIconOnly
                              className="fixed bottom-4 right-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              onClick={connectOrbis}
                          >
                              <HeroiconsOutlineStatusOffline height={14}/>
                          </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="bg-red-500 text-white border-red-500">
                          <p>Click to connect to Orbis</p>
                      </TooltipContent>
                  </Tooltip>
              </TooltipProvider>
          );
      }
  
      return (
          <TooltipProvider>
              <Tooltip>
                  <TooltipTrigger asChild>
                      <Button
                          isIconOnly
                          className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                          onClick={handleDisconnect}
                      >
                          <CircleDot size={14} />
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="bg-green-500 text-white border-green-500">
                      <p>Connected - Click to disconnect</p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
      );
  }
    

    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <NextThemesProvider {...themeProps}>
                    {ablyClient ? (
                        <AblyProvider client={ablyClient}>
                            <TooltipProvider>
                                {children}
                                <ConnectionStatus />
                            </TooltipProvider>
                        </AblyProvider>
                    ) : (
                        <TooltipProvider>
                            {children}
                            <ConnectionStatus />
                        </TooltipProvider>
                    )}
                </NextThemesProvider>
            </WagmiProvider>
        </QueryClientProvider>
    );
};

export function Providers({ children, themeProps }: ProvidersProps) {
    return (
        
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID! || 'clzwzrl1502494w3quowyhb0p'}
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
<DrawerProvider>
                {children}
                 </DrawerProvider>
            </InnerProviders>
        </PrivyProvider>
       
    );
}
