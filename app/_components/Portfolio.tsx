"use client";

import _ from "lodash";
import { useMemo } from "react";

import { Alert, Avatar, Box, Group, Table, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useAccount } from "wagmi";
import useTokenBalances from "../_hooks/useTokenBalances";
import useWalletInfo from "../_hooks/useWalletInfo";
import TokenPrice from "./TokenPrice";
import TokenSupply from "./TokenSupply";

const PortfolioItem = ({ tokenId, balance }: { tokenId: `0x${string}`; balance: bigint }) => {
  // const metadata = useMetadata(tokenId);
  const walletInfo = useWalletInfo(tokenId);

  // if (!metadata) return null;
  if (!walletInfo) return null;

  return (
    <Table.Tr>
      <Table.Td>
        <Link href={`/keys/${tokenId}`}>
          <Group>
            <Avatar src={walletInfo.twitterPfpUrl} alt={walletInfo.twitterName} />
            <div>
              <Text size="lg" fw="bold" title={tokenId}>
                {walletInfo.twitterUsername}
              </Text>

              <Text size="xs">
                {balance.toString()} / <TokenSupply tokenId={tokenId} /> keys
              </Text>
            </div>
            <Box ml="auto">
              <TokenPrice tokenId={tokenId} />
            </Box>
          </Group>
        </Link>
      </Table.Td>
    </Table.Tr>
  );
};

const Portfolio = () => {
  const account = useAccount();
  const tokenBalances = useTokenBalances(account.address);
  const tokenIds = useMemo(() => Object.keys(_.pickBy(tokenBalances, Boolean)) as `0x${string}`[], [tokenBalances]);

  return (
    <>
      <Title order={2} my="lg">
        Your holdings
      </Title>
      {tokenIds.length === 0 ? (
        <Alert color="gray">You don&apos;t have any keys yet.</Alert>
      ) : (
        <Table highlightOnHover striped>
          <Table.Tbody>
            {tokenIds.map((tokenId) => (
              <PortfolioItem key={tokenId} tokenId={tokenId} balance={tokenBalances[tokenId]} />
            ))}
          </Table.Tbody>
        </Table>
      )}
    </>
  );
};

export default Portfolio;
