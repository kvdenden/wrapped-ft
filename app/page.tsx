import SearchContainer from "./_components/SearchContainer";
import Portfolio from "./_components/Portfolio";
import { Box, Container, Center, Text, Title, Space } from "@mantine/core";

function Page() {
  return (
    <>
      <Center mih={500} bg="blue.8">
        <Container size="xs">
          <Box c="white">
            <Title size="3em">Wrapped friend.tech</Title>
            <Text size="lg">
              Wrapped friend.tech converts friend.tech keys into ERC1155 tokens. Wrapping keys into a standard interface
              makes them compatible with existing NFT tooling and infrastructure.
            </Text>
          </Box>
          <Space h="lg" />
          <SearchContainer />
        </Container>
      </Center>
      <Container fluid mt="xl">
        <Portfolio />
      </Container>
    </>
  );
}

export default Page;
