"use client";

import { Anchor, AspectRatio, Avatar, Card, Group, Space, Text } from "@mantine/core";
import { IconBrandTwitter } from "@tabler/icons-react";
import TokenSupply from "./TokenSupply";
import TokenPrice from "./TokenPrice";
import MintForm from "./MintForm";
import useMetadata from "../_hooks/useMetadata";
import { getAddress } from "viem";

type TokenProps = {
  tokenId: `0x${string}`;
};

const TokenCard = ({ tokenId }: TokenProps) => {
  const metadata = useMetadata(tokenId);

  if (!metadata) return; // TODO: loading state

  return (
    <Card shadow="md" withBorder>
      <Card.Section>
        <AspectRatio ratio={1}>
          <Avatar src={metadata.image} alt={metadata.name} radius={0} />
        </AspectRatio>
      </Card.Section>
      <Group justify="space-between" align="center" mt="lg">
        <Text fw="bolder" size="lg">
          {metadata.name}
        </Text>
        {metadata.external_url && (
          <Anchor href={metadata.external_url} target="_blank" rel="noreferrer" display="inline-flex">
            <IconBrandTwitter />
          </Anchor>
        )}
      </Group>
      <Text size="xs" c="dimmed" truncate>
        {getAddress(tokenId)}
      </Text>
      <Space h="md" />
      <Group justify="space-between">
        <Text>
          Supply
          <br />
          <Text fw="bold" span>
            <TokenSupply tokenId={tokenId} />
          </Text>
        </Text>
        <Text ta="right">
          Price
          <br />
          <Text fw="bold" span>
            <TokenPrice tokenId={tokenId} />
          </Text>
        </Text>
      </Group>
      {/* <Space h="md" />
      <MintForm tokenId={tokenId} /> */}
    </Card>
  );
};

export default TokenCard;
