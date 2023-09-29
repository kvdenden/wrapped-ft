"use client";

import Link from "next/link";
import { Anchor, Box, Container, Group, Title } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SearchContainer from "./SearchContainer";
import OpenSeaIcon from "../_icons/OpenSeaIcon";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();

  return (
    <Box component="header" bg="#00bafa" p="md">
      <Container fluid>
        <Group>
          <Link href="/">
            <Title c="white" size="h3">
              wrappedfriend.tech
            </Title>
          </Link>
          <Box ml="auto" maw="30em" style={{ flexGrow: 1 }}>
            {path !== "/" && (
              <Box visibleFrom="sm">
                <SearchContainer variant="minimal" />
              </Box>
            )}
          </Box>
          <Group>
            <Anchor
              href={process.env.NEXT_PUBLIC_OPENSEA_COLLECTION_URL}
              target="_blank"
              rel="noreferrer"
              display="flex"
            >
              <OpenSeaIcon color="white" />
            </Anchor>
          </Group>
          <Box>
            <ConnectButton showBalance={false} accountStatus="address" />
          </Box>
        </Group>
      </Container>
    </Box>
  );
};

export default Header;
