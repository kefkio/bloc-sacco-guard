import {
  useAccount,
  useContractRead,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { memberRegistryAbi } from '@/abis/memberRegistry';
import { MEMBER_REGISTRY_ADDRESS } from '@/lib/contracts';

export function useMemberRegistry() {
  const { address } = useAccount();
  const hasAddress = Boolean(MEMBER_REGISTRY_ADDRESS && address);

  // Read membership status
  const { data: isMember } = useContractRead({
    abi: memberRegistryAbi,
    address: MEMBER_REGISTRY_ADDRESS,
    functionName: 'isMember',
    args: address ? [address] : undefined,
    query: { enabled: hasAddress },
  });

  // Optional: Read KYC status
  const { data: kycPassed } = useContractRead({
    abi: memberRegistryAbi,
    address: MEMBER_REGISTRY_ADDRESS,
    functionName: 'kycPassed',
    args: address ? [address] : undefined,
    query: { enabled: hasAddress },
  });

  // Write: Register member
  const {
    writeContractAsync,
    data: txHash,
    status: writeStatus,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

  async function register() {
    if (!MEMBER_REGISTRY_ADDRESS) throw new Error('MemberRegistry not configured');
    await writeContractAsync({
      abi: memberRegistryAbi,
      address: MEMBER_REGISTRY_ADDRESS,
      functionName: 'register',
    });
  }

  return {
    isMember: Boolean(isMember),
    kycPassed: Boolean(kycPassed),
    isConfigured: hasAddress,
    register,
    txHash,
    writeStatus,
    writeError,
    isConfirming,
    isConfirmed,
  };
}