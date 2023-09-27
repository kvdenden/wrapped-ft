import "@mantine/core/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

import { Box, ColorSchemeScript, Container, Stack, Text } from "@mantine/core";
import Header from "./_components/Header";
import { Providers } from "./providers";
import Footer from "./_components/Footer";

export const metadata = {
  title: "Wrapped FriendTech",
  description: "Wrapped FriendTech converts friend.tech keys into ERC1155 tokens.",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <Stack gap={0} mih="100vh">
            <Header />
            <main>{children}</main>
            <Box mt="auto" pt="lg">
              <Footer />
            </Box>
          </Stack>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
