"use client";

import { formatEther } from "viem";
import { useContractRead } from "wagmi";
import useFT from "../_hooks/useFT";
import Price from "./Price";

type TokenProps = {
  tokenId: `0x${string}`;
};

const TokenPrice = ({ tokenId }: TokenProps) => {
  const ft = useFT();

  const { data } = useContractRead({
    ...ft,
    functionName: "mintPrice",
    args: [tokenId, BigInt(1)],
    watch: true,
  });

  if (data === undefined) return;

  return <Price value={data} />;
};

export default TokenPrice;
