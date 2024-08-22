import {createConfig} from '@privy-io/wagmi';
import {mainnet,polygon,polygonAmoy} from 'viem/chains';
import {http} from 'wagmi';

export const config = createConfig({
  chains: [polygon, polygonAmoy], // Pass your required chains as an array
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
    // For each of your required chains, add an entry to `transports` with
    // a key of the chain's `id` and a value of `http()`
  },
});