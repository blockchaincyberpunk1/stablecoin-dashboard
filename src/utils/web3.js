import { ethers } from 'ethers';

/**
 * Checks if MetaMask (or another Ethereum provider) is available in the browser.
 * Throws an error if no provider is available.
 * @returns {ethers.providers.Web3Provider} The initialized Ethereum provider.
 * @throws {Error} If the Ethereum provider is not available.
 */
const getProvider = () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      addProviderListeners(provider);
      return provider;
    } catch (error) {
      console.error("Failed to create a provider:", error);
      throw new Error("Unable to connect to provider. Make sure you have MetaMask installed.");
    }
  } else {
    throw new Error("Ethereum provider is not available. Please install MetaMask.");
  }
};

/**
 * Adds listeners to the provider for account and network changes.
 * @param {ethers.providers.Web3Provider} provider The Ethereum provider.
 */
const addProviderListeners = (provider) => {
  window.ethereum.on('accountsChanged', (accounts) => {
    console.log('Accounts changed:', accounts);
  });

  window.ethereum.on('chainChanged', (chainId) => {
    console.log('Chain changed:', chainId);
    window.location.reload();
  });
};

/**
 * Requests the user's Ethereum account access. If successful, returns the signer object.
 * @returns {Promise<ethers.providers.JsonRpcSigner>} The signer derived from the provider.
 * @throws {Error} If the wallet connection fails.
 */
const connectWallet = async () => {
  try {
    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
  } catch (error) {
    console.error("Failed to connect to wallet:", error);
    throw new Error("Wallet connection failed. Make sure your wallet is unlocked.");
  }
};

/**
 * Instantiates a new ethers Contract object to interact with the smart contract.
 * @param {string} contractAddress The address of the deployed smart contract.
 * @param {Array} contractABI The ABI of the smart contract.
 * @param {ethers.providers.JsonRpcSigner | ethers.providers.Web3Provider} signerOrProvider Either the signer or provider for transaction signing.
 * @returns {ethers.Contract} The contract instance.
 * @throws {Error} If the contract setup fails.
 */
const getContractInstance = (contractAddress, contractABI, signerOrProvider) => {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signerOrProvider);
    return contract;
  } catch (error) {
    console.error("Failed to create contract instance:", error);
    throw new Error("Contract setup failed. Check your ABI and address.");
  }
};

export { getProvider, connectWallet, getContractInstance };
