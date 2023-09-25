import { useEffect, useState } from "react";

type WalletInfo = {
  address?: `0x${string}`;
  twitterUsername?: string;
  twitterName?: string;
  twitterPfpUrl?: string;
};

// TODO: add retry logic
const fetchWalletInfo = async (address: `0x${string}`) => {
  const uri = `/api/wallets/${address}`;
  const walletInfo: WalletInfo = await fetch(uri).then((res) => res.json());

  return walletInfo;
};

const useWalletInfo = (tokenId: `0x${string}`) => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | undefined>();

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      const walletInfo = await fetchWalletInfo(tokenId);

      if (!ignore) {
        setWalletInfo(walletInfo);
      }
    };

    fetch();

    return () => {
      ignore = true;
    };
  }, [tokenId]);

  return walletInfo;
};

export default useWalletInfo;
