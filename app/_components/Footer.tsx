import { Anchor, Box, Container, Group, Text } from "@mantine/core";
import EtherScanIcon from "../_icons/EtherScanIcon";

const Footer = () => {
  return (
    <Box component="footer" bg="dark.4" p="md">
      <Container fluid>
        <Group justify="space-between">
          <Anchor
            href={`https://basescan.org/address/${process.env.NEXT_PUBLIC_WRAPPED_FT_CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            c="white"
          >
            <Group gap="xs" c="white">
              <EtherScanIcon color="white" size={16} />
              <Text size="xs" span>
                View on BaseScan
              </Text>
            </Group>
          </Anchor>
          <Text size="xs" c="white">
            Made by{" "}
            <Anchor href="https://twitter.com/wakemi18" target="_blank" rel="noreferrer" c="white" fw="bold">
              @wakemi18
            </Anchor>
          </Text>
        </Group>
      </Container>
    </Box>
  );
};

export default Footer;
