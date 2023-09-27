"use client";

import Link from "next/link";
import { Anchor, Box, Container, Group, Title } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SearchContainer from "./SearchContainer";
import OpenSeaIcon from "../_icons/OpenSeaIcon";

const Header = () => {
  return (
    <Box component="header" bg="#00bafa" p="md">
      <Container fluid>
        <Group wrap="nowrap">
          <Link href="/">
            <Title c="white" size="h3">
              wrappedfriend.tech
            </Title>
          </Link>
          <Box ml="auto" maw="30em" style={{ flexGrow: 1 }}>
            <Box visibleFrom="sm">
              <SearchContainer variant="minimal" />
            </Box>
          </Box>
          <Group>
            <Anchor
              href={process.env.NEXT_PUBLIC_OPENSEA_COLLECTION_URI}
              target="_blank"
              rel="noreferrer"
              display="flex"
            >
              <OpenSeaIcon color="white" />
            </Anchor>
          </Group>
          <Box>
            <ConnectButton showBalance={false} accountStatus="address" chainStatus="none" />
          </Box>
        </Group>
      </Container>
    </Box>
  );
};

export default Header;
