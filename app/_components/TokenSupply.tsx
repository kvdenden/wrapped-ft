"use client";

import useSupply from "../_hooks/useSupply";

type TokenProps = {
  tokenId: `0x${string}`;
};

const TokenSupply = ({ tokenId }: TokenProps) => {
  const supply = useSupply(tokenId);

  return <>{supply?.toLocaleString("en-US")}</>;
};

export default TokenSupply;
