import React, { useState } from "react";
import { connectWallet, getContractInstance } from "../utils/web3";
import { ethers } from "ethers";
import stablecoinAbi from "../contracts/Stablecoin.json";

/**
 * A React component for burning tokens.
 * Provides a form to enter the amount of tokens to burn and a button to submit the burn transaction.
 */
const BurnForm = () => {
  const [amount, setAmount] = useState(""); // State to hold the amount of tokens to burn
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(""); // State to manage error messages

  /**
   * Handles the burning of tokens by interacting with the smart contract.
   * Validates input, connects to the wallet, and sends a transaction to burn tokens.
   */
  const handleBurn = async () => {
    if (!amount) {
      setError("Please enter an amount to burn.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const signer = await connectWallet(); // Connect to the user's wallet
      const contractAddress = "0x3ca001908C1c9297C02F2D4a63AC5Ab7e38978d7"; // Replace with your contract's address
      const contractABI = stablecoinAbi.abi; // Use the imported ABI

      // Get the contract instance and burn tokens
      const stablecoinContract = getContractInstance(contractAddress, contractABI, signer);
      const tx = await stablecoinContract.burn(signer.getAddress(), ethers.utils.parseUnits(amount, 18));
      await tx.wait(); // Wait for the transaction to be mined
      setAmount(""); // Reset the form after successful burning
      alert("Burn successful!");
    } catch (error) {
      console.error("Burning failed:", error);
      setError(error.message || "Failed to burn tokens."); // Display a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="burn-form">
      <h2>Burn Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to burn"
        disabled={loading}
      />
      <button onClick={handleBurn} disabled={loading}>
        {loading ? "Burning..." : "Burn Tokens"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default BurnForm;
