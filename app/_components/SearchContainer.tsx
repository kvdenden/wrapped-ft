"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import TokenSearch from "./TokenSearch";

type SearchProps = {
  variant?: "default" | "minimal";
};

const SearchContainer = ({ variant }: SearchProps) => {
  const router = useRouter();

  const handleSelect = useCallback((tokenId: `0x${string}`) => router.push(`/keys/${tokenId}`), [router]);

  return <TokenSearch onSelect={handleSelect} variant={variant} />;
};

export default SearchContainer;
