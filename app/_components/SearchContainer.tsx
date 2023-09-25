"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import TokenSearch from "./TokenSearch";

const SearchContainer = () => {
  const router = useRouter();

  const handleSelect = useCallback((tokenId: `0x${string}`) => router.push(`/keys/${tokenId}`), [router]);

  return <TokenSearch onSelect={handleSelect} />;
};

export default SearchContainer;
