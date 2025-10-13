import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { loanManagerAbi } from "@/abis/loanManager";
import { LOAN_MANAGER_ADDRESS } from "@/lib/contracts";
import { parseEther } from "viem";

export function useLoanManager(loanId?: bigint) {
  const hasAddress = Boolean(LOAN_MANAGER_ADDRESS);

  const { writeContractAsync, data: txHash, status: writeStatus, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  const { data: loan } = useReadContract({
    abi: loanManagerAbi,
    address: hasAddress ? LOAN_MANAGER_ADDRESS : undefined,
    functionName: "loans",
    args: loanId !== undefined ? [loanId] : undefined,
    query: { enabled: loanId !== undefined && hasAddress },
  });

  function apply(amountEth: string) {
    if (!hasAddress) throw new Error("LoanManager not configured");
    const amountWei = parseEther(amountEth);
    return writeContractAsync({
      abi: loanManagerAbi,
      address: LOAN_MANAGER_ADDRESS!,
      functionName: "apply",
      args: [amountWei],
    });
  }

  function approve(id: bigint) {
    if (!hasAddress) throw new Error("LoanManager not configured");
    return writeContractAsync({
      abi: loanManagerAbi,
      address: LOAN_MANAGER_ADDRESS!,
      functionName: "approve",
      args: [id],
    });
  }

  function disburse(id: bigint) {
    if (!hasAddress) throw new Error("LoanManager not configured");
    return writeContractAsync({
      abi: loanManagerAbi,
      address: LOAN_MANAGER_ADDRESS!,
      functionName: "disburse",
      args: [id],
    });
  }

  function repay(id: bigint, amountEth: string) {
    if (!hasAddress) throw new Error("LoanManager not configured");
    const value = parseEther(amountEth);
    return writeContractAsync({
      abi: loanManagerAbi,
      address: LOAN_MANAGER_ADDRESS!,
      functionName: "repay",
      args: [id],
      value,
    });
  }

  return { apply, approve, disburse, repay, loan, isConfigured: hasAddress, txHash, writeStatus, writeError, isConfirming, isConfirmed };
}


