import { NextResponse } from "next/server";

import memoize from "lodash/memoize";

const getWalletInfo = memoize((address: string) =>
  fetch(`https://prod-api.kosetto.com/users/${address}`).then((res) => res.json())
);

export async function GET(_request: Request, { params }: { params: { address: `0x${string}` } }) {
  const { address } = params;

  const walletInfo = await getWalletInfo(address);

  return NextResponse.json(walletInfo);
}
