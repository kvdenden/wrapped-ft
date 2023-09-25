"use client";

import { Alert, Button, SegmentedControl, Text, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

import MintForm from "./MintForm";
import { useEffect, useState } from "react";
import useSupply from "../_hooks/useSupply";

type TokenProps = {
  tokenId: `0x${string}`;
};

const TokenActionTabs = ({ tokenId }: TokenProps) => {
  const supply = useSupply(tokenId);
  const [action, setAction] = useState("mint");

  if (!supply) {
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
      {action === "mint" ? (
        <>
          <Title size="h3">Buy wrapped keys</Title>
          <MintForm tokenId={tokenId} />
        </>
      ) : (
        <>
          <Title size="h3">Sell wrapped keys</Title>
          <MintForm tokenId={tokenId} />
        </>
      )}
    </>
  );
};

export default TokenActionTabs;
