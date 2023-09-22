"use client";

import { formatEther } from "viem";

type PriceProps = {
  value: bigint | boolean | number | string;
};

const Price = ({ value }: PriceProps) => {
  return <>{formatEther(BigInt(value))} Ξ</>;
};

export default Price;
