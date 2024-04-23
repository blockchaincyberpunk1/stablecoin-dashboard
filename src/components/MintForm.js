import React, { useState } from "react";
import { connectWallet, getContractInstance } from "../utils/web3";
import { ethers } from "ethers";
import stablecoinAbi from "../contracts/Stablecoin.json";

/**
 * A React component for minting tokens.
 * Provides a form to enter the amount of tokens to mint and a button to submit the mint transaction.
 */
const MintForm = () => {
  const [amount, setAmount] = useState(""); // State to hold the amount of tokens to mint
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(""); // State to manage error messages

  /**
   * Handles minting of new tokens by interacting with the smart contract.
   * Validates the input, connects to the wallet, and sends a transaction to mint tokens.
   */
  const handleMint = async () => {
    if (!amount) {
      setError("Please enter an amount to mint.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const signer = await connectWallet(); // Connect to the user's wallet
      const contractAddress = "0x3ca001908C1c9297C02F2D4a63AC5Ab7e38978d7"; // Replace with your contract's address
      const contractABI = stablecoinAbi.abi; // Use the imported ABI

      // Get the contract instance and mint tokens
      const stablecoinContract = getContractInstance(contractAddress, contractABI, signer);
      const tx = await stablecoinContract.mint(signer.getAddress(), ethers.utils.parseUnits(amount, 18));
      await tx.wait(); // Wait for the transaction to be mined
      setAmount(""); // Reset the form after successful minting
      alert("Mint successful!");
    } catch (error) {
      console.error("Minting failed:", error);
      setError(error.message || "Failed to mint tokens."); // Display a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mint-form">
      <h2>Mint Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to mint"
        disabled={loading}
      />
      <button onClick={handleMint} disabled={loading}>
        {loading ? "Minting..." : "Mint Tokens"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MintForm;
