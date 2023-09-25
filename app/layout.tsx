import "./globals.css";
import "@mantine/core/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import Link from "next/link";
import { Box, ColorSchemeScript, Container, Group, Title } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Providers } from "./providers";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <Box component="header" bg="#00bafa" p="md" mb="md">
            <Container fluid>
              <Group>
                <Link href="/">
                  <Title c="white" size="h2">
                    Wrapped FT
                  </Title>
                </Link>
                <Box ml="auto">
                  <ConnectButton />
                </Box>
              </Group>
            </Container>
          </Box>
          <Container fluid>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
