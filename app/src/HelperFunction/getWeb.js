import Web3 from "web3";
import Web3Modal from "web3modal";
import { providerOptions } from "./chainProvider";
const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions, // required
});

function getWeb3() {
  web3Modal.clearCachedProvider();
  return new Promise(async (resolve, reject) => {
    const provider = await web3Modal.connect();
    provider.wc
      ? await provider.updateRpcUrl(97, "https://data-seed-prebsc-1-s1.binance.org:8545/")
      : console.log("connect with metamask");
    const web3 = new Web3(provider);
    try {
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  });
}

export default getWeb3;