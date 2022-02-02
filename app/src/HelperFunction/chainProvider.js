import WalletConnectProvider from "@walletconnect/web3-provider";
// const provider = new WalletConnectProvider({
//   rpc: { 1723: "https://apifessscan.com/rpc" },
//   chainId: 1723,
//   infuraId: "9aa3d95b3bc440fa88ea12eaa4456161",
// });
export const providerOptions = {
  injected: {
    display: {
      name: "Metamask",
      description: "Connect with the provider in your Browser",
    },
    package: null,
  },
  // Example with WalletConnect provider
  walletconnect: {
    display: {
      name: "Wallet Connect",
      description: "Scan QR code with your mobile wallet",
    },
    package: WalletConnectProvider,
    connector: async (ProviderPackage, options) => {
      const provider = new ProviderPackage(options);

      await provider.enable();

      return provider;
    },
    options: {
      rpc: { 53556: "https://rpc01.bdltscan.io/"},
      chainId: 53556,
      rpcUrl:"https://rpc01.bdltscan.io/",
      infuraId: "9aa3d95b3bc440fa88ea12eaa4456161",
    }
  },
};