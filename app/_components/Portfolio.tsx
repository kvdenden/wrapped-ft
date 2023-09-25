"use client";

import _ from "lodash";
import { useMemo } from "react";

import Link from "next/link";
import { Avatar, Group, Table, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import useMetadata from "../_hooks/useMetadata";
import useTokenBalances from "../_hooks/useTokenBalances";
import TokenPrice from "./TokenPrice";
import TokenSupply from "./TokenSupply";

// TODO: don't use table, make sure I can click on entire row

const PortfolioItem = ({ tokenId, balance }: { tokenId: `0x${string}`; balance: bigint }) => {
  const metadata = useMetadata(tokenId);
  // const walletInfo = useWalletInfo(tokenId);

  if (!metadata) return null;
  // if(!walletInfo) return null;

  return (
    <Table.Tr>
      <Table.Td>
        <Link href={`/keys/${tokenId}`}>
          <Group>
            <Avatar src={metadata.image} alt={metadata.name} />
            <div>
              <Text size="lg" fw="bold" title={tokenId}>
                {metadata.name}
              </Text>

              <Text size="xs">
                {balance.toString()} / <TokenSupply tokenId={tokenId} /> {balance > 1 ? "keys" : "key"}
              </Text>
            </div>
          </Group>
        </Link>
      </Table.Td>
      <Table.Td>
        <TokenPrice tokenId={tokenId} />
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
      <Title size="h3">Your keys</Title>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Price</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tokenIds.map((tokenId) => (
            <PortfolioItem key={tokenId} tokenId={tokenId} balance={tokenBalances[tokenId]} />
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default Portfolio;
