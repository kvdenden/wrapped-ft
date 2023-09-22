"use client";

import { hexToBigInt } from "viem";
import { useContractRead } from "wagmi";
import useFT from "../_hooks/useFT";

type TokenProps = {
  tokenId: `0x${string}`;
};

const TokenSupply = ({ tokenId }: TokenProps) => {
  const ft = useFT();

  const { data } = useContractRead({
    ...ft,
    functionName: "totalSupply",
    args: [hexToBigInt(tokenId)],
    watch: true,
    suspense: true,
  });

  return <>{data?.toLocaleString("en-US")}</>;
};

export default TokenSupply;
