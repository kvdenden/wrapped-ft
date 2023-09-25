import { useContractRead } from "wagmi";
import useFT from "./useFT";
import { hexToBigInt } from "viem";

const useSupply = (tokenId: `0x${string}`) => {
  const ft = useFT();

  const { data } = useContractRead({
    ...ft,
    functionName: "totalSupply",
    args: [hexToBigInt(tokenId)],
    watch: true,
  });

  return data;
};

export default useSupply;
