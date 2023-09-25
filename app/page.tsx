import SearchContainer from "./_components/SearchContainer";
import Portfolio from "./_components/Portfolio";
import { Box } from "@mantine/core";

function Page() {
  return (
    <>
      <Box mx="auto" maw="30em">
        <SearchContainer />
      </Box>
      <Portfolio />
    </>
  );
}

export default Page;
