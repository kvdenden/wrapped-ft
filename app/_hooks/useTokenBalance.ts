import { useContractRead } from "wagmi";
import useFT from "./useFT";
import { hexToBigInt } from "viem";

const useTokenBalance = (account: `0x${string}` | undefined, tokenId: `0x${string}`) => {
  const ft = useFT();

  const { data } = useContractRead({
    ...ft,
    functionName: "balanceOf",
    args: [account!, hexToBigInt(tokenId)],
    watch: true,
    enabled: !!account,
  });

  return data;
};

export default useTokenBalance;
