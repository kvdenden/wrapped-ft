import "./globals.css";
import "@mantine/core/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "./providers";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
