import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider, ethers } from 'ethers';
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});
export function rootContainer(container) {
  return <WagmiConfig client={client}>{container}</WagmiConfig>;
}
