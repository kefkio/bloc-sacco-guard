import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { savingsPoolAbi } from "@/abis/savingsPool";
import { SAVINGS_POOL_ADDRESS } from "@/lib/contracts";

export function useSavingsPool() {
  const { address } = useAccount();
  const hasAddress = Boolean(SAVINGS_POOL_ADDRESS);

  const { data: balance } = useReadContract({
    abi: savingsPoolAbi,
    address: hasAddress ? SAVINGS_POOL_ADDRESS : undefined,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) && hasAddress },
  });

  const { writeContractAsync, data: txHash, status: writeStatus, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  async function depositEth(amountEth: string) {
    if (!hasAddress) throw new Error("SavingsPool not configured");
    const value = parseEther(amountEth);
    await writeContractAsync({
      abi: savingsPoolAbi,
      address: SAVINGS_POOL_ADDRESS!,
      functionName: "deposit",
      value,
    });
  }

  async function withdraw(amountEth: string) {
    if (!hasAddress) throw new Error("SavingsPool not configured");
    const value = parseEther(amountEth);
    await writeContractAsync({
      abi: savingsPoolAbi,
      address: SAVINGS_POOL_ADDRESS!,
      functionName: "withdraw",
      args: [value],
    });
  }

  return {
    balance,
    isConfigured: hasAddress,
    depositEth,
    withdraw,
    txHash,
    writeStatus,
    writeError,
    isConfirming,
    isConfirmed,
  };
}


