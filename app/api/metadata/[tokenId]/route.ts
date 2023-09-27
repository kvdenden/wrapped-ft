import { NextResponse } from "next/server";

import memoize from "lodash/memoize";
import { createPublicClient, getAddress, http, numberToHex } from "viem";
import { mainnet } from "viem/chains";

const getWalletInfo = memoize((address: string) =>
  fetch(`https://prod-api.kosetto.com/users/${address}`).then((res) => res.json())
);

const tokenImage = (displayName: string, account: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" style="background-color:#00bafa;"><text fill="white" font-size="72px" font-family="monospace" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${displayName}</text><text fill="white" font-size="24px" font-family="monospace" x="99%" y="99%" text-anchor="end">${account}</text></svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
};

const shortAccount = (account: string) => `${account.substring(0, 5)}…${account.substring(account.length - 4)}`;

export async function GET(_request: Request, { params }: { params: { tokenId: string } }) {
  const { tokenId } = params;

  const address = getAddress(numberToHex(BigInt(`0x${tokenId}`), { size: 20 })); // convert tokenId to address
  const walletInfo = await getWalletInfo(address);

  const client = createPublicClient({ chain: mainnet, transport: http() });
  const ensName = await client.getEnsName({ address });

  const { twitterUsername } = walletInfo;
  const displayName = twitterUsername ?? ensName ?? shortAccount(address);

  const metadata = {
    name: displayName,
    image: tokenImage(displayName, address),
    external_url: twitterUsername && `https://twitter.com/${twitterUsername}`,
  };

  return NextResponse.json(metadata);
}
