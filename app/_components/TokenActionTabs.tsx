"use client";

import { Alert, Group, Paper, SegmentedControl, Space, Text } from "@mantine/core";
import { IconInfoCircle, IconUserCircle } from "@tabler/icons-react";

import { useState } from "react";
import { useAccount } from "wagmi";
import useSupply from "../_hooks/useSupply";
import useTokenBalance from "../_hooks/useTokenBalance";
import BurnForm from "./BurnForm";
import MintForm from "./MintForm";

type TokenProps = {
  tokenId: `0x${string}`;
};

const TokenActionTabs = ({ tokenId }: TokenProps) => {
  const supply = useSupply(tokenId);
  const [action, setAction] = useState("mint");

  const account = useAccount();
  const tokenBalance = useTokenBalance(account.address, tokenId);

  if (supply.isLoading) return null;

  if (!supply.data) {
    return (
      <>
        <Alert title="Invalid key" color="red" icon={<IconInfoCircle />}>
          Key{" "}
          <Text fw="bold" ff="monospace" span>
            {tokenId}
          </Text>{" "}
          has not yet been created.
        </Alert>
      </>
    );
  }

  return (
    <>
      <Paper withBorder shadow="md" p="lg">
        <Group justify="space-between" grow>
          <SegmentedControl
            color="blue"
            size="lg"
            value={action}
            onChange={setAction}
            data={[
              { value: "mint", label: "Buy" },
              { value: "burn", label: "Sell" },
            ]}
          ></SegmentedControl>
        </Group>
        <Space h="md" />
        <Group gap="xs" justify="flex-end">
          <IconUserCircle />
          <Text size="sm">
            You own {tokenBalance?.toString()} {tokenBalance === BigInt(1) ? "key" : "keys"}
          </Text>
        </Group>
        <Space h="md" />
        {action === "mint" ? (
          <>
            <MintForm tokenId={tokenId} />
          </>
        ) : (
          <>
            <BurnForm tokenId={tokenId} />
          </>
        )}
      </Paper>
    </>
  );
};

export default TokenActionTabs;
